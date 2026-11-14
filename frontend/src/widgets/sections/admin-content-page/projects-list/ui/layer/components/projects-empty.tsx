import { Plus } from "lucide-react";

import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminButton } from "@/src/shared/ui/admin-ui";

import styles from "../../styles/projects-list.module.scss";

export const ProjectsEmpty = () => {
    return (
        <div className={styles["empty"]}>
            <p>Проектов пока нет</p>

            <AdminButton variant="primary" href={ADMIN_ROUTES.projectNew} icon={<Plus size={16} />}>
                Добавить первый
            </AdminButton>
        </div>
    );
};