import type { Metadata } from "next";

import { SITE_URL } from "@/src/shared/config/site";

interface BuildPageMetadataArgs {
    title: string;
    description: string;
    siteName: string;
    locale: string;
    path?: string;
    type?: "website" | "article";
    publishedTime?: string;
    authors?: string[];
    noIndex?: boolean;
}

const OG_LOCALES: Record<string, string> = {
    ru: "ru_RU",
    en: "en_US",
};

export const buildPageMetadata = ({
    title,
    description,
    siteName,
    locale,
    path,
    type = "website",
    publishedTime,
    authors,
    noIndex = false,
}: BuildPageMetadataArgs): Metadata => ({
    title,
    description,
    ...(SITE_URL && path !== undefined && { alternates: { canonical: path } }),
    openGraph: {
        title,
        description,
        siteName,
        locale: OG_LOCALES[locale] ?? OG_LOCALES.ru,
        type,
        ...(type === "article" && { publishedTime, authors }),
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
});