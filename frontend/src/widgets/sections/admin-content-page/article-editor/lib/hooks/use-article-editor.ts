import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    useCreateArticle,
    useDeleteArticle,
    useUpdateArticle,
} from "@/src/entities/api/admin-articles/admin-articles-queries";
import type { IArticle } from "@/src/entities/article";
import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { useUnsavedGuard } from "@/src/shared/lib/hooks/use-unsaved-guard";

import { ARTICLE_EDITOR_CONFIG } from "../../model/config";
import type { EditorMode } from "../../model/types";

import { useArticleForm } from "./use-article-form";

type ConfirmKind = "leave" | "delete" | null;

const { messages } = ARTICLE_EDITOR_CONFIG;

export const useArticleEditor = (article?: IArticle) => {
    const router = useRouter();
    const form = useArticleForm(article);

    const createMutation = useCreateArticle();
    const updateMutation = useUpdateArticle();
    const deleteMutation = useDeleteArticle();

    const [mode, setMode] = useState<EditorMode>("write");
    const [confirm, setConfirm] = useState<ConfirmKind>(null);

    const isNew = !article;
    const saving = createMutation.isPending || updateMutation.isPending;

    useUnsavedGuard(form.dirty);

    const save = () => {
        if (saving) return;

        if (!form.validate()) {
            toast.error(messages.invalid);
            return;
        }

        const input = form.toInput();

        if (!article) {
            createMutation.mutate(input, {
                onSuccess: (created) => {
                    form.markSaved();
                    toast.success(messages.created);
                    router.replace(ADMIN_ROUTES.articleEdit(created.id));
                },
                onError: (error) => toast.error(error.message),
            });

            return;
        }

        updateMutation.mutate(
            { id: article.id, input },
            {
                onSuccess: () => {
                    form.markSaved();
                    toast.success(messages.saved);
                },
                onError: (error) => toast.error(error.message),
            },
        );
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
                event.preventDefault();
                save();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const back = () => {
        if (form.dirty) {
            setConfirm("leave");
            return;
        }

        router.push(ADMIN_ROUTES.articles);
    };

    const confirmLeave = () => {
        setConfirm(null);
        router.push(ADMIN_ROUTES.articles);
    };

    const confirmDelete = () => {
        if (!article) return;

        deleteMutation.mutate(article.id, {
            onSuccess: () => {
                toast.success(messages.deleted);
                setConfirm(null);
                router.replace(ADMIN_ROUTES.articles);
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return {
        form,
        mode,
        setMode,
        isNew,
        saving,
        deleting: deleteMutation.isPending,
        confirm,
        save,
        back,
        requestDelete: () => setConfirm("delete"),
        cancelConfirm: () => setConfirm(null),
        confirmLeave,
        confirmDelete,
    };
};