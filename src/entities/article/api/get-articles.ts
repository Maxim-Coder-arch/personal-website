import { thoughts } from "../model/articles.mock";
import type { IArticle } from "../model/types";

const sortedArticles = [...thoughts].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
);

export const getArticles = (): IArticle[] => sortedArticles;

export const getArticleById = (id: string): IArticle | undefined => {
    return sortedArticles.find((article) => article.id === id);
}