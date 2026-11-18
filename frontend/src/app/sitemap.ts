import type { MetadataRoute } from "next";

import { thoughtApi } from "@/src/entities/api/thoughts/thougths-api";
import { SITE_URL } from "@/src/shared/config/site";

export const dynamic = "force-dynamic";

const STATIC_PATHS = ["", "/projects", "/articles"];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    if (!SITE_URL) return [];

    const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
        url: `${SITE_URL}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
    }));

    try {
        const articles = await thoughtApi.getAll();

        const articleEntries: MetadataRoute.Sitemap = articles.map(
            ({ id, createdAt }) => ({
                url: `${SITE_URL}/articles/${id}`,
                lastModified: createdAt,
                changeFrequency: "yearly",
                priority: 0.6,
            }),
        );

        return [...staticEntries, ...articleEntries];
    } catch {
        return staticEntries;
    }
};

export default sitemap;