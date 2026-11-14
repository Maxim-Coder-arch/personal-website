import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { IProjectResponse } from "@/src/shared/types/global-types";

import { projectQueries } from "../projects/projects-queries";

import { adminProjectsApi } from "./admin-projects-api";
import type { ICreateProjectResult, IProjectInput } from "./types";

const ROOT_KEY = ["admin", "projects"] as const;

export const adminProjectsQueries = {
    key: ROOT_KEY,

    all: () => ({
        queryKey: [...ROOT_KEY, "list"] as const,
        queryFn: adminProjectsApi.getAll,
    }),

    detail: (id: string) => ({
        queryKey: [...ROOT_KEY, "detail", id] as const,
        queryFn: () => adminProjectsApi.getById(id),
    }),
};

const useInvalidateProjects = () => {
    const queryClient = useQueryClient();

    return () =>
        Promise.all([
            queryClient.invalidateQueries({ queryKey: ROOT_KEY }),
            queryClient.invalidateQueries({ queryKey: projectQueries.all().queryKey }),
        ]);
};

export function useAdminProjects() {
    return useQuery(adminProjectsQueries.all());
}

export function useAdminProject(id: string) {
    return useQuery(adminProjectsQueries.detail(id));
}

export function useCreateProject() {
    const invalidate = useInvalidateProjects();

    return useMutation({
        mutationFn: async ({
            input,
            image,
        }: {
            input: IProjectInput;
            image: File;
        }): Promise<ICreateProjectResult> => {
            const created = await adminProjectsApi.create(input);

            try {
                await adminProjectsApi.uploadImage(created.id, image);

                return { id: created.id, imageFailed: false };
            } catch {
                return { id: created.id, imageFailed: true };
            }
        },
        onSettled: invalidate,
    });
}

export function useUpdateProject() {
    const invalidate = useInvalidateProjects();

    return useMutation({
        mutationFn: async ({
            id,
            input,
            image,
        }: {
            id: string;
            input: IProjectInput;
            image: File | null;
        }) => {
            await adminProjectsApi.update(id, input);

            if (image) {
                await adminProjectsApi.uploadImage(id, image);
            }
        },
        onSettled: invalidate,
    });
}

export function useDeleteProject() {
    const invalidate = useInvalidateProjects();

    return useMutation({
        mutationFn: (id: string) => adminProjectsApi.remove(id),
        onSettled: invalidate,
    });
}

export function useReorderProjects() {
    const queryClient = useQueryClient();
    const invalidate = useInvalidateProjects();
    const listKey = adminProjectsQueries.all().queryKey;

    return useMutation({
        mutationFn: (ids: string[]) => adminProjectsApi.reorder(ids),

        onMutate: async (ids) => {
            await queryClient.cancelQueries({ queryKey: listKey });

            const previous = queryClient.getQueryData<IProjectResponse[]>(listKey);

            if (previous) {
                const byId = new Map(previous.map((project) => [project.id, project]));

                queryClient.setQueryData(
                    listKey,
                    ids
                        .map((id) => byId.get(id))
                        .filter((project): project is IProjectResponse => Boolean(project)),
                );
            }

            return { previous };
        },

        onError: (_error, _ids, context) => {
            if (context?.previous) {
                queryClient.setQueryData(listKey, context.previous);
            }
        },

        onSettled: invalidate,
    });
}