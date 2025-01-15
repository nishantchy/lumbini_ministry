"use client";

import Notices from "@/components/home/Notices";
import EventCalendar from "@/components/home/EventCalender";
import GallerySection from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import MembersCard from "@/components/home/MembersCard";
import NewsComponent from "@/components/home/News";

interface PageProps {
  params: {
    lang: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Page({ params }: PageProps) {
  const { lang } = params;

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

// Generate static params for prerendering
export function generateStaticParams() {
  return [{ lang: "en" }];
}
