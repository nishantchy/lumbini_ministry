import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export const metadata: Metadata = {
  title: "सामाजिक विकास मन्‍त्रालय",
  description: "Developed By Nishant Chaudhary",
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <Header lang={lang} />
        <Navbar lang={lang} />
        {children}
        <Toaster />
        <Footer lang={lang} />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ lang: "en" }];
}
