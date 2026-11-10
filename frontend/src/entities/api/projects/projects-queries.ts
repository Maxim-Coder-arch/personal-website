import { useQuery } from "@tanstack/react-query";

import { projectApi } from "./projects-api";

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
    return useQuery(projectQueries.all());
}

export function useProject(id: string) {
    return useQuery(projectQueries.detail(id));
}

export function useProjectImage(id: string) {
    return useQuery({
        queryKey: ["projects", "image", id],
        queryFn: () => projectApi.getImage(id),
        enabled: Boolean(id),
        staleTime: 5 * 60 * 1000,
    });
}