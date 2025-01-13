"use client";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import NepaliDateConverter from "nepali-date-converter";
import { Button } from "../ui/button";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { mainTitle } from "@/lib/titles";

export default function Header({ lang }: { lang: string }) {
  const [nepaliDate, setNepaliDate] = useState("");
  const router = useRouter();
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ne" : "en";
    Cookie.set("lang", newLang);
    router.refresh();
  };

  useEffect(() => {
    const currentDate = new Date();
    const nepaliDateObj = new NepaliDateConverter(currentDate);

    const nepaliMonths = [
      "बैशाख",
      "जेष्ठ",
      "असार",
      "श्रावण",
      "भाद्र",
      "आश्विन",
      "कार्तिक",
      "मंसिर",
      "पुस",
      "माघ",
      "फाल्गुण",
      "चैत्र",
    ];

    // Use the correct month by subtracting 1 for zero-based array indexing
    const formattedDate = `${
      nepaliMonths[nepaliDateObj.getMonth()]
    } ${nepaliDateObj.getDate()}, ${nepaliDateObj.getYear()}`;
    setNepaliDate(formattedDate);
  }, []);

  return (
    <header className="hidden lg:flex justify-between items-center max-w-screen-2xl mx-auto pb-6">
      <div className="flex justify-center items-center space-y-2 flex-col">
        <Image
          src="/common/logo.png"
          className="w-36 h-36 object-contain"
          alt="10"
          width={500}
          height={500}
        />
        <p className="text-sm font-bold text-secondary-500">{nepaliDate}</p>
      </div>
      <div>
        {mainTitle.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center space-y-4 pt-8"
          >
            <h2 className="text-lg font-medium">
              {item.province[lang as keyof typeof item.province]}
            </h2>
            <h1 className="text-secondary-500 font-semibold text-3xl">
              {item.ministry[lang as keyof typeof item.ministry]}
            </h1>
            <h2 className="text-lg font-semibold">
              {item.address[lang as keyof typeof item.address]}
            </h2>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center space-x-3">
        <img
          src="/common/nepal-flag.png"
          alt="Nepal Flag"
          className="w-36 h-36 object-contain"
        />

        <div className="flex justify-center items-center ">
          <Button
            onClick={toggleLanguage}
            variant="secondary"
            className={`font-medium text-primary px-4 py-2 rounded-md bg-transparent shadow-none ${
              lang === "en"
            }`}
          >
            {/* <Image
              src="/common/nepal.svg"
              width={20}
              height={20}
              className="h-10 w-10 object-contain"
              alt="nepal"
            /> */}
            NP
          </Button>
          <span>|</span>
          <Button
            onClick={toggleLanguage}
            variant="secondary"
            className={`font-medium text-primary px-4 py-2 rounded-md ${
              lang === "en"
            }`}
          >
            {/* <Image
              src="/common/america.svg"
              width={30}
              height={30}
              className="h-8 w-8 object-contain"
              alt="nepal"
            /> */}
            EN
          </Button>
        </div>
      </div>
    </header>
  );
}
