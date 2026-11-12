import { AdminPage } from "@/src/(views)/admin-page";
import { getAdmin } from "@/src/entities/api/admin-auth/get-admin";

const AdminRoute = async () => {
    const admin = await getAdmin();

    return <AdminPage email={admin?.email ?? ""} />;
};

export default AdminRoute;