import { MARKDOWN_ACTIONS } from "../../../model/data";
import type { MarkdownToolbarProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

export const MarkdownToolbar = ({ onAction }: MarkdownToolbarProps) => {
    return (
        <div className={styles["toolbar"]} role="toolbar" aria-label="Форматирование">
            {MARKDOWN_ACTIONS.map((action) => {
                const Icon = action.icon;
                const title = action.shortcut ? `${action.label} (${action.shortcut})` : action.label;

                return (
                    <button
                        key={action.id}
                        type="button"
                        className={styles["tool"]}
                        title={title}
                        aria-label={action.label}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => onAction(action.id)}
                    >
                        <Icon size={16} />
                    </button>
                );
            })}
        </div>
    );
};