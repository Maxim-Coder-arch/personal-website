import type { Metadata } from "next";

interface BuildPageMetadataArgs {
    title: string;
    description: string;
    siteName: string;
    locale: string;
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
    type = "website",
    publishedTime,
    authors,
    noIndex = false,
}: BuildPageMetadataArgs): Metadata => ({
    title,
    description,
    openGraph: {
        title,
        description,
        siteName,
        locale: OG_LOCALES[locale] ?? OG_LOCALES.ru,
        type,
        ...(type === "article" && { publishedTime, authors }),
    },
    twitter: {
        card: "summary",
        title,
        description,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
});