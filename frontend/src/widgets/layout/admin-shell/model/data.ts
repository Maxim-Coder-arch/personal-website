import { Activity, FolderKanban, LayoutDashboard, Users } from "lucide-react";

export const ADMIN_NAV = [
    { id: "overview", label: "Обзор", href: "/admin", icon: LayoutDashboard, ready: true, hasRange: true },
    { id: "audience", label: "Аудитория", href: "/admin/audience", icon: Users, ready: true, hasRange: true },
    { id: "visits", label: "Визиты", href: "/admin/visits", icon: Activity, ready: true, hasRange: true },
    { id: "content", label: "Контент", href: "/admin/content", icon: FolderKanban, ready: true, hasRange: false },
] as const;

export const ADMIN_SITE_LINK = { label: "На сайт", href: "/" } as const;