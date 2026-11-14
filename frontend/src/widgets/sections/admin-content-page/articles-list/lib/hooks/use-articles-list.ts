import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useAdminArticles, useDeleteArticle } from "@/src/entities/api/admin-articles/admin-articles-queries";
import type { IArticle } from "@/src/entities/article";

import { ARTICLES_LIST_CONFIG } from "../../model/config";
import { filterArticles } from "../helpers/filter-articles";

export const useArticlesList = () => {
    const query = useAdminArticles();
    const deleteMutation = useDeleteArticle();

    const [search, setSearch] = useState("");
    const [pending, setPending] = useState<IArticle | null>(null);

    const articles = useMemo(() => filterArticles(query.data ?? [], search), [query.data, search]);

    const cancelDelete = () => setPending(null);

    const confirmDelete = () => {
        if (!pending) return;

        deleteMutation.mutate(pending.id, {
            onSuccess: () => {
                toast.success(ARTICLES_LIST_CONFIG.messages.deleted);
                setPending(null);
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return {
        query,
        articles,
        search,
        setSearch,
        pending,
        requestDelete: setPending,
        cancelDelete,
        confirmDelete,
        deleting: deleteMutation.isPending,
    };
};