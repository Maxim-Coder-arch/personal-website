import { AdminArticleEditorPage } from "@/src/(views)/admin-article-editor-page";

interface ArticleEditRouteProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: ArticleEditRouteProps) {
    const { id } = await params;

    return <AdminArticleEditorPage articleId={id} />;
}