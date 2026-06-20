import { useState, useEffect } from 'react';

type StreamMetadata = {
  songTitle: string | null;
  coverUrl: string | null;
};

// Tenta extrair uma URL de capa de álbum dos campos mais comuns retornados
// por servidores de streaming (a maioria do Shoutcast/Icecast não envia capa).
function extractCover(data: Record<string, unknown>): string | null {
  const candidates = ['cover', 'coverart', 'coverArt', 'albumart', 'albumArt', 'art', 'artwork', 'image'];
  for (const key of candidates) {
    const value = data[key];
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      return value;
    }
  }
  return null;
}

export function useStreamMetadata(streamUrl: string): StreamMetadata {
  const [songTitle, setSongTitle] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!streamUrl) {
      setSongTitle(null);
      setCoverUrl(null);
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
        setCoverUrl(extractCover(data ?? {}));
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

  return { songTitle, coverUrl };
}
