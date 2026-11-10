import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/src/(views)/article-page";
import { thoughtApi } from "@/src/entities/api/thoughts/thougths-api";

interface ArticleRouteProps {
    params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
    params,
}: ArticleRouteProps): Promise<Metadata> => {
    const { id } = await params;
    const article = await thoughtApi.getById(id);

    if (!article) return {};

    return {
        title: `${article.title} — Maxim Novikov`,
        description: article.subtitle,
    };
};

const ArticleRoute = async ({ params }: ArticleRouteProps) => {
    const { id } = await params;
    const article = await thoughtApi.getById(id);

    if (!article) notFound();

    return <ArticlePage article={article} />;
};

export default ArticleRoute;