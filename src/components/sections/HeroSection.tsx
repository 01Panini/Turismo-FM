"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";
import { useStreamMetadata } from "@/hooks/useStreamMetadata";

export default function HeroSection() {
    const streamUrl = "https://stm14.xcast.com.br:11104/;";
    const ref = useRef(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { songTitle } = useStreamMetadata(streamUrl);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    const togglePlay = async () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Playback failed", error);
                setIsPlaying(false);
            }
        }
    };

    return (
        <section ref={ref} className="relative min-h-[100dvh] pb-24 w-full flex items-center overflow-hidden bg-[#0B0C10]">
            {/* Animated Background Layers */}
            <motion.div style={{ y: yBg }} className="hero-bg" />
            <motion.div style={{ y: yGrid }} className="absolute inset-0 hero-grid" />

            {/* Subtle Gradient Noise */}
            <div className="absolute inset-0 border-t border-white/5 bg-transparent pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.1, mixBlendMode: "overlay" }} />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-24 md:pt-32">
                <audio ref={audioRef} src={streamUrl} preload="none" />
                <div className="flex flex-col items-start gap-4 w-full max-w-5xl opacity-0 animate-fadeUp [animation-delay:200ms]">

                    {/* Top Label */}
                    <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">
                        <div className="w-8 h-[1px] bg-primary" />
                        AO VIVO AGORA &bull; 90.3 MHZ
                    </div>

                    {/* Headline */}
                    <h1 className="flex flex-col font-display font-black leading-[0.9] tracking-tighter w-full uppercase">
                        <span className="text-white text-[5rem] sm:text-[7rem] md:text-[9rem]">A Voz</span>
                        <div className="relative w-fit">
                            <span className="text-primary text-[5rem] sm:text-[7rem] md:text-[9rem]">Que Move</span>
                        </div>
                        <span className="text-transparent text-outline text-[5rem] sm:text-[7rem] md:text-[9rem]">a Cidade</span>
                    </h1>

                    <p className="text-white/70 text-lg md:text-xl font-light max-w-xl mt-8 leading-relaxed opacity-0 animate-fadeUp [animation-delay:400ms]">
                        Todo mundo ouve, todo mundo gosta. Turismo FM é onde a cidade acontece — ao vivo, 24 horas por dia.
                    </p>

                    {/* Player Actions */}
                    <div className="mt-12 flex flex-col xl:flex-row items-start xl:items-center gap-8 opacity-0 animate-fadeUp [animation-delay:600ms]">
                        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 overflow-hidden w-fit">
                            <div className="bg-[#111216]/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-5 pr-12 min-w-[320px] max-w-[400px] hover:bg-[#18191E]/90 transition-colors">
                                <div 
                                    onClick={togglePlay}
                                    className="w-14 h-14 cursor-pointer z-10 bg-primary text-black rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.3)] shrink-0 hover:scale-105 transition-transform duration-300"
                                >
                                    {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">
                                        NO AR AGORA
                                    </span>
                                    <span className="text-white font-bold text-base md:text-lg leading-tight mb-0.5 truncate" title={songTitle || 'Turismo FM'}>
                                        {songTitle || 'Turismo FM'}
                                    </span>
                                    <span className="text-white/50 text-xs truncate">
                                        A Voz Que Move a Cidade
                                    </span>
                                </div>

                                {/* Animated Equalizer */}
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-end gap-[3px] h-4">
                                    <div className="w-[3px] bg-primary rounded-full animate-visualize [animation-delay:-0.2s]" />
                                    <div className="w-[3px] bg-primary rounded-full animate-visualize [animation-delay:-0.4s]" />
                                    <div className="w-[3px] bg-primary rounded-full animate-visualize [animation-delay:-0.1s]" />
                                    <div className="w-[3px] bg-primary rounded-full animate-visualize [animation-delay:-0.3s]" />
                                </div>
                            </div>
                        </div>

                        <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
                            Grade de programas
                            <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator Line */}
            <div className="absolute left-[8%] md:left-[5%] top-1/2 -translate-y-1/2 h-32 w-[2px] bg-white/5 hidden md:block">
                <div className="w-full h-full bg-primary origin-top animate-scrollLine" />
            </div>
        </section>
    );
}
