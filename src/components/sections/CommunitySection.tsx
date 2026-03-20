"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

export default function CommunitySection() {
    return (
        <section className="py-24 px-6 container mx-auto bg-background">
            <div className="flex justify-between items-end mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Comunidade</span>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-balance">
                        A sua voz, a nossa cidade.
                    </h2>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Event */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group rounded-[2rem] overflow-hidden min-h-[500px]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&q=80"
                        alt="Event"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                    <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end w-full">
                        <span className="bg-primary text-black font-bold uppercase tracking-wider text-xs px-3 py-1 rounded-full w-fit mb-4">Em Destaque</span>
                        <h3 className="text-4xl font-display font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                            Festa das Rosas começa neste fim de semana
                        </h3>
                        <p className="text-white/80 max-w-lg text-balance mb-6">
                            O evento mais aguardado do ano traz muita música, gastronomia e tradições para toda a família.
                        </p>
                        <div className="flex gap-4.5 text-sm font-semibold text-white/90">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                <span>25 a 28 de Outubro</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-primary" />
                                <span>Parque Municipal</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* List of updates */}
                <div className="flex flex-col gap-6">
                    {[1, 2, 3].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex gap-6 group cursor-pointer bg-surface/30 p-4 rounded-3xl hover:bg-surface border border-transparent hover:border-white/5 transition-all duration-300 items-center"
                        >
                            <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative">
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + item * 99999999}?w=400&q=80`}
                                    alt="thumbnail"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">Avisos Locais</span>
                                <h4 className="text-xl font-display font-medium leading-snug group-hover:text-primary transition-colors">
                                    Rodovia principal terá interdição parcial na terça-feira.
                                </h4>
                                <p className="text-muted text-sm mt-2">Há 3 horas</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
