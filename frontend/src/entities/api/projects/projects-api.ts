import { BACKEND_PROXY, PUBLIC_API_URL } from "@/src/shared/config/api";
import { IProject, IProjectResponse } from "@/src/shared/types/global-types";

export const getProjectImageUrl = (id: string) =>
    `${BACKEND_PROXY}/api/projects/${id}/image`;

export const toProject = (project: IProjectResponse): IProject => ({
    ...project,
    imagePath: getProjectImageUrl(project.id),
});

export const projectApi = {
    async getAll(): Promise<IProjectResponse[]> {
        const response = await fetch(`${PUBLIC_API_URL}/api/projects`);

        if (!response.ok) {
            throw new Error("Не удалось получить проекты");
        }

        return response.json();
    },

    async getById(id: string): Promise<IProjectResponse> {
        const response = await fetch(`${PUBLIC_API_URL}/api/projects/${id}`);

        if (!response.ok) {
            throw new Error("Не удалось получить проект");
        }

        return response.json();
    },
};