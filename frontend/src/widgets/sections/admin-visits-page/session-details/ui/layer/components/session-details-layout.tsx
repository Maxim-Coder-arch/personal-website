import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/session-details.module.scss";

export const SessionDetailsLayout = ({ children }: ReactChildren) => {
    return <div className={styles["stack"]}>{children}</div>;
};