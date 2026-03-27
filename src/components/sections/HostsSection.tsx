"use client";

import { motion } from "framer-motion";

import { Host } from "@/lib/types";

const fallbackHosts: Host[] = [
    { id: '1', name: "Wellington Vilela", bio: "No comando do Turismo Hits, conduzindo o melhor conteúdo e energia para todas as manhãs.", avatar: "https://picsum.photos/seed/host1/400/400" },
    { id: '2', name: "Gisele Duarte", bio: "Apresentando o programa A Tarde é Nossa! com muita animação, interatividade e os melhores hits.", avatar: "https://picsum.photos/seed/host2/400/400" },
    { id: '3', name: "Frank Cordão", bio: "Comandando o Território Sertanejo, o espaço perfeito para os seus finais de tarde serem acompanhados da boa música caipira.", avatar: "https://picsum.photos/seed/host3/400/400" },
    { id: '4', name: "Ivosmar Santana", bio: "Trazendo as raízes do Brasil pra você logo bem cedinho, através do programa Canta Viola.", avatar: "https://picsum.photos/seed/host4/400/400" },
];

export default function HostsSection({ hosts }: { hosts: Host[] }) {
    const displayed = hosts.length > 0 ? hosts : fallbackHosts;

    return (
        <section id="equipe" className="py-24 bg-background relative overflow-hidden">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Nossa Voz</span>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-balance">
                        Quem faz a rádio acontecer.
                    </h2>
                </motion.div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayed.map((host, i) => (
                        <motion.div
                            key={host.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-surface border border-white/5 rounded-[2rem] p-8 text-center flex flex-col items-center group hover:border-primary/50 transition-colors shadow-2xl"
                        >
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-background shadow-xl">
                                <img src={host.avatar || `https://picsum.photos/seed/${host.id}/400/400`} alt={host.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>

                            <h3 className="text-2xl font-display font-semibold transition-colors group-hover:text-primary mb-1 text-white">{host.name}</h3>
                            <p className="text-primary text-sm tracking-widest uppercase mb-4">Locutor</p>
                            <p className="text-sm text-balance leading-relaxed text-white/50 mb-6 flex-grow">{host.bio || "Locutor da Turismo FM"}</p>

                            <div className="mt-auto rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                                No ar na Turismo FM
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
