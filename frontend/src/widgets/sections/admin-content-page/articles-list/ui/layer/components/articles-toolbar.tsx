import { Plus, Search } from "lucide-react";

import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminButton } from "@/src/shared/ui/admin-ui";

import type { ArticlesToolbarProps } from "../../../model/types";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesToolbar = ({ search, onSearchChange }: ArticlesToolbarProps) => {
    return (
        <div className={styles["toolbar"]}>
            <label className={styles["search"]}>
                <Search size={16} className={styles["search__icon"]} />
                <input
                    type="search"
                    className={styles["search__input"]}
                    placeholder="Поиск по заголовку"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </label>

            <AdminButton variant="primary" href={ADMIN_ROUTES.articleNew} icon={<Plus size={16} />}>
                Новая статья
            </AdminButton>
        </div>
    );
};