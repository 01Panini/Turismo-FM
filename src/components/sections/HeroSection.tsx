"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Loader2 } from "lucide-react";
import { useRef } from "react";
import { useRadioPlayer } from "@/components/player/RadioPlayerProvider";
import ScrollingText from "@/components/ui/ScrollingText";
import SoundBars from "@/components/ui/SoundBars";

export default function HeroSection() {
    const ref = useRef(null);
    const { isPlaying, isLoading, songTitle, coverUrl, togglePlay } = useRadioPlayer();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section ref={ref} className="relative min-h-[100dvh] pb-32 w-full flex items-center overflow-hidden bg-[#0B0C10]">
            {/* Animated Background Layers */}
            <motion.div style={{ y: yBg }} className="hero-bg" />
            <motion.div style={{ y: yGrid }} className="absolute inset-0 hero-grid" />

            {/* Subtle Gradient Noise */}
            <div className="absolute inset-0 border-t border-white/5 bg-transparent pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')", opacity: 0.1, mixBlendMode: "overlay" }} />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-32 md:pt-40">
                <div className="flex flex-col items-start gap-4 w-full max-w-5xl opacity-0 animate-fadeUp [animation-delay:200ms]">

                    {/* Top Label */}
                    <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">
                        <div className="w-8 h-[1px] bg-primary" />
                        AO VIVO AGORA &bull; 90.3 MHZ
                    </div>

                    {/* Headline */}
                    <h1 className="flex flex-col font-display font-black leading-[0.9] tracking-tighter w-full uppercase">
                        <span className="text-white text-[2.75rem] xs:text-[3.5rem] sm:text-[7rem] md:text-[9rem]">A Voz</span>
                        <div className="relative w-fit">
                            <span className="text-primary text-[2.75rem] xs:text-[3.5rem] sm:text-[7rem] md:text-[9rem]">Que Move</span>
                        </div>
                        <span className="text-transparent text-outline text-[2.75rem] xs:text-[3.5rem] sm:text-[7rem] md:text-[9rem]">a Cidade</span>
                    </h1>

                    <p className="text-white/70 text-base md:text-xl font-light max-w-xl mt-6 md:mt-8 leading-relaxed opacity-0 animate-fadeUp [animation-delay:400ms]">
                        Todo mundo ouve, todo mundo gosta. Turismo FM é onde a cidade acontece — ao vivo, 24 horas por dia.
                    </p>

                    {/* Player Actions */}
                    <div className="mt-8 md:mt-12 w-full flex flex-col xl:flex-row items-start xl:items-center gap-8 opacity-0 animate-fadeUp [animation-delay:600ms]">
                        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 overflow-hidden w-full max-w-[360px]">
                            <div className="bg-[#111216]/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 sm:gap-5 w-full overflow-hidden hover:bg-[#18191E]/90 transition-colors">
                                {/* Desktop: interactive play control (no bottom nav on desktop) */}
                                <button
                                    type="button"
                                    onClick={togglePlay}
                                    disabled={isLoading}
                                    className="w-14 h-14 z-10 bg-primary text-black rounded-xl hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.3)] shrink-0 hover:scale-105 transition-transform duration-300 disabled:opacity-70"
                                    aria-label={isPlaying ? "Pausar transmissão" : "Tocar transmissão"}
                                >
                                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                                </button>

                                {/* Mobile: capa do álbum quando disponível, senão barras de som ao vivo */}
                                <div className="md:hidden w-12 h-12 rounded-xl overflow-hidden bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                                    {coverUrl ? (
                                        <img src={coverUrl} alt="Capa do álbum" className="w-full h-full object-cover" />
                                    ) : (
                                        <SoundBars active={isPlaying} />
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">
                                        NO AR AGORA
                                    </span>
                                    <ScrollingText
                                        text={songTitle || 'Turismo FM'}
                                        className="w-full text-white font-bold text-base md:text-lg leading-tight mb-0.5"
                                    />
                                    <span className="text-white/50 text-xs truncate">
                                        Todo mundo ouve. Todo mundo gosta.
                                    </span>
                                </div>
                            </div>
                        </div>
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
