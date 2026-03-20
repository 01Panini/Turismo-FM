import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings, getPrograms } from "@/lib/services/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const programs = await getPrograms();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
