import { useQuery } from "@tanstack/react-query";

import { thoughtApi } from "./thougths-api";

export const thoughtQueries = {
    all: () => ({
        queryKey: ["projects"],
        queryFn: thoughtApi.getAll,
    }),

    detail: (id: string) => ({
        queryKey: ["projects", id],
        queryFn: () => thoughtApi.getById(id),
    }),
};

export function useThoughts() {
    return useQuery(thoughtQueries.all());
}

export function useThought(id: string) {
    return useQuery(thoughtQueries.detail(id));
}