"use client";

import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

type ProgramType = { id: string; title: string; dayOfWeek: number; startTime: string; endTime: string; hostName: string; live?: boolean; };

const fallbackPrograms: ProgramType[] = [
    { id: '1', title: "Canta Viola", startTime: "05:00", endTime: "08:00", hostName: "Ivosmar Santana", dayOfWeek: 1, live: false },
    { id: '2', title: "Turismo Hits", startTime: "08:00", endTime: "11:00", hostName: "Wellington Vilela", dayOfWeek: 1, live: true },
    { id: '3', title: "Programação Musical", startTime: "11:00", endTime: "13:00", hostName: "Turismo FM", dayOfWeek: 1, live: false },
    { id: '4', title: "A Tarde é Nossa!", startTime: "13:00", endTime: "16:00", hostName: "Gisele Duarte", dayOfWeek: 1, live: false },
    { id: '5', title: "Território Sertanejo", startTime: "16:00", endTime: "22:00", hostName: "Frank Cordão", dayOfWeek: 1, live: false },
    { id: '6', title: "Love Songs", startTime: "22:00", endTime: "05:00", hostName: "Turismo FM", dayOfWeek: 1, live: false },
];

export default function RadioProgramsSection({ programs }: { programs: ProgramType[] }) {
    const daysMap = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const displayedPrograms = programs.length > 0 ? programs : fallbackPrograms;

    return (
        <section id="programacao" className="py-24 bg-background text-white relative overflow-hidden">
            <div className="container mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Programação</span>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-balance">
                        Nossa grade.
                    </h2>
                </motion.div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedPrograms.map((prog, i) => (
                        <motion.div
                            key={prog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-surface border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
                        >
                            {prog.live && (
                                <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">NO AR</span>
                                </div>
                            )}

                            <h3 className="text-2xl font-display font-bold mb-6 text-white group-hover:text-primary transition-colors">{prog.title}</h3>

                            <div className="flex flex-col gap-3 text-white/70">
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-primary" />
                                    <span className="text-sm font-medium">{daysMap[prog.dayOfWeek]} • {prog.startTime} - {prog.endTime}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User size={18} className="text-primary" />
                                    <span className="text-sm font-medium">{prog.hostName}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
