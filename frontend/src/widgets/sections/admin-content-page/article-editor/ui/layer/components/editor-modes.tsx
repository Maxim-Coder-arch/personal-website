"use client";

import { Segmented } from "@/src/shared/ui/admin-ui";

import { ARTICLE_EDITOR_CONFIG } from "../../../model/config";
import { EDITOR_MODES } from "../../../model/data";
import type { EditorModesProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

export const EditorModes = ({ mode, onChange }: EditorModesProps) => {
    return (
        <div className={styles["modes"]}>
            <Segmented
                options={EDITOR_MODES}
                value={mode}
                onChange={onChange}
                layoutId={ARTICLE_EDITOR_CONFIG.pills.mode}
            />
        </div>
    );
};