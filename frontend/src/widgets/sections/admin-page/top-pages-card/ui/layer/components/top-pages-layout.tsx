import { ReactChildren } from "@/src/shared/types/global-types";
import { AdminCard } from "@/src/shared/ui/admin-ui";

import { TOP_PAGES_CONFIG } from "../../../model/config";

export const TopPagesLayout = ({ children }: ReactChildren) => {
    return (
        <AdminCard title="Популярные страницы" delay={TOP_PAGES_CONFIG.delay}>
            {children}
        </AdminCard>
    );
};