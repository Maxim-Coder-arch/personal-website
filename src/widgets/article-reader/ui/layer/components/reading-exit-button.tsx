import { READER_LABELS } from "../../../model/data";
import type { ReadingExitButtonProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ReadingExitButton = ({ onClick }: ReadingExitButtonProps) => {
    return (
        <div className={styles["exit"]}>
            <button
                type="button"
                className={styles["exit__button"]}
                onClick={onClick}
            >
                {READER_LABELS.exitReading}
            </button>
        </div>
    );
};