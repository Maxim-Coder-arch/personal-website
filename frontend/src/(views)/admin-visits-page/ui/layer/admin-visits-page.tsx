import { SessionDetails } from "@/src/widgets/sections/admin-visits-page/session-details";
import { SessionsTable } from "@/src/widgets/sections/admin-visits-page/sessions-table";
import { VisitsFilters } from "@/src/widgets/sections/admin-visits-page/visits-filters";

import { AdminVisitsPageLayout } from "./admin-visits-page-layout";

export const AdminVisitsPage = () => {
    return (
        <AdminVisitsPageLayout>
            <VisitsFilters />
            <SessionsTable />
            <SessionDetails />
        </AdminVisitsPageLayout>
    );
};