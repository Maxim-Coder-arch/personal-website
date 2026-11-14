import { IFooterLink, IFooterSocial } from "./types";

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

export const FOOTER_NAV: IFooterLink[] = [
    { id: "home", label: "Home", href: "/" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "articles", label: "Articles", href: "/articles" },
];

export const FOOTER_CONFIG = {
    hero: {
        eyebrow: "THANKS FOR VISITING",
        titleTop: "Let's make something",
        titleBottom: "worth",
        highlight: "remembering.",
        ctaLabel: "SAY HELLO",
        ctaHref: TELEGRAM_URL,
    },

    nav: {
        label: "NAVIGATION",
    },

    socials: {
        label: "FIND ME HERE",
    },

    clock: {
        label: "LOCAL TIME",
        place: "Moscow, Russia · UTC+3",
    },

    lost: {
        label: "EASTER EGG",
        code: "404",
        text: "The page that does not exist",
        href: "/lost",
    },

    wordmark: "MAXIM NOVIKOV",

    top: "BACK TO TOP",

    admin: {
        label: "ADMIN",
        href: "/admin",
    },

    copyright: {
        name: "Maxim Novikov",
        rights: "All rights reserved.",
        description: "Designed & developed with care.",
    },
} as const;