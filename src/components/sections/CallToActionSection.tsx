"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function CallToActionSection() {
    const commercialEmail = "opec@turismofm.com.br";
    const commercialPhone = "+5564981172332";

    return (
        <section id="anuncie" className="py-32 px-6 container mx-auto bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/10 blur-[100px] rounded-full mix-blend-screen opacity-60" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-5xl mx-auto glass-panel border border-white/5 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative flex flex-col items-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-6 bg-primary/10 px-4 py-2 rounded-full inline-block border border-primary/20">
                        Aumente Suas Vendas
                    </span>
                    <h2 className="text-5xl md:text-7xl font-display font-medium text-balance mb-8">
                        Coloque a sua marca em <span className="text-primary italic font-serif">destaque</span>.
                    </h2>
                    <p className="text-xl text-muted text-balance max-w-2xl mx-auto mb-12">
                        Alcance milhares de ouvintes diariamente. Temos as melhores soluções de mídia para o seu negócio dentro e fora do rádio.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                        <a
                            href={`mailto:${commercialEmail}?subject=Quero%20anunciar%20na%20Turismo%20FM`}
                            className="group relative w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,184,0,0.3)] hover:shadow-[0_0_50px_rgba(255,184,0,0.5)] flex items-center justify-center gap-3"
                        >
                            Falar com Comercial
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href={`https://wa.me/${commercialPhone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-8 py-4 glass-panel border border-white/10 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            Falar no WhatsApp
                        </a>
                    </div>

                    <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted font-medium">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-primary" />
                            <span>opec@turismofm.com.br</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-primary" />
                            <span>(64) 98117-2332</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
