import type { NextConfig } from "next";

const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:5062").replace(
    /\/+$/,
    "",
);

const nextConfig: NextConfig = {
    poweredByHeader: false,
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${BACKEND_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;