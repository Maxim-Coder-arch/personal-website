import { useQuery } from "@tanstack/react-query";

import { thoughtApi } from "./thougths-api";

export const thoughtQueries = {
    all: () => ({
        queryKey: ["thoughts"],
        queryFn: thoughtApi.getAll,
    }),

    detail: (id: string) => ({
        queryKey: ["thought", id],
        queryFn: () => thoughtApi.getById(id),
    }),
};

export function useThoughts() {
    return useQuery({
        ...thoughtQueries.all(),
        select: (articles) =>
            [...articles].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            ),
    });
}

export function useThought(id: string) {
    return useQuery(thoughtQueries.detail(id));
}

export function useThoughtTitles() {
    return useQuery({
        ...thoughtQueries.all(),
        select: (articles) =>
            new Map(articles.map((article) => [article.id.toLowerCase(), article.title])),
    });
}