"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import LiveIndicator from "./LiveIndicator";
import { getCurrentProgram } from "@/lib/utils/time";

type Program = {
  title: string;
  hostName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export default function RadioPlayer({ streamUrl: _streamUrl, programs }: { streamUrl?: string | null, programs: Program[] }) {
  // Appended hardcoded URL to guarantee radio playback 
  const streamUrl = "https://stm14.xcast.com.br:11104/;";
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check current program on mount and every minute
    const updateProgram = () => setCurrentProgram(getCurrentProgram(programs));
    updateProgram();
    
    const interval = setInterval(updateProgram, 60000);
    return () => clearInterval(interval);
  }, [programs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current || !streamUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.error("Audio playback failed", e);
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  if (!streamUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={streamUrl} preload="none" />
      
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl px-6 py-4 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform shrink-0"
          >
            {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
          </button>
          
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-3">
              <LiveIndicator text="ON AIR" />
              <span className="text-white font-semibold truncate text-sm md:text-base">
                {currentProgram ? currentProgram.title : "Programação Semanal"}
              </span>
            </div>
            {currentProgram?.hostName && (
              <span className="text-white/60 text-xs truncate mt-0.5">
                com {currentProgram.hostName}
              </span>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-24 accent-primary"
          />
        </div>
      </motion.div>
    </>
  );
}
