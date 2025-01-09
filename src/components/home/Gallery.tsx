"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

// Sample gallery data
const galleryData = [
  {
    id: 1,
    title: "Nature Landscapes",
    imageCount: 24,
    thumbnailUrl:
      "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
  },
  {
    id: 2,
    title: "Urban Photography",
    imageCount: 36,
    thumbnailUrl:
      "https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg",
  },
  {
    id: 3,
    title: "Wildlife Collection",
    imageCount: 18,
    thumbnailUrl:
      "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg",
  },
  {
    id: 4,
    title: "Architecture",
    imageCount: 42,
    thumbnailUrl:
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
  },
  {
    id: 5,
    title: "Portrait Photography",
    imageCount: 30,
    thumbnailUrl:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    id: 6,
    title: "Food Gallery",
    imageCount: 28,
    thumbnailUrl:
      "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
  },
  {
    id: 7,
    title: "Travel Moments",
    imageCount: 56,
    thumbnailUrl:
      "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg",
  },
  {
    id: 8,
    title: "Abstract Art",
    imageCount: 15,
    thumbnailUrl:
      "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg",
  },
];

interface GalleryCardProps {
  title: string;
  imageCount: number;
  thumbnailUrl: string;
  onClick?: () => void;
}

const GalleryCard = ({
  title,
  imageCount,
  thumbnailUrl,
  onClick,
}: GalleryCardProps) => {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={thumbnailUrl}
          alt={`${title} gallery thumbnail`}
          className="object-cover w-full h-full"
        />
      </div>

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <ImageIcon size={18} />
            <span className="text-sm">{imageCount}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const GallerySection = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryData.slice(0, 4).map((gallery) => (
          <GalleryCard
            key={gallery.id}
            title={gallery.title}
            imageCount={gallery.imageCount}
            thumbnailUrl={gallery.thumbnailUrl}
            onClick={() => console.log(`Clicked gallery: ${gallery.title}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
