import Notices from "@/components/home/Notices";
import EventCalendar from "@/components/home/EventCalender";
import GallerySection from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import MembersCard from "@/components/home/MembersCard";
import NewsComponent from "@/components/home/News";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const { lang } = resolvedParams;

  return (
    <main className="space-y-6 md:space-y-12 lg:space-y-24 mb-20">
      <Hero />
      <NewsComponent lang={lang} />
      <MembersCard lang={lang} />
      <GallerySection lang={lang} />
      <Notices lang={lang} />
      {/* <EventCalendar /> */}
    </main>
  );
}
