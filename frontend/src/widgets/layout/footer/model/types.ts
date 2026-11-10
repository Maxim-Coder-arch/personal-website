import type { MotionValue } from "framer-motion";

export interface IFooterLink {
    id: string;
    label: string;
    href: string;
}

export interface IFooterSocial {
    id: string;
    label: string;
    href: string;
}

export interface FooterHeroProps {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    highlight: string;
    ctaLabel: string;
    ctaHref: string;
}

export interface FooterMagnetProps {
    href: string;
    label: string;
}

export interface FooterNavProps {
    label: string;
    links: IFooterLink[];
}

export interface FooterSocialsProps {
    label: string;
    links: IFooterSocial[];
}

export interface FooterClockProps {
    label: string;
    place: string;
}

export interface FooterLostProps {
    label: string;
    code: string;
    text: string;
    href: string;
}

export interface FooterWordmarkProps {
    text: string;
}

export interface FooterLetterProps {
    char: string;
    pointerX: MotionValue<number>;
}

export interface FooterTopButtonProps {
    label: string;
}