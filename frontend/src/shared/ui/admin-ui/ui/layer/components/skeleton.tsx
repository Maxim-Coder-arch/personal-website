import type { SkeletonProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const Skeleton = ({ width = "100%", height = 16 }: SkeletonProps) => {
    return <div className={styles["skeleton"]} style={{ width, height }} />;
};