import { BACKEND_PROXY } from "@/src/shared/config/api";
import type { IProjectResponse } from "@/src/shared/types/global-types";

import type { IProjectInput } from "./types";

const PROJECTS_URL = `${BACKEND_PROXY}/api/projects`;

const send = async (url: string, errorMessage: string, init: RequestInit = {}) => {
    const response = await fetch(url, { ...init, credentials: "include" });

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return response;
};

const sendJson = (url: string, errorMessage: string, method: string, body: unknown) =>
    send(url, errorMessage, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

export const getAdminProjectImageUrl = (id: string, version: number) =>
    `${PROJECTS_URL}/${id}/image?v=${version}`;

export const adminProjectsApi = {
    async getAll(): Promise<IProjectResponse[]> {
        const response = await send(PROJECTS_URL, "Не удалось получить проекты");

        return response.json();
    },

    async getById(id: string): Promise<IProjectResponse> {
        const response = await send(`${PROJECTS_URL}/${id}`, "Не удалось получить проект");

        return response.json();
    },

    async create(input: IProjectInput): Promise<IProjectResponse> {
        const response = await sendJson(PROJECTS_URL, "Не удалось создать проект", "POST", input);

        return response.json();
    },

    async update(id: string, input: IProjectInput): Promise<void> {
        await sendJson(`${PROJECTS_URL}/${id}`, "Не удалось сохранить проект", "PUT", input);
    },

    async remove(id: string): Promise<void> {
        await send(`${PROJECTS_URL}/${id}`, "Не удалось удалить проект", { method: "DELETE" });
    },

    async reorder(ids: string[]): Promise<void> {
        await sendJson(`${PROJECTS_URL}/order`, "Не удалось сохранить порядок", "PUT", { ids });
    },

    async uploadImage(id: string, file: File): Promise<void> {
        const body = new FormData();

        body.append("file", file);

        await send(`${PROJECTS_URL}/${id}/image`, "Не удалось загрузить картинку", {
            method: "PUT",
            body,
        });
    },
};