"use client";
import PageHeader from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { useNews } from "@/services/queries";
import Link from "next/link";

export default function NewsPage() {
  const { data: news, isLoading, error } = useNews();
  const breadcrumbs = [
    {
      label: { en: "All News", np: "समाचार" },
      href: "/",
    },
  ];
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  if (error) return <div>Error loading News</div>;
  return (
    <div className="">
      <PageHeader
        title={{ en: "All News", np: "समाचार" }}
        breadcrumbs={breadcrumbs}
        lang="en"
      />
      <div className="max-w-screen-xl mx-auto space-y-3 p-5">
        <h1 className="text-2xl md:text-4xl font-bold text-center">All News</h1>
        <div className="flex justify-center items-start gap-6 flex-wrap">
          {news?.map((data, index) => (
            <Card className="p-4" key={index}>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <p>{data.content}</p>
                <Link
                  href={`/news/${data._id}`}
                  className="text-primary text-sm font-semibold"
                >
                  View More
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
