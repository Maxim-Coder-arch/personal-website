import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    useCreateProject,
    useDeleteProject,
    useUpdateProject,
} from "@/src/entities/api/admin-projects/admin-projects-queries";
import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { useUnsavedGuard } from "@/src/shared/lib/hooks/use-unsaved-guard";
import type { IProjectResponse } from "@/src/shared/types/global-types";

import { PROJECT_EDITOR_CONFIG } from "../../model/config";

import { useProjectForm } from "./use-project-form";
import { useProjectImage } from "./use-project-image";

type ConfirmKind = "leave" | "delete" | null;

const { messages } = PROJECT_EDITOR_CONFIG;

export const useProjectEditor = (project?: IProjectResponse) => {
    const router = useRouter();
    const form = useProjectForm(project);
    const image = useProjectImage();

    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const deleteMutation = useDeleteProject();

    const [confirm, setConfirm] = useState<ConfirmKind>(null);

    const isNew = !project;
    const saving = createMutation.isPending || updateMutation.isPending;
    const dirty = form.dirty || image.file !== null;

    useUnsavedGuard(dirty);

    const save = () => {
        if (saving) return;

        const hasImage = !isNew || image.file !== null;

        if (!form.validate(hasImage)) {
            toast.error(messages.invalid);
            return;
        }

        const input = form.toInput();

        if (!project) {
            if (!image.file) return;

            createMutation.mutate(
                { input, image: image.file },
                {
                    onSuccess: (result) => {
                        form.markSaved();
                        image.reset();

                        if (result.imageFailed) {
                            toast.error(messages.imageFailed);
                        } else {
                            toast.success(messages.created);
                        }

                        router.replace(ADMIN_ROUTES.projectEdit(result.id));
                    },
                    onError: (error) => toast.error(error.message),
                },
            );

            return;
        }

        updateMutation.mutate(
            { id: project.id, input, image: image.file },
            {
                onSuccess: () => {
                    form.markSaved();
                    image.reset();
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

    const selectImage = (file: File | null) => {
        image.select(file);

        if (file) form.clearError("image");
    };

    const back = () => {
        if (dirty) {
            setConfirm("leave");
            return;
        }

        router.push(ADMIN_ROUTES.projects);
    };

    const confirmLeave = () => {
        setConfirm(null);
        router.push(ADMIN_ROUTES.projects);
    };

    const confirmDelete = () => {
        if (!project) return;

        deleteMutation.mutate(project.id, {
            onSuccess: () => {
                toast.success(messages.deleted);
                setConfirm(null);
                router.replace(ADMIN_ROUTES.projects);
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return {
        form,
        image,
        selectImage,
        isNew,
        dirty,
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