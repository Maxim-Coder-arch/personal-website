"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import { isAdminPath } from "@/src/shared/lib/helpers/is-admin-path";

interface SiteChromeProps {
    top: ReactNode;
    bottom: ReactNode;
    children: ReactNode;
}

export const SiteChrome = ({ top, bottom, children }: SiteChromeProps) => {
    const pathname = usePathname() ?? "/";
    const hidden = isAdminPath(pathname);

    return (
        <>
            {hidden ? null : top}
            {children}
            {hidden ? null : bottom}
        </>
    );
};