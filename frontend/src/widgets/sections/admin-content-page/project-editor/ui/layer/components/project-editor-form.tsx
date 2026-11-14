"use client";

import { getAdminProjectImageUrl } from "@/src/entities/api/admin-projects/admin-projects-api";
import { AdminCard, AdminConfirm } from "@/src/shared/ui/admin-ui";

import { useProjectEditor } from "../../../lib/hooks/use-project-editor";
import { PROJECT_EDITOR_CONFIG } from "../../../model/config";
import type { ProjectEditorFormProps } from "../../../model/types";

import { AdditionalDataEditor } from "./additional-data-editor";
import { ImagePicker } from "./image-picker";
import { ProjectEditorHeader } from "./project-editor-header";
import { ProjectEditorLayout } from "./project-editor-layout";
import { ProjectFields } from "./project-fields";

export const ProjectEditorForm = ({ project, version = 0 }: ProjectEditorFormProps) => {
    const {
        form,
        image,
        selectImage,
        isNew,
        dirty,
        saving,
        deleting,
        confirm,
        save,
        back,
        requestDelete,
        cancelConfirm,
        confirmLeave,
        confirmDelete,
    } = useProjectEditor(project);

    const { delay } = PROJECT_EDITOR_CONFIG;

    const currentImage = project ? getAdminProjectImageUrl(project.id, version) : null;

    return (
        <ProjectEditorLayout>
            <ProjectEditorHeader
                isNew={isNew}
                dirty={dirty}
                saving={saving}
                onBack={back}
                onSave={save}
                onDelete={isNew ? undefined : requestDelete}
            />

            <AdminCard title="Основное" delay={delay}>
                <ProjectFields values={form.values} errors={form.errors} onChange={form.setField} />
            </AdminCard>

            <AdminCard title="Обложка" delay={delay * 2}>
                <ImagePicker
                    previewUrl={image.previewUrl ?? currentImage}
                    error={image.error ?? form.errors.image}
                    inputRef={image.inputRef}
                    changed={image.file !== null}
                    onSelect={selectImage}
                    onReset={image.reset}
                />
            </AdminCard>

            <AdminCard title="Дополнительные поля" delay={delay * 3}>
                <AdditionalDataEditor
                    items={form.values.additionalData}
                    error={form.errors.additionalData}
                    onChange={form.setItem}
                    onAdd={form.addItem}
                    onRemove={form.removeItem}
                />
            </AdminCard>

            <AdminConfirm
                open={confirm === "leave"}
                title="Выйти без сохранения?"
                description="Несохранённые изменения будут потеряны."
                confirmLabel="Выйти"
                onConfirm={confirmLeave}
                onCancel={cancelConfirm}
            />

            <AdminConfirm
                open={confirm === "delete"}
                title="Удалить проект?"
                description="Проект исчезнет с сайта. Действие нельзя отменить."
                pending={deleting}
                onConfirm={confirmDelete}
                onCancel={cancelConfirm}
            />
        </ProjectEditorLayout>
    );
};