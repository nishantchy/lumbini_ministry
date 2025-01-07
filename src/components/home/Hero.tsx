"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { carouselData } from "@/lib/carousel";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[65vh]"
      >
        {carouselData.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <Image
              src={item.image}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-[65vh] object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            {/* Content above overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center flex-col space-y-3 text-white bg-black bg-opacity-40">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="max-w-screen-lg text-center">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
