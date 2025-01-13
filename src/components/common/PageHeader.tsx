import Link from "next/link";
import { ChevronLeft } from "lucide-react";
// import { GoDotFill } from "react-icons/go";
import bgImage from "../../../public/common/titlebg.png";

interface MultilanguageText {
  en: string;
  np: string;
}

interface Breadcrumb {
  label: MultilanguageText;
  href: string;
}

interface PageHeaderProps {
  title: MultilanguageText;
  breadcrumbs: Breadcrumb[];
  lang: string;
}

export default function PageHeader({
  title,
  breadcrumbs,
  lang,
}: PageHeaderProps) {
  return (
    <section
      className="relative bg-primary text-white"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "609px 148px",
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="max-w-screen-xl relative mx-auto w-full pb-5 pt-12 font-nunito">
        <h1 className="text-commonTitle font-semibold">
          {title[lang as keyof MultilanguageText]}
        </h1>
        <div className="flex items-center pt-[24px] text-description">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index} className="flex items-center">
              {index === 0 ? (
                <Link href={breadcrumb.href} className="group">
                  <span className="flex items-center">
                    <ChevronLeft
                      className="mr-1 transition-all duration-700 ease-in-out group-hover:rotate-180 group-hover:text-button"
                      size={20}
                    />
                    <span className="relative">
                      <span className="inline-block">
                        {breadcrumb.label[lang as keyof MultilanguageText]}
                      </span>
                      <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-button transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </span>
                  </span>
                </Link>
              ) : (
                <>
                  {/* <GoDotFill className="mx-1 text-button" size={16} /> */}
                  <Link href={breadcrumb.href} className="group relative">
                    <span className="inline-block pl-5">
                      {breadcrumb.label[lang as keyof MultilanguageText]}
                    </span>
                    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-button transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
