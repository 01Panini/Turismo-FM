"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import LiveIndicator from "../ui/LiveIndicator";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

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
                        <img
                            src="/logo.png"
                            alt="Logo Turismo FM"
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

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </motion.div>
            </motion.header>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
                        <Link href="/#anuncie" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-black px-12 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,184,0,0.3)] w-full text-center block">
                            Anuncie com a Rádio
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
