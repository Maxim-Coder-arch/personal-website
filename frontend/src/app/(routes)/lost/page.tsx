import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundPage } from "@/src/(views)/not-found-page";
import { buildPageMetadata } from "@/src/shared/lib/helpers/build-page-metadata";

export const generateMetadata = async (): Promise<Metadata> => {
    const [t, locale] = await Promise.all([getTranslations("meta"), getLocale()]);

    return buildPageMetadata({
        title: t("lost.title"),
        description: t("lost.description"),
        siteName: t("siteName"),
        locale,
        noIndex: true,
    });
};

const LostRoute = () => <NotFoundPage />;

export default LostRoute;