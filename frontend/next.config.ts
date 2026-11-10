import type { NextConfig } from "next";

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
};

export default nextConfig;