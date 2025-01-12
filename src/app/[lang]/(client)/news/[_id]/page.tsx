"use client";
import { useSingleNews } from "@/services/queries";
import { useParams } from "next/navigation";

export default function NewsDetails() {
  const { _id } = useParams();
  const { data: newsData, isLoading, error } = useSingleNews(_id as string);
  return (
    <div>
      <h1>{newsData?.title}</h1>
      <p>{newsData?.content}</p>
    </div>
  );
}
