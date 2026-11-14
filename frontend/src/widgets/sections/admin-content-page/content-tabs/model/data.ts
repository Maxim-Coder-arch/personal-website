import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";

export const CONTENT_TABS_PILL_ID = "content-tabs-pill";

export const CONTENT_TABS = [
    { id: "articles", label: "Статьи", href: ADMIN_ROUTES.articles, ready: true },
    { id: "projects", label: "Проекты", href: "/admin/content/projects", ready: false },
] as const;