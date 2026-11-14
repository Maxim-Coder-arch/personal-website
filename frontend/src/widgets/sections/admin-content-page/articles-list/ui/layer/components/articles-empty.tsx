import { Plus } from "lucide-react";

import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminButton } from "@/src/shared/ui/admin-ui";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesEmpty = () => {
    return (
        <div className={styles["empty"]}>
            <p>Статей пока нет</p>

            <AdminButton variant="primary" href={ADMIN_ROUTES.articleNew} icon={<Plus size={16} />}>
                Написать первую
            </AdminButton>
        </div>
    );
};