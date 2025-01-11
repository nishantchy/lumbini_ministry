import { Member } from "@/config/columns/memberColumn";
import useSWR from "swr";
import fetcher from "./fetcher";
import { Gallery } from "@/config/columns/galleryColumns";
import { News } from "@/config/columns/newsColumn";

export function useMembers() {
  return useSWR<Member[]>("/api/members", fetcher);
}

export function useGallery() {
  return useSWR<Gallery[]>("/api/gallery", fetcher);
}

export function useNews() {
  return useSWR<News[]>("/api/news", fetcher);
}

export function useDocuments() {
  return useSWR<any[]>("/api/documents", fetcher);
}
