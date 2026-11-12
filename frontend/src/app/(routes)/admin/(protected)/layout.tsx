import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getAdmin } from "@/src/entities/api/admin-auth/get-admin";

const AdminProtectedLayout = async ({ children }: { children: ReactNode }) => {
    const admin = await getAdmin();

    if (!admin) {
        redirect("/admin/login");
    }

    return <>{children}</>;
};

export default AdminProtectedLayout;