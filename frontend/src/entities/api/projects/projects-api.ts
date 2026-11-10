import { IProject, IProjectResponse } from "@/src/shared/types/global-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProjectImageUrl = (id: string) =>
    `${API_URL}/api/projects/${id}/image`;

export const toProject = (project: IProjectResponse): IProject => ({
    ...project,
    imagePath: getProjectImageUrl(project.id),
});

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
};