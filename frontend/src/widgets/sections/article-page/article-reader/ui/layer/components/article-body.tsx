import type { ArticleBodyProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ArticleBody = ({ paragraphs }: ArticleBodyProps) => {
    return (
        <div className={styles["content__body"]}>
            {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
};