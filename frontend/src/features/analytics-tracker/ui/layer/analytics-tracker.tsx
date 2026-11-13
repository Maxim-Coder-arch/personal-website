"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { isAdminPath } from "@/src/shared/lib/helpers/is-admin-path";

import { stopTracking, trackPage } from "../../lib/helpers/tracker";

const DISABLED = process.env.NEXT_PUBLIC_TRACKING === "off";

export const AnalyticsTracker = () => {
    const pathname = usePathname() ?? "/";

    useEffect(() => {
        if (DISABLED) {
            return;
        }

        if (isAdminPath(pathname)) {
            stopTracking();
            return;
        }

        void trackPage(pathname);
    }, [pathname]);

    return null;
};