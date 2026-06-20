import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

const display = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://turismofm.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Turismo FM 90.3 | A Sua Rádio",
    template: "%s | Turismo FM 90.3",
  },
  description:
    "Plataforma digital da Turismo FM 90.3 de Goiatuba-GO. Notícias locais, programas ao vivo, música e comunidade.",
  applicationName: "Turismo FM 90.3",
  keywords: ["Turismo FM", "rádio Goiatuba", "90.3", "rádio ao vivo", "notícias Goiatuba"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Turismo FM 90.3",
    title: "Turismo FM 90.3 | A Sua Rádio",
    description:
      "Notícias locais, programas ao vivo, música e comunidade. A Voz Que Move a Cidade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turismo FM 90.3 | A Sua Rádio",
    description:
      "Notícias locais, programas ao vivo, música e comunidade. A Voz Que Move a Cidade.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans min-h-screen antialiased selection:bg-primary/30 selection:text-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
