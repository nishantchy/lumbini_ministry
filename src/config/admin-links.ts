import {
  LayoutDashboard,
  Users,
  Image,
  FileText,
  Newspaper,
  AlertCircle,
} from "lucide-react";

export const adminLinks = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/admin-dashboard/members",
    icon: Users,
  },
  {
    title: "Gallery",
    href: "/admin-dashboard/gallery",
    icon: Image,
  },
  {
    title: "Documents",
    href: "/admin-dashboard/documents",
    icon: FileText,
  },
  {
    title: "News",
    href: "/admin-dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Popup",
    href: "/admin-dashboard/popup",
    icon: AlertCircle,
  },
] as const;
