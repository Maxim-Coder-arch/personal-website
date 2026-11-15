import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:5062").replace(
    /\/+$/,
    "",
);

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${BACKEND_URL}/:path*`,
            },
        ];
    },
};

export default withNextIntl(nextConfig);