import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/admin-audience.module.scss";

export const AudienceLayout = ({ children }: ReactChildren) => {
    return <div className={styles["root"]}>{children}</div>;
};