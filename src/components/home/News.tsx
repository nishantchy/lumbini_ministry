"use client";
import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LinkButton from "../common/LinkButton";
import { ChevronRight } from "lucide-react";
import { NewsTitle } from "@/lib/titles";
import { useNews } from "@/services/queries";
import { AnimatedLoader } from "../common/Loader";

export default function NewsComponent({ lang }: { lang: string }) {
  const { data: newsData, isLoading, error } = useNews();
  if (isLoading) return <AnimatedLoader size={30} />;
  if (error)
    return (
      <div className="flex justify-center items-center">Error Loading news</div>
    );
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 items-start md:grid-cols-2">
        {NewsTitle.map((title) => (
          <div
            key={title.id}
            className="flex justify-center items-start space-y-6 flex-col"
          >
            <h1 className="text-xl md:text-4xl font-bold">
              {title.title[lang as keyof typeof title.title]}
            </h1>
            <p className="text-xs md:text-base text-normal text-justify max-w-lg">
              {title.description
                ? title.description[lang as keyof typeof title.description]
                : ""}
            </p>
            <LinkButton
              href={title.href}
              text={title.option[lang as keyof typeof title.option]}
            />
          </div>
        ))}
        <Accordion
          type="single"
          collapsible
          className="w-full bg-gray-100 p-10 rounded-lg"
        >
          {newsData?.map((news) => (
            <AccordionItem value={news.title} key={news._id}>
              <AccordionTrigger>{news.title}</AccordionTrigger>
              <AccordionContent className="!text-sm md:!text-base text-justify !line-clamp-2">
                {news.content}
              </AccordionContent>
              <AccordionContent>
                <Link
                  href={`/news/${news._id}`}
                  className="text-primary font-bold flex justify-start  items-center pt-3"
                >
                  Read More <ChevronRight className="w-4 h-4 text-primary" />
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
