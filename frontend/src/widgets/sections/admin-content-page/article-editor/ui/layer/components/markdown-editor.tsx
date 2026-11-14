"use client";

import { useMarkdownEditor } from "../../../lib/hooks/use-markdown-editor";
import type { MarkdownEditorProps } from "../../../model/types";

import { EditorStats } from "./editor-stats";
import { MarkdownPane } from "./markdown-pane";
import { MarkdownPreview } from "./markdown-preview";
import { MarkdownToolbar } from "./markdown-toolbar";

import styles from "../../styles/article-editor.module.scss";

export const MarkdownEditor = ({ value, error, mode, onChange }: MarkdownEditorProps) => {
    const { textareaRef, applyAction, handleKeyDown } = useMarkdownEditor(value, onChange);

    return (
        <div className={styles["editor"]}>
            <MarkdownToolbar onAction={applyAction} />

            <div className={styles["panes"]}>
                <div
                    className={[
                        styles["pane"],
                        mode === "preview" ? styles["pane--hidden"] : "",
                    ].join(" ")}
                >
                    <MarkdownPane
                        value={value}
                        error={error}
                        textareaRef={textareaRef}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div
                    className={[
                        styles["pane"],
                        mode === "write" ? styles["pane--hidden"] : "",
                    ].join(" ")}
                >
                    <MarkdownPreview value={value} />
                </div>
            </div>

            <EditorStats text={value} />
        </div>
    );
};