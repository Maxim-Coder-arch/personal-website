export const ADMIN_ROUTES = {
    articles: "/admin/content/articles",
    articleNew: "/admin/content/articles/new",
    articleEdit: (id: string) => `/admin/content/articles/${id}`,
    siteArticle: (id: string) => `/articles/${id}`,
} as const;