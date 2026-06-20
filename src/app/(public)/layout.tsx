import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RadioPlayerProvider } from "@/components/player/RadioPlayerProvider";
import { getSettings, getPrograms } from "@/lib/services/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, programs] = await Promise.all([getSettings(), getPrograms()]);

  return (
    <RadioPlayerProvider streamUrl={settings?.streamUrl} programs={programs}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow" suppressHydrationWarning>{children}</main>
        <Footer
          instagramUrl={settings?.instagramUrl}
          contactEmail={settings?.contactEmail}
        />
      </div>
    </RadioPlayerProvider>
  );
}
