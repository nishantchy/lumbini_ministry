import { cookies } from "next/headers";
import "../globals.css";
import NotFoundClient from "@/components/common/NotFound";

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  return <NotFoundClient lang={lang} />;
}
