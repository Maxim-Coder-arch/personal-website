import { getReadingStats } from "@/src/entities/article";

import type { EditorStatsProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

export const EditorStats = ({ text }: EditorStatsProps) => {
    const { words, minutes } = getReadingStats(text);

    return (
        <div className={styles["stats"]}>
            <span>{words} слов</span>
            <span>{text.length} символов</span>
            <span>{minutes} мин чтения</span>
        </div>
    );
};