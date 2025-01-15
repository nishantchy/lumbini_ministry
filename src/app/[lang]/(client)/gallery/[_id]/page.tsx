"use client";
import PageHeader from "@/components/common/PageHeader";
import Overlay from "@/components/Gallery/Overlay";
import { useSingleGallery } from "@/services/queries";
import Image from "next/image";
import { useParams } from "next/navigation";

import React, { useState } from "react";

// Define the Gallery type
interface Gallery {
  _id: string;
  title: string;
  images: string[];
}

export default function GalleryDetails() {
  const { _id } = useParams();
  const { data: gallery, isLoading, error } = useSingleGallery(_id as string);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const breadcrumbs = [
    {
      label: { en: "Galleries", np: "समाचार" },
      href: "/gallery",
    },
    {
      label: {
        en: gallery?.title || "Gallery Details",
        np: gallery?.title || "समाचार विवरण",
      },
      href: `/gallery/${_id}`,
    },
  ];

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  if (error) return <div>Error loading gallery details</div>;

  if (!gallery) return <div>No gallery data found</div>;

  // Convert images array to photos array for the Overlay component
  const photos = gallery.images.map((url) => ({ url }));

  return (
    <>
      <PageHeader
        title={{ en: "Gallery Details", np: "समाचार विवरण" }}
        breadcrumbs={breadcrumbs}
        lang="en"
      />
      <div className="max-w-screen-xl mx-auto py-10 space-y-4 md:space-y-8 px-4 md:px-0">
        <h2 className="text-lg md:text-3xl font-bold text-center">
          {gallery.title}
        </h2>
        <div className="flex justify-around items-center flex-wrap gap-4">
          {photos.map((photo, index) => (
            <Image
              key={index}
              src={photo.url}
              alt={`Image ${index + 1} of ${gallery.title}`}
              width={500}
              height={300}
              className="w-96 h-64 object-cover cursor-pointer"
              onClick={() => {
                setInitialIndex(index);
                setOverlayOpen(true);
              }}
            />
          ))}
        </div>
        {overlayOpen && (
          <Overlay
            photos={photos}
            initialIndex={initialIndex}
            onClose={() => setOverlayOpen(false)}
          />
        )}
      </div>
    </>
  );
}
