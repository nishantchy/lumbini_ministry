"use client";
import { useMembers } from "@/services/queries";
import Image from "next/image";
import Link from "next/link";

export default function OurMembers() {
  const { data: members, isLoading, error } = useMembers();
  // if (isLoading) return <AnimatedLoader size={30} />
  if (error) return <div className="text-center">Error loading Members</div>;
  return (
    <section className="max-w-screen-xl mx-auto space-y-5 p-5">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Our Members
      </h1>
      <div className="flex justify-around items-center gap-4 flex-wrap">
        {members?.map((member, index) => (
          <div key={index} className="relative group ">
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
                <Link href="#" className="text-white text-sm font-semibold ">
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
