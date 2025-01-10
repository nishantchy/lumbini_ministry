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
interface NewsItem {
  id: number;
  title: string;
  description: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "नेपाल सरकारले स्वास्थ्य बजेट बढायो",
    description:
      "नेपाल सरकारले आगामी वित्तीय वर्षको लागि स्वास्थ्य क्षेत्रमा बजेट २०% बढाउने घोषणा गरेको छ। यस निर्णयले ग्रामीण क्षेत्रका अस्पतालहरूलाई अधिक सहायता पुग्नेछ।",
  },
  {
    id: 2,
    title: "सार्वजनिक यातायातमा नयाँ सुधार योजना",
    description:
      "काठमाडौं महानगरपालिकाले सार्वजनिक यातायातलाई अझ प्रभावकारी बनाउन नयाँ सुधार योजना लागू गर्ने घोषणा गरेको छ। यस योजनामा नयाँ बस र रेल मार्गहरूको विस्तार समावेश हुनेछ।",
  },
  {
    id: 3,
    title: "नेपालमा जलवायु परिवर्तनको असर बढ्दै",
    description:
      "नेपालमा जलवायु परिवर्तनको असर बढ्दै गइरहेको छ। यस वर्षको असार महिना असाधारण गर्मीको कारण सबैभन्दा गर्मा रहेको छ। विशेषज्ञहरूले तत्काल कार्य गर्नुपर्ने बताएका छन्।",
  },
  {
    id: 4,
    title: "महिलाहरूको लागि नयाँ उद्यमिता कोर्स सुरु",
    description:
      "नेपाल सरकारले महिलाहरूको उद्यमिता प्रवर्धन गर्न नयाँ प्रशिक्षण कार्यक्रमको शुरुवात गरेको छ। यो कार्यक्रम देशभरिका महिला उद्यमीहरूलाई व्यापारको विकास र संचालनमा मद्दत पुर्याउने उद्देश्य राख्छ।",
  },
];

export default function NewsComponent({ lang }: { lang: string }) {
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 items-start md:grid-cols-2">
        {NewsTitle.map((title) => (
          <div
            key={title.id}
            className="flex justify-center items-start space-y-6 flex-col"
          >
            <h1 className="text-4xl font-bold">
              {title.title[lang as keyof typeof title.title]}
            </h1>
            <p className="text-normal text-justify max-w-lg">
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
          {newsData.map((news) => (
            <AccordionItem value={news.title} key={news.id}>
              <AccordionTrigger>{news.title}</AccordionTrigger>
              <AccordionContent>{news.description}</AccordionContent>
              <AccordionContent>
                <Link
                  href={`/news/${news.id}`}
                  className="text-primary font-bold flex justify-start  items-center"
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
