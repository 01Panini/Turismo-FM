import { NextResponse } from 'next/server';

type InstagramEdge = {
  node: {
    id: string;
    shortcode: string;
    display_url: string;
    thumbnail_src: string;
    edge_media_preview_like?: { count?: number };
    edge_media_to_comment?: { count?: number };
    edge_media_to_caption?: {
      edges?: Array<{
        node?: {
          text?: string;
        };
      }>;
    };
  };
};

type InstagramResponse = {
  data?: {
    user?: {
      edge_owner_to_timeline_media?: {
        edges?: InstagramEdge[];
      };
    };
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('user') || 'turismofm';

  try {
    const res = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`, {
      headers: {
        'x-ig-app-id': '936619743392459', // Public Facebook App ID for Instagram Web
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Safari) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour to prevent IP bans
    });

    if (!res.ok) {
      console.warn('Instagram feed API returned non-OK status:', res.status);
      return NextResponse.json({ posts: [], message: 'Instagram feed currently unavailable.' });
    }

    const json = await res.json() as InstagramResponse;
    const edges = json?.data?.user?.edge_owner_to_timeline_media?.edges || [];
    
    const posts = edges.map((edge: InstagramEdge) => ({
      id: edge.node.id,
      url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
      imageUrl: edge.node.display_url,
      thumbnailUrl: edge.node.thumbnail_src,
      caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
      likes: edge.node.edge_media_preview_like?.count || 0,
      comments: edge.node.edge_media_to_comment?.count || 0,
    })).slice(0, 8); // Take 8 for the grid

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return NextResponse.json({ posts: [], message: 'Failed to fetch Instagram feed.' });
  }
}
