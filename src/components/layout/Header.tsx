"use client";

import { ComponentType, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { X, Home, Newspaper, CalendarDays, MoreHorizontal, Play, Pause, Loader2, Instagram, MessageCircle, type LucideProps } from "lucide-react";
import LiveIndicator from "../ui/LiveIndicator";
import { useRadioPlayer } from "@/components/player/RadioPlayerProvider";
import { WHATSAPP_URL, DEFAULT_INSTAGRAM_URL } from "@/lib/constants";

type BottomNavItemProps = {
    href: string;
    label: string;
    icon: ComponentType<LucideProps>;
    active?: boolean;
    onClick?: () => void;
};

function BottomNavItem({ href, label, icon: Icon, active, onClick }: BottomNavItemProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium tracking-wide transition-colors ${active ? "text-primary" : "text-white/55 hover:text-white"}`}
        >
            <Icon size={22} strokeWidth={active ? 2.4 : 2} />
            <span>{label}</span>
        </Link>
    );
}

export default function Header({ instagramUrl }: { instagramUrl?: string | null }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { isPlaying, isLoading, togglePlay } = useRadioPlayer();
    const { scrollY } = useScroll();
    const resolvedInstagramUrl = instagramUrl?.trim() || DEFAULT_INSTAGRAM_URL;

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    // Lock body scroll while the mobile menu is open
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : original;
        return () => {
            document.body.style.overflow = original;
        };
    }, [isMobileMenuOpen]);

    interface NavLink {
        name: string;
        href: string;
    }

    const navLinks: NavLink[] = [
        { name: "Início", href: "/" },
        { name: "Notícias", href: "/noticias" },
        { name: "Programação", href: "/#programacao" },
        { name: "Equipe", href: "/#equipe" },
        { name: "Patrocinadores", href: "/#patrocinadores" }
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-6 bg-transparent"}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                suppressHydrationWarning
            >
                <motion.div
                    className="container mx-auto px-6 max-w-7xl flex items-center justify-between origin-top"
                    animate={{ scale: isScrolled ? 0.95 : 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3" suppressHydrationWarning>
                        <Image
                            src="/logo.png"
                            alt="Logo Turismo FM"
                            width={160}
                            height={48}
                            priority
                            className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-white/80 uppercase">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="hover:text-primary transition-colors hover:scale-105 active:scale-95 duration-200" suppressHydrationWarning>
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="hidden lg:block">
                            <LiveIndicator />
                        </div>
                        <Link href="/#anuncie" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-transform hover:shadow-[0_0_20px_rgba(255,184,0,0.3)] block" suppressHydrationWarning>
                            Anuncie
                        </Link>
                    </div>

                    {/* Mobile live indicator */}
                    <div className="md:hidden">
                        <LiveIndicator />
                    </div>
                </motion.div>
            </motion.header>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center pb-28 transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className={`absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] transition-opacity duration-1000 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} />
                <nav className="flex flex-col items-center gap-8 text-2xl font-display font-medium">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`hover:text-primary transition-all duration-300 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                            style={{ transitionDelay: `${i * 100 + 200}ms` }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div
                        className={`mt-4 transform transition-all duration-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <Link href="/#anuncie" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-black text-sm px-8 py-3.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,184,0,0.3)] text-center block">
                            Anuncie com a Rádio
                        </Link>
                    </div>

                    {/* Social shortcuts */}
                    <div
                        className={`mt-6 flex items-center gap-5 transform transition-all duration-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        style={{ transitionDelay: '700ms' }}
                    >
                        <a
                            href={resolvedInstagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Abrir Instagram da Turismo FM"
                            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Instagram size={24} />
                        </a>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Falar no WhatsApp"
                            className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                        >
                            <MessageCircle size={24} className="fill-current" />
                        </a>
                    </div>
                </nav>
            </div>

            {/* Mobile Bottom Navigation with integrated player */}
            <nav
                className="md:hidden fixed bottom-0 inset-x-0 z-50"
                aria-label="Navegação principal"
            >
                <div className="relative bg-background/50 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_-8px_30px_rgba(0,0,0,0.45)]">
                    {/* Floating live play/pause button */}
                    <button
                        type="button"
                        onClick={togglePlay}
                        disabled={isLoading}
                        aria-label={isPlaying ? "Pausar transmissão ao vivo" : "Tocar transmissão ao vivo"}
                        className="absolute left-1/2 -translate-x-1/2 -top-7 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_24px_rgba(255,184,0,0.45)] ring-4 ring-background hover:scale-105 active:scale-95 transition-transform disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 size={26} className="animate-spin" />
                        ) : isPlaying ? (
                            <Pause size={26} className="fill-current" />
                        ) : (
                            <Play size={26} className="fill-current ml-0.5" />
                        )}
                        {isPlaying && !isLoading && (
                            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 ring-2 ring-primary animate-pulse" />
                        )}
                    </button>

                    <div className="flex items-stretch justify-between px-2 h-[64px] pb-[env(safe-area-inset-bottom)]">
                        <BottomNavItem href="/" label="Início" icon={Home} active={pathname === "/"} />
                        <BottomNavItem href="/noticias" label="Notícias" icon={Newspaper} active={pathname.startsWith("/noticias")} />

                        {/* Spacer reserving room for the floating play button */}
                        <div className="w-16 shrink-0" aria-hidden />

                        <BottomNavItem href="/#programacao" label="Grade" icon={CalendarDays} onClick={() => setIsMobileMenuOpen(false)} />
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium tracking-wide transition-colors ${isMobileMenuOpen ? "text-primary" : "text-white/55 hover:text-white"}`}
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <MoreHorizontal size={22} />}
                            <span>{isMobileMenuOpen ? "Fechar" : "Menu"}</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
