"use client";
import { useGallery } from "@/services/queries";
import { Card } from "../ui/card";
import { AnimatedLoader } from "../common/Loader";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import Link from "next/link";

export default function GalleryCard() {
  const { data: gallery, isLoading, error } = useGallery();

  if (isLoading) return <AnimatedLoader size={30} />;
  if (error) return <div className="text-center">Error Loading Gallery</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto p-6">
      {gallery?.map((data, index) => (
        <Link href={`/gallery/${data._id}`} key={index}>
          <Card className="flex justify-center items-center flex-col w-80 h-full relative">
            <div className="w-80 h-72 relative">
              <Image
                src={data.images[0]}
                alt={data.title}
                width={400}
                height={200}
                className="object-cover w-full h-full"
              />
              <div className="absolute z-50 top-2 right-2 flex items-center justify-end gap-1 text-muted-foreground bg-primary p-2 rounded-xl">
                <ImageIcon size={18} className="text-white h-6 w-6" />
                <span className="text-sm text-white">{data.images.length}</span>
              </div>
            </div>
            <h2 className="text-sm font-semibold p-4 line-clamp-2">
              {data.title}
            </h2>
          </Card>
        </Link>
      ))}
    </div>
  );
}
