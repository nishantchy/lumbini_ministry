import { Member } from "@/config/columns/memberColumn";
import useSWR from "swr";
import fetcher from "./fetcher";

export function useMembers() {
  return useSWR<Member[]>("/api/members", fetcher);
}
