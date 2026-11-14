"use client";

import { useAdminArticle } from "@/src/entities/api/admin-articles/admin-articles-queries";
import { Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { ARTICLE_EDITOR_CONFIG } from "../../../model/config";

import { ArticleEditorForm } from "./article-editor-form";

export const ArticleEditorLoader = ({ articleId }: { articleId: string }) => {
    const query = useAdminArticle(articleId);

    return (
        <QueryBoundary
            query={query}
            loadingFallback={<Skeleton height={ARTICLE_EDITOR_CONFIG.skeletonHeight} />}
        >
            {(article) => <ArticleEditorForm key={article.id} article={article} />}
        </QueryBoundary>
    );
};