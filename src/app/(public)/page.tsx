import HeroSection from "@/components/sections/HeroSection";
import FeaturedStoriesSection from "@/components/sections/FeaturedStoriesSection";
import RadioProgramsSection from "@/components/sections/RadioProgramsSection";
import HostsSection from "@/components/sections/HostsSection";
import SocialWallSection from "@/components/sections/SocialWallSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import { getPrograms, getHosts, getSponsors, getNewsByCategory, getSettings } from '@/lib/services/data';

export const revalidate = 60; // Revalida a cada 60 segundos (ISR)

export default async function Home() {
  const settings = await getSettings();
  const regionalNews = await getNewsByCategory('REGIONAL', 4);
  const worldNews = await getNewsByCategory('MUNDO', 4);
  const programs = await getPrograms();
  const hosts = await getHosts();
  const sponsors = await getSponsors();

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <div className="pb-24">
        <HeroSection streamUrl={settings?.streamUrl} />
        <FeaturedStoriesSection news={regionalNews} title="Destaques na Região." subtitle="Notícias Locais" />
        {worldNews.length > 0 && (
          <FeaturedStoriesSection
            news={worldNews}
            title="Brasil e mundo em foco."
            subtitle="Atualidades"
          />
        )}
        <RadioProgramsSection programs={programs} />
        <HostsSection hosts={hosts} />
        <SocialWallSection instagramUrl={settings?.instagramUrl || "https://instagram.com/turismofm"} />
        <SponsorsSection sponsors={sponsors} />
        <CallToActionSection />
      </div>
    </div>
  );
}
