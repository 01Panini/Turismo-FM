import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const streamUrl = searchParams.get('url');

  if (!streamUrl) {
    return NextResponse.json({ error: 'Missing stream URL' }, { status: 400 });
  }

  // Convert "https://stm14.xcast.com.br:11104/; " to "https://stm14.xcast.com.br:11104/stats?sid=1&json=1"
  const baseUrl = streamUrl.replace(/\/;?$/, '');
  const apiUrl = `${baseUrl}/stats?sid=1&json=1`;

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 10 }, // Cache metadata for 10 seconds to prevent hammering the server
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Safari) Chrome/114.0.0.0 Safari/537.36',
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch metadata: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Metadata proxy error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
