import { AdminAudience } from "@/src/widgets/sections/admin-audience-page/audience";

import { AdminAudiencePageLayout } from "./admin-audience-page-layout";

export const AdminAudiencePage = () => {
    return (
        <AdminAudiencePageLayout>
            <AdminAudience />
        </AdminAudiencePageLayout>
    );
};