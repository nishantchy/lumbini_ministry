"use client";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns"; // Import from date-fns package
import { parse } from "date-fns"; // Import from date-fns package
import { startOfWeek } from "date-fns"; // Import from date-fns package
import { getDay } from "date-fns"; // Import from date-fns package
import { enUS } from "date-fns/locale/en-US"; // Import locale from date-fns
import { eventData } from "@/lib/calender"; // Assuming you have eventData defined
import Link from "next/link";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function EventCalender() {
  const content = {
    en: {
      title: "Our Gallery",
      view: "See More",
    },
    np: {
      title: "हाम्रो ग्यालरी",
      view: "अझै हेर्नुहोस्",
    },
  };
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-0 space-y-6 md:space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{content.en.title}</h1>
        <Link
          href="/members"
          className="text-primary text-sm md:text-base font-semibold hover:text-primary-400"
        >
          {content.en.view}
        </Link>
      </div>
      <div>
        <Calendar
          localizer={localizer}
          events={eventData} 
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </section>
  );
}
