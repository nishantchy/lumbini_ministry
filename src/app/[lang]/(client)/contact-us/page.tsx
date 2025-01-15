// src/app/[lang]/(client)/contact-us/page.tsx
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { Content } from "@/components/contact/Content";

// Type guard for language validation
function isValidLang(lang: string): lang is "en" | "ne" {
  return lang === "en" || lang === "ne";
}

// Define page props type
type ContactPageProps = {
  params: { lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate static params for supported languages
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ne" }];
}

// Optional: Add metadata
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
};

// Page component
export default function Page({ params }: ContactPageProps) {
  const { lang } = params;
  const validLang = isValidLang(lang) ? lang : "en";

  return (
    <section>
      <div className="max-w-screen-xl mx-auto grid py-11 md:grid-cols-2 lg:w-full">
        <ContactForm lang={validLang} />
        <Content lang={validLang} />
      </div>
    </section>
  );
}
