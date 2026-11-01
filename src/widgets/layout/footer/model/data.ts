import { IFooterSocial } from "./types";

export const FOOTER_SOCIALS: IFooterSocial[] = [
    {
        id: "telegram",
        label: "Telegram",
        href: "https://t.me/Stxxxvans",
    },
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/Maxim-Coder-arch",
    },
];

export const FOOTER_CONFIG = {
    identity: {
        eyebrow: "THANKS FOR VISITING",
        name: "maxim novikov",
        role: "Frontend Developer",
    },

    socials: {
        label: "FIND ME HERE",
    },

    copyright: {
        name: "Maxim Novikov",
        rights: "All rights reserved.",
        description: "Designed & developed with care.",
    },
} as const;