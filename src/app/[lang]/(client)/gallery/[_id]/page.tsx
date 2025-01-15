"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSingleGallery } from "@/services/queries";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatedLoader } from "@/components/common/Loader";

export default function GalleryDetail() {
  const params = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const {
    data: gallery,
    isLoading,
    error,
  } = useSingleGallery(params.id as string);

  if (isLoading) return <AnimatedLoader size={30} />;
  if (error) return <div className="text-center">Error Loading Gallery</div>;
  if (!gallery) return <div className="text-center">Gallery not found</div>;

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : gallery.images.length - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev < gallery.images.length - 1 ? prev + 1 : 0) : null
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;

    switch (e.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
        handleNext();
        break;
      case "Escape":
        setSelectedImageIndex(null);
        break;
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{gallery.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.images.map((image, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:opacity-90 transition-opacity group"
            onClick={() => setSelectedImageIndex(index)}
          >
            <div className="relative w-full h-72 overflow-hidden">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      >
        <DialogContent className="max-w-4xl">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          <div className="relative w-full h-[80vh]">
            {selectedImageIndex !== null && (
              <>
                <Image
                  src={gallery.images[selectedImageIndex]}
                  alt={`Preview ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />

                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                  {selectedImageIndex + 1} / {gallery.images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
