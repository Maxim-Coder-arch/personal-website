import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { thoughtQueries } from "../thoughts/thought-queries";

import { adminArticlesApi } from "./admin-articles-api";
import type { IArticleInput } from "./types";

const ROOT_KEY = ["admin", "articles"] as const;

const [THOUGHT_DETAIL_KEY] = thoughtQueries.detail("").queryKey;

export const adminArticlesQueries = {
    key: ROOT_KEY,

    all: () => ({
        queryKey: [...ROOT_KEY, "list"] as const,
        queryFn: adminArticlesApi.getAll,
    }),

    detail: (id: string) => ({
        queryKey: [...ROOT_KEY, "detail", id] as const,
        queryFn: () => adminArticlesApi.getById(id),
    }),
};

const useInvalidateArticles = () => {
    const queryClient = useQueryClient();

    return () =>
        Promise.all([
            queryClient.invalidateQueries({ queryKey: ROOT_KEY }),
            queryClient.invalidateQueries({ queryKey: thoughtQueries.all().queryKey }),
            queryClient.invalidateQueries({ queryKey: [THOUGHT_DETAIL_KEY] }),
        ]);
};

export function useAdminArticles() {
    return useQuery({
        ...adminArticlesQueries.all(),
        select: (articles) =>
            [...articles].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            ),
    });
}

export function useAdminArticle(id: string) {
    return useQuery(adminArticlesQueries.detail(id));
}

export function useCreateArticle() {
    const invalidate = useInvalidateArticles();

    return useMutation({
        mutationFn: (input: IArticleInput) => adminArticlesApi.create(input),
        onSuccess: invalidate,
    });
}

export function useUpdateArticle() {
    const invalidate = useInvalidateArticles();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: IArticleInput }) =>
            adminArticlesApi.update(id, input),
        onSuccess: invalidate,
    });
}

export function useDeleteArticle() {
    const invalidate = useInvalidateArticles();

    return useMutation({
        mutationFn: (id: string) => adminArticlesApi.remove(id),
        onSuccess: invalidate,
    });
}