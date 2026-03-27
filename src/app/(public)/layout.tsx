import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/services/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow" suppressHydrationWarning>{children}</main>
      <Footer
        instagramUrl={settings?.instagramUrl}
        contactEmail={settings?.contactEmail}
      />
    </div>
  );
}
