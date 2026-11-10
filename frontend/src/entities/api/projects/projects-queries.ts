import { useQuery } from "@tanstack/react-query";

import { projectApi, toProject } from "./projects-api";

export const projectQueries = {
    all: () => ({
        queryKey: ["projects"],
        queryFn: projectApi.getAll,
    }),

    detail: (id: string) => ({
        queryKey: ["projects", id],
        queryFn: () => projectApi.getById(id),
    }),
};

export function useProjects() {
    return useQuery({
        ...projectQueries.all(),
        select: (projects) => projects.map(toProject),
    });
}

export function useProject(id: string) {
    return useQuery({
        ...projectQueries.detail(id),
        select: toProject,
    });
}