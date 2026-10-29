import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/main-page.module.scss";

export const MainPageLayout = ({ children }: ReactChildren) => {
    return (
        <div className={`${styles["main-page-layer"]} min-h-screen`}>
            { children }
        </div>
    )
}