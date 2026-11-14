import type { IArticle } from "@/src/entities/article";

export const filterArticles = (articles: IArticle[], search: string) => {
    const query = search.trim().toLowerCase();

    if (!query) return articles;

    return articles.filter(
        (article) =>
            article.title.toLowerCase().includes(query) ||
            article.subtitle.toLowerCase().includes(query),
    );
};