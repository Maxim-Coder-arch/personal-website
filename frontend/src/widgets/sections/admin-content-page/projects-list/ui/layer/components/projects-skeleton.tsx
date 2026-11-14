import { Skeleton } from "@/src/shared/ui/admin-ui";

import { PROJECTS_LIST_CONFIG } from "../../../model/config";

import styles from "../../styles/projects-list.module.scss";

export const ProjectsSkeleton = () => {
    return (
        <div className={styles["skeleton"]}>
            {Array.from({ length: PROJECTS_LIST_CONFIG.skeletonRows }, (_, index) => (
                <Skeleton key={index} height={PROJECTS_LIST_CONFIG.skeletonRowHeight} />
            ))}
        </div>
    );
};