"use client";

import { INTRO_STORAGE_KEY } from "@/src/shared/lib/intro/intro-store";

import Script from "next/script";

export function IntroProvider() {
    const script = `
        try {
            if (sessionStorage.getItem("${INTRO_STORAGE_KEY}") === "1") {
                document.documentElement.dataset.intro = "seen";
            }
        } catch {}
    `;

    return (
        <Script
            id="intro-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: script }}
        />
    );
}