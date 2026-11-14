import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
    useAdminProjects,
    useDeleteProject,
    useReorderProjects,
} from "@/src/entities/api/admin-projects/admin-projects-queries";
import type { IProjectResponse } from "@/src/shared/types/global-types";

import { PROJECTS_LIST_CONFIG } from "../../model/config";
import { filterProjects } from "../helpers/filter-projects";
import { moveId } from "../helpers/move-item";

export const useProjectsList = () => {
    const query = useAdminProjects();
    const deleteMutation = useDeleteProject();
    const reorderMutation = useReorderProjects();

    const [search, setSearch] = useState("");
    const [pending, setPending] = useState<IProjectResponse | null>(null);

    const projects = useMemo(() => filterProjects(query.data ?? [], search), [query.data, search]);

    const canMove = search.trim() === "";

    const move = (index: number, direction: -1 | 1) => {
        const ids = (query.data ?? []).map((project) => project.id);
        const next = moveId(ids, index, direction);

        if (next === ids) return;

        reorderMutation.mutate(next, { onError: (error) => toast.error(error.message) });
    };

    const cancelDelete = () => setPending(null);

    const confirmDelete = () => {
        if (!pending) return;

        deleteMutation.mutate(pending.id, {
            onSuccess: () => {
                toast.success(PROJECTS_LIST_CONFIG.messages.deleted);
                setPending(null);
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return {
        query,
        projects,
        search,
        setSearch,
        canMove,
        move,
        moving: reorderMutation.isPending,
        pending,
        requestDelete: setPending,
        cancelDelete,
        confirmDelete,
        deleting: deleteMutation.isPending,
    };
};