import ContactForm from "@/components/contact/ContactForm";
import { Content } from "@/components/contact/Content";

function isValidLang(lang: string): lang is "en" | "ne" {
  return lang === "en" || lang === "ne";
}

const Page = async ({ params }: { params: { lang: string } }) => {
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
};

export default Page;
