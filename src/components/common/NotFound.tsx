"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import lottie from 'lottie-web';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

interface NotFoundClientProps {
  lang: string;
}

export default function NotFoundClient({ lang }: NotFoundClientProps) {
  const router = useRouter();
  const containerRef = useRef(null);

  //   useEffect(() => {
  //     if (containerRef.current) {
  //       const animation = lottie.loadAnimation({
  //         container: containerRef.current,
  //         renderer: 'svg',
  //         loop: true,
  //         autoplay: true,
  //         path: '/animations/404.json',
  //       });

  //       return () => animation.destroy();
  //     }
  //   }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div ref={containerRef} className="w-full max-w-md h-64" />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>

        <Button
          onClick={() => router.push(`/${lang}`)}
          className="flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
      </div>
    </div>
  );
}
