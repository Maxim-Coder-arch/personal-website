import { IProjectResponse } from "@/src/shared/types/global-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const projectApi = {
    async getAll(): Promise<IProjectResponse[]> {
        const response = await fetch(`${API_URL}/api/projects`);

        if (!response.ok) {
            throw new Error("Не удалось получить проекты");
        }

        return response.json();
    },

    async getById(id: string): Promise<IProjectResponse> {
        const response = await fetch(`${API_URL}/api/projects/${id}`);

        if (!response.ok) {
            throw new Error("Не удалось получить проект");
        }

        return response.json();
    },

    async getImage(id: string): Promise<Blob> {
        const response = await fetch(
            `${API_URL}/api/projects/${id}/image`
        );

        if (!response.ok) {
            throw new Error("Не удалось загрузить изображение проекта");
        }

        return response.blob();
    },
};