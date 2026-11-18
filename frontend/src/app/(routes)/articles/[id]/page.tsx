import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { ArticlePage } from "@/src/(views)/article-page";
import { thoughtApi } from "@/src/entities/api/thoughts/thougths-api";
import { buildPageMetadata } from "@/src/shared/lib/helpers/build-page-metadata";

interface ArticleRouteProps {
    params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
    params,
}: ArticleRouteProps): Promise<Metadata> => {
    const { id } = await params;
    const article = await thoughtApi.getById(id);

    if (!article) return {};

    const [t, locale] = await Promise.all([getTranslations("meta"), getLocale()]);

    return buildPageMetadata({
        title: t("article.title", { title: article.title }),
        description:
            article.subtitle?.trim() ||
            t("article.descriptionFallback", { title: article.title }),
        siteName: t("siteName"),
        locale,
        type: "article",
        publishedTime: article.createdAt,
        authors: [t("author")],
    });
};

const ArticleRoute = async ({ params }: ArticleRouteProps) => {
    const { id } = await params;
    const article = await thoughtApi.getById(id);

    if (!article) notFound();

    return <ArticlePage article={article} />;
};

export default ArticleRoute;