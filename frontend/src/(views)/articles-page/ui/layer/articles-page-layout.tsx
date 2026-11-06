import type { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/articles-page.module.scss";

export const ArticlesPageLayout = ({ children }: ReactChildren) => {
    return (
        <div className={`${styles["articles-page"]} min-h-screen`}>
            {children}
        </div>
    );
};