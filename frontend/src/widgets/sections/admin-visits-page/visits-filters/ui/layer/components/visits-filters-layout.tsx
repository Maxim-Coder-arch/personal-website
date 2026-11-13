import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/visits-filters.module.scss";

export const VisitsFiltersLayout = ({ children }: ReactChildren) => {
    return <div className={styles["layout"]}>{children}</div>;
};