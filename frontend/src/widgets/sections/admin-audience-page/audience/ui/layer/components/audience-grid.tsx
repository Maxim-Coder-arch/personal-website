import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/admin-audience.module.scss";

export const AudienceGrid = ({ children }: ReactChildren) => {
    return <div className={styles["grid"]}>{children}</div>;
};