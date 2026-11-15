import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ArticlesPage } from "@/src/(views)/articles-page";

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations("meta.articles");

    return {
        title: t("title"),
        description: t("description"),
    };
};

const ArticlesPageRoute = () => <ArticlesPage />

export default ArticlesPageRoute;