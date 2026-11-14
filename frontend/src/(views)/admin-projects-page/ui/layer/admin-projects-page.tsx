import { ContentTabs } from "@/src/widgets/sections/admin-content-page/content-tabs";
import { ProjectsList } from "@/src/widgets/sections/admin-content-page/projects-list";

import { AdminProjectsPageLayout } from "./admin-projects-page-layout";

export const AdminProjectsPage = () => {
    return (
        <AdminProjectsPageLayout>
            <ContentTabs />
            <ProjectsList />
        </AdminProjectsPageLayout>
    );
};