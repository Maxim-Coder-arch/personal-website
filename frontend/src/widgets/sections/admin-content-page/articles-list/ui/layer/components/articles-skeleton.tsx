import { Skeleton } from "@/src/shared/ui/admin-ui";

import { ARTICLES_LIST_CONFIG } from "../../../model/config";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesSkeleton = () => {
    return (
        <div className={styles["skeleton"]}>
            {Array.from({ length: ARTICLES_LIST_CONFIG.skeletonRows }, (_, index) => (
                <Skeleton key={index} height={ARTICLES_LIST_CONFIG.skeletonRowHeight} />
            ))}
        </div>
    );
};