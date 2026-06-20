"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";
import { DEFAULT_STREAM_URL } from "@/lib/constants";
import { useStreamMetadata } from "@/hooks/useStreamMetadata";
import { getCurrentProgram } from "@/lib/utils/time";
import type { Program } from "@/lib/types";

type RadioPlayerContextValue = {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  songTitle: string | null;
  coverUrl: string | null;
  currentProgram: Program | null;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (value: number) => void;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

export function useRadioPlayer(): RadioPlayerContextValue {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) {
    throw new Error("useRadioPlayer must be used within a RadioPlayerProvider");
  }
  return ctx;
}

type RadioPlayerProviderProps = {
  streamUrl?: string | null;
  programs?: Program[];
  children: React.ReactNode;
};

export function RadioPlayerProvider({
  streamUrl,
  programs = [],
  children,
}: RadioPlayerProviderProps) {
  const resolvedStreamUrl = streamUrl?.trim() || DEFAULT_STREAM_URL;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);

  // Só busca metadados enquanto o áudio está tocando (economiza dados/bateria no mobile).
  const { songTitle, coverUrl } = useStreamMetadata(isPlaying ? resolvedStreamUrl : "");

  // Mantém o programa atual atualizado a cada minuto.
  useEffect(() => {
    const update = () => setCurrentProgram(getCurrentProgram(programs) as Program | null);
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [programs]);

  // Reflete volume/mute no elemento de áudio.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.src = ""; // derruba a conexão para não retomar de buffer antigo
      audio.load();
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      audio.src = resolvedStreamUrl; // reatribui para garantir o "live edge"
      audio.load();
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      // Alguns navegadores exigem o ";" final no Icecast/Shoutcast.
      if (error instanceof Error && error.name === "NotSupportedError") {
        try {
          const retryUrl = resolvedStreamUrl.endsWith("/")
            ? `${resolvedStreamUrl};`
            : `${resolvedStreamUrl}/;`;
          audio.src = retryUrl;
          audio.load();
          await audio.play();
          setIsPlaying(true);
          return;
        } catch (retryError) {
          console.error("Audio playback failed after retry", retryError);
        }
      } else {
        console.error("Audio playback failed", error);
      }
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, resolvedStreamUrl]);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
    if (value > 0) setIsMuted(false);
  }, []);

  const value = useMemo<RadioPlayerContextValue>(
    () => ({
      isPlaying,
      isLoading,
      volume,
      isMuted,
      songTitle,
      coverUrl,
      currentProgram,
      togglePlay,
      toggleMute,
      setVolume,
    }),
    [isPlaying, isLoading, volume, isMuted, songTitle, coverUrl, currentProgram, togglePlay, toggleMute, setVolume]
  );

  return (
    <RadioPlayerContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        {/* Único elemento de áudio da aplicação */}
        <audio ref={audioRef} preload="none" crossOrigin="anonymous" />
        {children}
      </MotionConfig>
    </RadioPlayerContext.Provider>
  );
}
