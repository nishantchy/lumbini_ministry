import PageHeader from "@/components/common/PageHeader";
import GalleryCard from "@/components/Gallery/GalleryCard";
import GallerySection from "@/components/home/Gallery";

export default function GalleryPage() {
  const breadcrumbs = [
    {
      label: { en: "Galleries", np: "समाचार" },
      href: "/",
    },
  ];
  return (
    <>
      <PageHeader
        title={{ en: "Galleries", np: "समाचार" }}
        breadcrumbs={breadcrumbs}
        lang="en"
      />{" "}
      <div className="p-5">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Galleries
        </h1>
        <GalleryCard />
      </div>
    </>
  );
}
