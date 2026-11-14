import { ArticleEditor } from "@/src/widgets/sections/admin-content-page/article-editor";

import type { AdminArticleEditorPageProps } from "../../model/types";

import { AdminArticleEditorPageLayout } from "./admin-article-editor-page-layout";

export const AdminArticleEditorPage = ({ articleId }: AdminArticleEditorPageProps) => {
    return (
        <AdminArticleEditorPageLayout>
            <ArticleEditor articleId={articleId} />
        </AdminArticleEditorPageLayout>
    );
};