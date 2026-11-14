export type LinkKind = "external" | "internal" | "plain";

export const getLinkKind = (href: string): LinkKind => {
    if (/^(https?:)?\/\//i.test(href)) return "external";

    if (href.startsWith("/")) return "internal";

    return "plain";
};