import type { IProjectResponse } from "@/src/shared/types/global-types";

export const filterProjects = (projects: IProjectResponse[], search: string) => {
    const query = search.trim().toLowerCase();

    if (!query) return projects;

    return projects.filter(
        (project) =>
            project.title.toLowerCase().includes(query) ||
            project.subtitle.toLowerCase().includes(query),
    );
};