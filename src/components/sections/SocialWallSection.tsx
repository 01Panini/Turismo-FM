"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";

type SocialPost = {
    id: string;
    url: string;
    imageUrl: string;
    thumbnailUrl: string;
    caption: string;
    likes: number;
    comments: number;
};

function createFallbackPosts(instagramUrl: string): SocialPost[] {
    return Array.from({ length: 8 }, (_, index) => ({
        id: `fallback-${index + 1}`,
        url: instagramUrl,
        imageUrl: `https://picsum.photos/seed/turismofm${index + 1}/600/600`,
        thumbnailUrl: `https://picsum.photos/seed/turismofm${index + 1}/300/300`,
        caption: "Turismo FM",
        likes: 1200 + index * 37,
        comments: 84 + index * 3,
    }));
}

export default function SocialWallSection({ instagramUrl = "https://instagram.com/turismofm" }: { instagramUrl?: string }) {
    const handle = instagramUrl.replace(/\/$/, '').split('/').pop() || 'turismofm';
    const [posts, setPosts] = useState<SocialPost[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadPosts() {
            try {
                const response = await fetch(`/api/instagram?user=${encodeURIComponent(handle)}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    return;
                }

                const data = await response.json() as { posts?: SocialPost[] };
                if (Array.isArray(data.posts) && data.posts.length > 0) {
                    setPosts(data.posts);
                }
            } catch (error) {
                if (!(error instanceof DOMException && error.name === 'AbortError')) {
                    console.error("Failed to load Instagram posts", error);
                }
            }
        }

        void loadPosts();
        return () => controller.abort();
    }, [handle]);

    const displayedPosts = posts.length > 0 ? posts : createFallbackPosts(instagramUrl);

    return (
        <section className="py-24 px-6 container mx-auto bg-background relative overflow-hidden text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Instagram className="text-primary mt-0.5" />
                        <span className="text-primary font-bold tracking-widest uppercase text-sm block">instagram @{handle}</span>
                    </div>
                </a>
                <h2 className="text-4xl md:text-5xl font-display font-medium text-balance">
                    Conectados o tempo todo.
                </h2>
            </motion.div>

            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {displayedPosts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className={`relative group rounded-3xl overflow-hidden cursor-pointer ${i % 3 === 0 ? "h-64" : i % 2 === 0 ? "h-96" : "h-72"
                            } inline-block w-full`}
                    >
                        <img
                            src={post.imageUrl}
                            alt={post.caption || "Post do Instagram"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-slate-800"
                        />
                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="Abrir post do Instagram"></a>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-0">
                            <Instagram size={32} className="text-black mb-2" />
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-black font-bold">
                                    <Heart size={20} fill="currentColor" />
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-2 text-black font-bold">
                                    <MessageCircle size={20} fill="currentColor" />
                                    <span>{post.comments}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
