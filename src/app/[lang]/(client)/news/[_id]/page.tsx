"use client";
import { useNews, useSingleNews } from "@/services/queries";
import { useParams } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NewsDetails() {
  const { _id } = useParams();
  const { data: newsData, isLoading, error } = useSingleNews(_id as string);
  const { data: news } = useNews();

  const breadcrumbs = [
    {
      label: { en: "News", np: "समाचार" },
      href: "/",
    },
    {
      label: {
        en: newsData?.title || "News Details",
        np: newsData?.title || "समाचार विवरण",
      },
      href: `/news/${_id}`,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error loading news</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={{ en: "News Details", np: "समाचार विवरण" }}
        breadcrumbs={breadcrumbs}
        lang="en"
      />

      <main className="container mx-auto px-4 py-8">
        <article
          key={newsData?._id}
          className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md"
        >
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            {newsData?.title}
          </h1>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {newsData?.content}
          </p>
        </article>
      </main>
      <div className="max-w-screen-md mx-auto space-y-3">
        <h1 className="text-2xl font-bold">Related News</h1>
        <div className="flex justify-center items-start gap-x-3">
          {news?.map((data, index) => (
            <Card className="p-4" key={index}>
              <div className="space-y-4">
                <h2>{data.title}</h2>
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
