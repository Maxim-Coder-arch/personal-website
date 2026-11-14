import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MARKDOWN_COMPONENTS } from "../../model/data";
import type { MarkdownProps } from "../../model/types";

import styles from "../styles/markdown.module.scss";

const REMARK_PLUGINS = [remarkGfm];

export const Markdown = ({ source, className }: MarkdownProps) => {
    return (
        <div className={[styles["markdown"], className ?? ""].join(" ")}>
            <ReactMarkdown remarkPlugins={REMARK_PLUGINS} components={MARKDOWN_COMPONENTS}>
                {source}
            </ReactMarkdown>
        </div>
    );
};