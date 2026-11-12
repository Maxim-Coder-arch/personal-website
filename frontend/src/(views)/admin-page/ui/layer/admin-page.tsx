import { AdminLogoutButton } from "@/src/features/admin-auth";

import type { AdminPageProps } from "../../model/types";

export const AdminPage = ({ email }: AdminPageProps) => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-[#dad8d8]">
            <p>Вы вошли как {email}</p>
            <AdminLogoutButton />
        </main>
    );
};