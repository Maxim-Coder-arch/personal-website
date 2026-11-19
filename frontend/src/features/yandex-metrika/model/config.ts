import { YANDEX_METRIKA_ID } from "@/src/shared/config/site";

export const YANDEX_METRIKA_CONFIG = {
    counterId: YANDEX_METRIKA_ID,
    enabled: process.env.NODE_ENV === "production" && YANDEX_METRIKA_ID > 0,
    scriptSrc: "https://mc.yandex.ru/metrika/tag.js",
    options: {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
    },
} as const;