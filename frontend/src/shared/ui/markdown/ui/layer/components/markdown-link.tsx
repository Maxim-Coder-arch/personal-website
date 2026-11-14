import Link from "next/link";

import { getLinkKind } from "../../../lib/helpers/get-link-kind";
import type { MarkdownLinkProps } from "../../../model/types";

export const MarkdownLink = ({ href, children }: MarkdownLinkProps) => {
    if (!href) return <span>{children}</span>;

    const kind = getLinkKind(href);

    if (kind === "external") {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    if (kind === "internal") {
        return <Link href={href}>{children}</Link>;
    }

    return <a href={href}>{children}</a>;
};