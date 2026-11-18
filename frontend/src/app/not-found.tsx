import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundPage } from "@/src/(views)/not-found-page";

import { buildPageMetadata } from "../shared/lib/helpers/build-page-metadata";

export const generateMetadata = async (): Promise<Metadata> => {
    const [t, locale] = await Promise.all([getTranslations("meta"), getLocale()]);

    return buildPageMetadata({
        title: t("notFound.title"),
        description: t("notFound.description"),
        siteName: t("siteName"),
        locale,
        noIndex: true,
    });
};

const NotFound = () => <NotFoundPage />;

export default NotFound;