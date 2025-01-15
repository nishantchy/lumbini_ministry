"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { MembersTitle } from "@/lib/titles";
import LinkButton from "../common/LinkButton";
import { useMembers } from "@/services/queries";
import { AnimatedLoader } from "../common/Loader";

const MemberCarousel = ({ lang }: { lang: string }) => {
  const { data: members, error, isLoading } = useMembers();
  if (isLoading) return <AnimatedLoader size={30} />;
  if (error) return <div>Error loading members</div>;

  return (
    <section className="max-w-screen-xl mx-auto space-y-6 md:space-y-12 px-4 md:px-0">
      {MembersTitle.map((title) => (
        <div key={title.id} className="flex justify-between items-center">
          <h1 className="text-xl md:text-4xl font-bold">
            {title.title[lang as keyof typeof title.title]}
          </h1>
          <Link
            href={title.href}
            className="text-xs md:text-base text-primary hover:text-primary-400 font-semibold"
          >
            {title.option[lang as keyof typeof title.option]}
          </Link>
        </div>
      ))}

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
        {members?.map((member, index) => (
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
                <p className="text-sm">{member.post}</p>
                {/* View More Link */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300">
                  <Link
                    href="/members"
                    className="text-white text-sm font-semibold "
                  >
                    View More
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
