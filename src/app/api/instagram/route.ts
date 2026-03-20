import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('user') || 'turismofm';

  try {
    const res = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        'x-ig-app-id': '936619743392459', // Public Facebook App ID for Instagram Web
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Safari) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour to prevent IP bans
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Instagram feed rate-limited or blocked. Try an official token.' }, { status: 502 });
    }

    const json = await res.json();
    const edges = json?.data?.user?.edge_owner_to_timeline_media?.edges || [];
    
    const posts = edges.map((edge: any) => ({
      id: edge.node.id,
      url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
      imageUrl: edge.node.display_url,
      thumbnailUrl: edge.node.thumbnail_src,
      caption: edge.node.edge_media_to_caption?.edges[0]?.node?.text || '',
      likes: edge.node.edge_media_preview_like?.count || 0,
      comments: edge.node.edge_media_to_comment?.count || 0,
    })).slice(0, 8); // Take 8 for the grid

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram feed natively.' }, { status: 500 });
  }
}
