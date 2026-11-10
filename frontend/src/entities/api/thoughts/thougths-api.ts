import { IArticle } from "../../article";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const thoughtApi = {
    async getAll(): Promise<IArticle[]> {
        const response = await fetch(`${API_URL}/api/articles`);

        if (!response.ok) {
            throw new Error("Не удалось получить проекты");
        }

        return response.json();
    },

    async getById(id: string): Promise<IArticle> {
        const response = await fetch(`${API_URL}/api/articles/${id}`);

        if (!response.ok) {
            throw new Error("Не удалось получить проект");
        }

        return response.json();
    },
};