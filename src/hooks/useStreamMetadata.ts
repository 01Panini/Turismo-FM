import { useState, useEffect } from 'react';

export function useStreamMetadata(streamUrl: string) {
  const [songTitle, setSongTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!streamUrl) {
      setSongTitle(null);
      return;
    }

    const controller = new AbortController();
    let interval: ReturnType<typeof setInterval> | null = null;

    // Busca metadados via proxy interno (evita CORS).
    const fetchMetadata = async () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      try {
        const proxyUrl = `/api/stream-metadata?url=${encodeURIComponent(streamUrl)}`;
        const res = await fetch(proxyUrl, { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.songtitle) {
          setSongTitle(data.songtitle);
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error("Failed to fetch stream metadata via proxy", err);
        }
      }
    };

    const startPolling = () => {
      if (interval) return;
      fetchMetadata();
      interval = setInterval(fetchMetadata, 10000); // a cada 10s
    };

    const stopPolling = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    if (typeof document === 'undefined' || !document.hidden) {
      startPolling();
    }
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      controller.abort();
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [streamUrl]);

  return { songTitle };
}
