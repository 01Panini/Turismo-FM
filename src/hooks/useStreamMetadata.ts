import { useState, useEffect } from 'react';

export function useStreamMetadata(streamUrl: string) {
  const [songTitle, setSongTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!streamUrl) return;

    // Fetch metadata through internal proxy to avoid CORS

    const fetchMetadata = async () => {
      try {
        const proxyUrl = `/api/stream-metadata?url=${encodeURIComponent(streamUrl)}`;
        const res = await fetch(proxyUrl);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.songtitle) {
          setSongTitle(data.songtitle);
        }
      } catch (err) {
        console.error("Failed to fetch stream metadata via proxy", err);
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [streamUrl]);

  return { songTitle };
}
