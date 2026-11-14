import { Plus, Search } from "lucide-react";

import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminButton } from "@/src/shared/ui/admin-ui";

import type { ProjectsToolbarProps } from "../../../model/types";

import styles from "../../styles/projects-list.module.scss";

export const ProjectsToolbar = ({ search, onSearchChange }: ProjectsToolbarProps) => {
    return (
        <div className={styles["toolbar"]}>
            <label className={styles["search"]}>
                <Search size={16} className={styles["search__icon"]} />
                <input
                    type="search"
                    className={styles["search__input"]}
                    placeholder="Поиск по названию"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </label>

            <AdminButton variant="primary" href={ADMIN_ROUTES.projectNew} icon={<Plus size={16} />}>
                Новый проект
            </AdminButton>
        </div>
    );
};