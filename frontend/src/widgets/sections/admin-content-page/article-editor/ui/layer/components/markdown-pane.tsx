import type { MarkdownPaneProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

export const MarkdownPane = ({
    value,
    error,
    textareaRef,
    onChange,
    onKeyDown,
}: MarkdownPaneProps) => {
    return (
        <>
            <textarea
                ref={textareaRef}
                className={[styles["textarea"], error ? styles["textarea--invalid"] : ""].join(" ")}
                value={value}
                placeholder="Пиши в Markdown…"
                spellCheck
                aria-invalid={Boolean(error)}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={onKeyDown}
            />

            {error && <span className={styles["field__error"]}>{error}</span>}
        </>
    );
};