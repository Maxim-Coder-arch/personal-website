export interface IFooterSocial {
    id: string;
    label: string;
    href: string;
}

export interface FooterIdentityProps {
    eyebrow: string;
    name: string;
    role: string;
}

export interface FooterSocialsProps {
    label: string;
    links: IFooterSocial[];
}