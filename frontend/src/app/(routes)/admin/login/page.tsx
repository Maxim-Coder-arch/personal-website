import { redirect } from "next/navigation";

import { AdminLoginPage } from "@/src/(views)/admin-login-page";
import { getAdmin } from "@/src/entities/api/admin-auth/get-admin";

const AdminLoginRoute = async () => {
    const admin = await getAdmin();

    if (admin) {
        redirect("/admin");
    }

    return <AdminLoginPage />;
};

export default AdminLoginRoute;