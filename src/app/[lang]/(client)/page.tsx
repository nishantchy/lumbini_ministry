import { Metadata } from "next";
import Notices from "@/components/home/Notices";
import EventCalendar from "@/components/home/EventCalender";
import GallerySection from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import MembersCard from "@/components/home/MembersCard";
import NewsComponent from "@/components/home/News";

// Define the page props type
type PageProps = {
  params: { lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const { lang } = params; // Remove await since params is not a Promise

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

// Optional: Generate static params if you want to prerender specific paths
export function generateStaticParams() {
  return [{ lang: "en" }];
}
