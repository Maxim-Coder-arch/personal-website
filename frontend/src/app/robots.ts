import type { MetadataRoute } from "next";

import { SITE_URL } from "@/src/shared/config/site";

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/lost"],
    },
    ...(SITE_URL && {
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }),
});

export default robots;