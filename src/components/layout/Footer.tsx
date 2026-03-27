import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

type FooterProps = {
    instagramUrl?: string | null;
    contactEmail?: string | null;
};

const quickLinks = [
    { label: "Início", href: "/" },
    { label: "Notícias", href: "/noticias" },
    { label: "Programação", href: "/#programacao" },
    { label: "Equipe", href: "/#equipe" },
    { label: "Patrocinadores", href: "/#patrocinadores" },
];

export default function Footer({ instagramUrl, contactEmail }: FooterProps) {
    return (
        <footer className="border-t border-white/5 bg-background pt-16 pb-8 px-6 overflow-hidden relative">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-display font-bold text-primary mb-4">
                            Turismo FM 90.3
                        </h3>
                        <p className="text-muted text-balance max-w-sm font-light leading-relaxed">
                            1º lugar e com mais de 16 anos de tradição em Goiatuba-GO, nos consolidamos como a principal fonte de informação e entretenimento da região.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold tracking-widest uppercase text-xs text-white mb-6">Explore</h4>
                        <ul className="space-y-4 text-muted font-medium text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold tracking-widest uppercase text-xs text-white mb-6">Contato</h4>
                        <div className="space-y-4 text-sm text-muted font-medium">
                            {instagramUrl && (
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 hover:text-primary transition-colors"
                                >
                                    <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                                        <Instagram size={18} />
                                    </span>
                                    Instagram oficial
                                </a>
                            )}
                            {contactEmail && (
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="flex items-center gap-3 hover:text-primary transition-colors"
                                >
                                    <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                                        <Mail size={18} />
                                    </span>
                                    {contactEmail}
                                </a>
                            )}
                            {!instagramUrl && !contactEmail && (
                                <p className="text-muted/80">
                                    Atendimento e redes sociais em atualização.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted text-center md:text-left relative z-10">
                    <p>© {new Date().getFullYear()} Turismo FM 90.3. Todos os direitos reservados.</p>
                    <p className="font-medium">
                        Goiatuba-GO, rádio, notícias e comunidade em um só lugar.
                    </p>
                </div>

                {/* Large Background Typography */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full text-center whitespace-nowrap overflow-hidden pointer-events-none opacity-[0.02]">
                    <span className="text-[15rem] md:text-[20rem] font-display font-black tracking-tighter mix-blend-screen text-white">
                        TURISMO
                    </span>
                </div>
            </div>
        </footer>
    );
}
