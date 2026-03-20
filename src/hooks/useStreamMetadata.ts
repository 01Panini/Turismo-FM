import { useState, useEffect } from 'react';

export function useStreamMetadata(streamUrl: string) {
  const [songTitle, setSongTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!streamUrl) return;

    // Convert "https://stm14.xcast.com.br:11104/;" to "https://stm14.xcast.com.br:11104/stats?sid=1&json=1"
    const baseUrl = streamUrl.replace(/\/;?$/, '');
    const apiUrl = `${baseUrl}/stats?sid=1&json=1`;

    const fetchMetadata = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.songtitle) {
          setSongTitle(data.songtitle);
        }
      } catch (err) {
        console.error("Failed to fetch stream metadata", err);
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [streamUrl]);

  return { songTitle };
}
