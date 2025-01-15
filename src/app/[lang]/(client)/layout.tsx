import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "सामाजिक विकास मन्‍त्रालय",
  description: "Developed By Nishant Chaudhary",
};

export default async function RootLayout({
  children,
  params,
  searchParams,
}: RootLayoutProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const { lang } = resolvedParams;

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
  return [{ lang: "en" }, { lang: "ne" }];
}
