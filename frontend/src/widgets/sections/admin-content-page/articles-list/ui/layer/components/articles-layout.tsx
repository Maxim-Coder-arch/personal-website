import { AdminCard } from "@/src/shared/ui/admin-ui";

import { ARTICLES_LIST_CONFIG } from "../../../model/config";
import type { ArticlesLayoutProps } from "../../../model/types";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesLayout = ({ total, toolbar, children }: ArticlesLayoutProps) => {
    return (
        <AdminCard
            title="Статьи"
            delay={ARTICLES_LIST_CONFIG.delay}
            action={total !== undefined && <span className={styles["total"]}>{total}</span>}
        >
            {toolbar}
            {children}
        </AdminCard>
    );
};