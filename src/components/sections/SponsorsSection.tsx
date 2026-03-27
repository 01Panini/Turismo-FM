"use client";

import { motion } from "framer-motion";

type SponsorType = { id: string; name: string; logo: string | null; website: string | null; };

const fallbackSponsors = [
    { name: "Banco Local", logo: null, id: '1', website: null },
    { name: "Supermercados Alfa", logo: null, id: '2', website: null },
    { name: "Farmácia Saúde", logo: null, id: '3', website: null },
];

export default function SponsorsSection({ sponsors }: { sponsors: SponsorType[] }) {
    const displayed = sponsors.length > 0 ? sponsors : fallbackSponsors;

    return (
        <section id="patrocinadores" className="py-24 bg-surface border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <span className="text-muted tracking-widest uppercase text-xs font-bold font-display">
                    Marcas que apoiam nossa rádio
                </span>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    initial={{ x: "0%" }}
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap items-center gap-24 px-12"
                >
                    {displayed.map((sponsor, i) => (
                        <div key={i} className="flex-shrink-0">
                            {sponsor.logo ? (
                                <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity" />
                            ) : (
                                <span className="text-2xl font-display font-medium text-white/40 hover:text-white transition-colors duration-300">
                                    {sponsor.name}
                                </span>
                            )}
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {displayed.map((sponsor, i) => (
                        <div key={`dup-${i}`} className="flex-shrink-0">
                            {sponsor.logo ? (
                                <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity" />
                            ) : (
                                <span className="text-2xl font-display font-medium text-white/40 hover:text-white transition-colors duration-300">
                                    {sponsor.name}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Gradient sides for fade effect */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
