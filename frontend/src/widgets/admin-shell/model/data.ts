import { Activity, FolderKanban, LayoutDashboard, Users } from "lucide-react";

export const ADMIN_NAV = [
  { id: "overview", label: "Обзор", href: "/admin", icon: LayoutDashboard, ready: true },
  { id: "audience", label: "Аудитория", href: "/admin/audience", icon: Users, ready: true },
  { id: "visits", label: "Визиты", href: "/admin/visits", icon: Activity, ready: false },
  { id: "content", label: "Контент", href: "/admin/content", icon: FolderKanban, ready: false },
] as const;