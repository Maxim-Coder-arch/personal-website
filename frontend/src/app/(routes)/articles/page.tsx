import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ArticlesPage } from "@/src/(views)/articles-page";
import { buildPageMetadata } from "@/src/shared/lib/helpers/build-page-metadata";

export const generateMetadata = async (): Promise<Metadata> => {
    const [t, locale] = await Promise.all([getTranslations("meta"), getLocale()]);

    return buildPageMetadata({
        title: t("articles.title"),
        description: t("articles.description"),
        siteName: t("siteName"),
        locale,
        path: "/articles"
    });
};

const ArticlesPageRoute = () => <ArticlesPage />

export default ArticlesPageRoute;