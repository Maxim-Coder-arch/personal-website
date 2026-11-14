import type { ComponentPropsWithoutRef } from "react";

export interface MarkdownProps {
    source: string;
    className?: string;
}

export type MarkdownLinkProps = ComponentPropsWithoutRef<"a">;