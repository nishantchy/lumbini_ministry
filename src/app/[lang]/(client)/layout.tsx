import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";

type RootLayoutProps = {
  children: React.ReactNode;
  params: { lang: string };
};

export const metadata: Metadata = {
  title: "सामाजिक विकास मन्‍‍त्रालय",
  description: "Developed By Nishant Chaudhary",
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = params; // Remove await since params is not a Promise

  return (
    <html lang="en">
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

// Optional: Generate static params if you want to prerender specific paths
export function generateStaticParams() {
  return [{ lang: "en" }];
}
