"use client";

import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminCard, AdminConfirm } from "@/src/shared/ui/admin-ui";

import { useArticleEditor } from "../../../lib/hooks/use-article-editor";
import { ARTICLE_EDITOR_CONFIG } from "../../../model/config";
import type { ArticleEditorFormProps } from "../../../model/types";

import { ArticleEditorLayout } from "./article-editor-layout";
import { ArticleFields } from "./article-fields";
import { EditorHeader } from "./editor-header";
import { EditorModes } from "./editor-modes";
import { MarkdownEditor } from "./markdown-editor";

export const ArticleEditorForm = ({ article }: ArticleEditorFormProps) => {
    const {
        form,
        mode,
        setMode,
        isNew,
        saving,
        deleting,
        confirm,
        save,
        back,
        requestDelete,
        cancelConfirm,
        confirmLeave,
        confirmDelete,
    } = useArticleEditor(article);

    const { delay } = ARTICLE_EDITOR_CONFIG;

    return (
        <ArticleEditorLayout>
            <EditorHeader
                isNew={isNew}
                dirty={form.dirty}
                saving={saving}
                siteHref={article ? ADMIN_ROUTES.siteArticle(article.id) : undefined}
                onBack={back}
                onSave={save}
                onDelete={isNew ? undefined : requestDelete}
            />

            <AdminCard title="Основное" delay={delay}>
                <ArticleFields values={form.values} errors={form.errors} onChange={form.setField} />
            </AdminCard>

            <AdminCard
                title="Текст"
                delay={delay * 2}
                action={<EditorModes mode={mode} onChange={setMode} />}
            >
                <MarkdownEditor
                    value={form.values.text}
                    error={form.errors.text}
                    mode={mode}
                    onChange={(value) => form.setField("text", value)}
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
                title="Удалить статью?"
                description="Статья исчезнет с сайта. Действие нельзя отменить."
                pending={deleting}
                onConfirm={confirmDelete}
                onCancel={cancelConfirm}
            />
        </ArticleEditorLayout>
    );
};