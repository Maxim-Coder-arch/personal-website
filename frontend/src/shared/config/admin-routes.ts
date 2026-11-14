export const ADMIN_ROUTES = {
    articles: "/admin/content/articles",
    articleNew: "/admin/content/articles/new",
    articleEdit: (id: string) => `/admin/content/articles/${id}`,
    siteArticle: (id: string) => `/articles/${id}`,
    projects: "/admin/content/projects",
    projectNew: "/admin/content/projects/new",
    projectEdit: (id: string) => `/admin/content/projects/${id}`,
    siteProjects: "/projects",
} as const;