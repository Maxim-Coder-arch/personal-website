import { IArticle } from "../../article";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const thoughtApi = {
    async getAll(): Promise<IArticle[]> {
        const response = await fetch(`${API_URL}/api/articles`);

        if (!response.ok) {
            throw new Error("Не удалось получить статьи");
        }

        return response.json();
    },

    async getById(id: string): Promise<IArticle | null> {
        const response = await fetch(`${API_URL}/api/articles/${id}`, {
            next: { revalidate: 60 },
        });

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Не удалось получить статью");
        }

        return response.json();
    },
};