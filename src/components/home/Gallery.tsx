"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { GalleryTitle } from "@/lib/titles";
import { useGallery } from "@/services/queries";
import { AnimatedLoader } from "../common/Loader";
import Image from "next/image";

const GallerySection = ({ lang }: { lang: string }) => {
  const { data: galleryData, isLoading, error } = useGallery();
  if (isLoading) return <AnimatedLoader size={30} />;
  if (error) return <div>Error loading gallery</div>;
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-0 space-y-6 md:space-y-12">
      {GalleryTitle.map((title) => (
        <div key={title.id} className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            {title.title[lang as keyof typeof title.title]}
          </h1>
          <Link
            href={title.href}
            className="text-primary hover:text-primary-400 font-semibold"
          >
            {title.option[lang as keyof typeof title.option]}
          </Link>
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryData?.slice(0, 4).map((gallery, index) => (
          <Card className="cursor-pointer" key={index}>
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
              <Image
                src={gallery.images[0]}
                alt={`${gallery.title} gallery thumbnail`}
                className="object-cover w-full h-full"
                width={400}
                height={200}
              />
            </div>

            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {gallery.title}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ImageIcon size={18} />
                  <span className="text-sm">{gallery.images.length}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
