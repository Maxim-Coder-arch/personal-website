import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5062";

const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5062",
                pathname: "/api/projects/**",
            },
        ],
    },

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