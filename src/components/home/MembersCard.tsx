"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const MemberCarousel: React.FC = () => {
  const members = [
    {
      name: "John Doe",
      jobTitle: "Software Engineer",
      imageUrl:
        "https://images.pexels.com/photos/1181427/pexels-photo-1181427.jpeg", // Example Pexels image
    },
    {
      name: "Jane Smith",
      jobTitle: "Product Manager",
      imageUrl:
        "https://images.pexels.com/photos/2204537/pexels-photo-2204537.jpeg", // Example Pexels image
    },

    {
      name: "Bob Brown",
      jobTitle: "Data Scientist",
      imageUrl:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg", // Example Pexels image
    },
    {
      name: "Charlie Davis",
      jobTitle: "DevOps Engineer",
      imageUrl:
        "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg", // Example Pexels image
    },
    {
      name: "Bob Brown",
      jobTitle: "Data Scientist",
      imageUrl:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg", // Example Pexels image
    },
    {
      name: "Charlie Davis",
      jobTitle: "DevOps Engineer",
      imageUrl:
        "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg", // Example Pexels image
    },
    {
      name: "Bob Brown",
      jobTitle: "Data Scientist",
      imageUrl:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg", // Example Pexels image
    },
    {
      name: "Charlie Davis",
      jobTitle: "DevOps Engineer",
      imageUrl:
        "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg", // Example Pexels image
    },
  ];
  const content = {
    en: {
      title: "Our Members",
      view: "See More",
    },
    np: {
      title: "हाम्रो सदस्यहरू",
      view: "अझै हेर्नुहोस्",
    },
  };

  return (
    <section className="max-w-screen-xl mx-auto space-y-6 md:space-y-12 px-4 md:px-0">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{content.en.title}</h1>
        <Link
          href="/members"
          className="text-primary text-sm md:text-base font-semibold hover:text-primary-400"
        >
          {content.en.view}
        </Link>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="relative group">
              <Image
                src={member.imageUrl}
                alt="member"
                width={300}
                height={500}
                className="w-[20rem] h-[20rem] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-primary-400/10 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              {/* Member Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:-translate-y-10 transition-all duration-300">
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-sm">{member.jobTitle}</p>
                {/* View More Link */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300">
                  <Link
                    href="/members"
                    className="text-white text-sm font-semibold "
                  >
                    {content.en.view}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MemberCarousel;
