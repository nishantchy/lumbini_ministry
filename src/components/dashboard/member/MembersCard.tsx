"use client";
import { AnimatedLoader } from "@/components/common/Loader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useMembers } from "@/services/queries";
import Image from "next/image";

export default function MembersCard() {
  const { data: members, isLoading, error } = useMembers();
  if (isLoading) return <AnimatedLoader size={20} />;
  if (error)
    return (
      <div className="flex justify-center items-center">
        Error loading Members
      </div>
    );
  return (
    <div>
      <Card className="p-2 space-y-2">
        <CardTitle>Members</CardTitle>
        {members?.map((member, index) => (
          <CardContent
            key={index}
            className="flex justify-start items-center gap-x-4"
          >
            <Image
              src={member.imageUrl}
              alt="Member"
              className="w-10 h-10 object-cover rounded-full"
              width={100}
              height={100}
            />
            <h2>{member.name}</h2>
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
