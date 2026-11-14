import { AdminCard } from "@/src/shared/ui/admin-ui";

import { PROJECTS_LIST_CONFIG } from "../../../model/config";
import type { ProjectsLayoutProps } from "../../../model/types";

import styles from "../../styles/projects-list.module.scss";

export const ProjectsLayout = ({ total, toolbar, children }: ProjectsLayoutProps) => {
    return (
        <AdminCard
            title="Проекты"
            delay={PROJECTS_LIST_CONFIG.delay}
            action={total !== undefined && <span className={styles["total"]}>{total}</span>}
        >
            {toolbar}
            {children}
        </AdminCard>
    );
};