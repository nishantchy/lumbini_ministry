"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface Photo {
  url: string;
}

interface OverlayProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ photos, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { type: "just" } }}
        exit={{ y: -200, opacity: 0 }}
        className="fixed -top-8 left-0 z-50 h-screen w-full bg-[rgba(0,0,0,0.9)] flex items-center justify-center"
      >
        <button onClick={onClose} className="absolute top-3 right-3 z-50">
          <X size={32} className="text-white" />
        </button>

        <div className="relative flex items-center justify-center h-full w-full">
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + photos.length) % photos.length)
            }
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-50"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          <button
            onClick={() => setCurrent((prev) => (prev + 1) % photos.length)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-50"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          <Image
            className="max-w-full max-h-full object-contain"
            src={photos[current].url}
            alt="image"
            width={1000}
            height={1000}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Overlay;
