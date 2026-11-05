import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/src/(views)/article-page";
import { getArticleById, getArticles } from "@/src/entities/article";

interface ArticleRouteProps {
    params: Promise<{ id: string }>;
}

export const generateStaticParams = () =>
    getArticles().map(({ id }) => ({ id }));

export const generateMetadata = async ({
    params,
}: ArticleRouteProps): Promise<Metadata> => {
    const { id } = await params;
    const article = getArticleById(id);

    if (!article) return {};

    return {
        title: `${article.title} — Maxim Novikov`,
        description: article.subtitle,
    };
};

const ArticleRoute = async ({ params }: ArticleRouteProps) => {
    const { id } = await params;
    const article = getArticleById(id);

    if (!article) notFound();

    return <ArticlePage article={article} />;
};

export default ArticleRoute;