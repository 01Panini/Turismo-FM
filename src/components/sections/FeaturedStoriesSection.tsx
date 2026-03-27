"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type NewsType = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    source: string;
    url: string;
    publishedAt: Date;
    createdAt: Date;
};

type FeaturedStoriesSectionProps = {
    news: NewsType[];
    title?: string;
    subtitle?: string;
};

export default function FeaturedStoriesSection({ news, title = "Notícias que importam.", subtitle = "Destaques" }: FeaturedStoriesSectionProps) {
    if (news.length === 0) return null;

    return (
        <section id="noticias" className="py-12 md:py-24 bg-background relative overflow-hidden">
            {/* Decorative background elements */}           <div className="flex justify-between items-end mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{subtitle}</span>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-balance">
                        {title}
                    </h2>
                </motion.div>

                <Link
                    href="/noticias"
                    className="hidden md:flex items-center gap-2 text-muted hover:text-white transition-colors group"
                >
                    Ver todas as notícias
                    <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {news.map((story, i) => {
                    const featured = i === 0;
                    return (
                        <motion.article
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl ${featured ? 'md:col-span-8 md:row-span-2 min-h-[500px]' : 'md:col-span-4 min-h-[240px]'}`}
                        >
                            <div className="absolute inset-0 bg-surface">
                                <img
                                    src={story.image || "/images/news-placeholder.svg"}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/60 to-transparent" />
                            </div>

                            <Link href={`/noticias/${story.slug}`} className="absolute inset-0 z-20" aria-label={story.title} />

                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-primary/90 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {story.source}
                                    </span>
                                    <span className="text-xs text-white/70 font-medium">
                                        {new Date(story.publishedAt).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                                <h3 className={`${featured ? 'text-3xl md:text-4xl' : 'text-xl'} font-display font-semibold leading-tight group-hover:text-primary transition-colors`}>
                                    {story.title}
                                </h3>
                            </div>

                            <div className={`absolute top-6 right-6 w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/10 ${featured ? 'block' : 'hidden'}`}>
                                <ArrowUpRight size={20} className="text-white" />
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
