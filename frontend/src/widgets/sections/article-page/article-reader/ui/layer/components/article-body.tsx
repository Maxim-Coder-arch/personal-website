import { Markdown } from "@/src/shared/ui/markdown";

import type { ArticleBodyProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ArticleBody = ({ text }: ArticleBodyProps) => {
    return (
        <div className={styles["content__body"]}>
            <Markdown source={text} />
        </div>
    );
};