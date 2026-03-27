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

export const metadata: Metadata = {
  title: "Turismo FM 90.3 | A Sua Rádio",
  description: "Plataforma digital da Turismo FM 90.3. Notícias locais, programas ao vivo, música e comunidade.",
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
