import type { IArticle } from "@/src/entities/article";
import { BACKEND_PROXY } from "@/src/shared/config/api";

import type { IArticleInput } from "./types";

const ARTICLES_URL = `${BACKEND_PROXY}/api/articles`;

const request = async <T>(url: string, errorMessage: string, init: RequestInit = {}): Promise<T> => {
    const response = await fetch(url, {
        ...init,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
};

export const adminArticlesApi = {
    getAll(): Promise<IArticle[]> {
        return request(ARTICLES_URL, "Не удалось получить статьи");
    },

    getById(id: string): Promise<IArticle> {
        return request(`${ARTICLES_URL}/${id}`, "Не удалось получить статью");
    },

    create(input: IArticleInput): Promise<IArticle> {
        return request(ARTICLES_URL, "Не удалось создать статью", {
            method: "POST",
            body: JSON.stringify(input),
        });
    },

    update(id: string, input: IArticleInput): Promise<IArticle> {
        return request(`${ARTICLES_URL}/${id}`, "Не удалось сохранить статью", {
            method: "PUT",
            body: JSON.stringify(input),
        });
    },

    remove(id: string): Promise<IArticle> {
        return request(`${ARTICLES_URL}/${id}`, "Не удалось удалить статью", {
            method: "DELETE",
        });
    },
};