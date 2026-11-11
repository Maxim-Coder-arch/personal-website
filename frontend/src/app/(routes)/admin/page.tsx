import type { Metadata } from "next";

import { AdminPage } from "@/src/(views)/admin-page";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin page",
    robots: { index: false, follow: true },
};

const AdminRoute = () => <AdminPage />;

export default AdminRoute;