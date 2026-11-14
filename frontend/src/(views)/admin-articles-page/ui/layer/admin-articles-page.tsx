import { ArticlesList } from "@/src/widgets/sections/admin-content-page/articles-list";
import { ContentTabs } from "@/src/widgets/sections/admin-content-page/content-tabs";

import { AdminArticlesPageLayout } from "./admin-articles-page-layout";

export const AdminArticlesPage = () => {
    return (
        <AdminArticlesPageLayout>
            <ContentTabs />
            <ArticlesList />
        </AdminArticlesPageLayout>
    );
};