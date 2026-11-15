import { IFooterSocial } from "./types";

const TELEGRAM_URL = "https://t.me/Stxxxvans";

export const FOOTER_SOCIALS: IFooterSocial[] = [
    {
        id: "telegram",
        label: "Telegram",
        href: TELEGRAM_URL,
    },
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/Maxim-Coder-arch",
    },
];

export const FOOTER_NAV = [
    { id: "home", href: "/" },
    { id: "projects", href: "/projects" },
    { id: "articles", href: "/articles" },
] as const;

export const FOOTER_CONFIG = {
    hero: {
        ctaHref: TELEGRAM_URL,
    },

    lost: {
        code: "404",
        href: "/lost",
    },

    admin: {
        href: "/admin",
    },
} as const;
