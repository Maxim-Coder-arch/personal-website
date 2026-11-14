import { redirect } from "next/navigation";

import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";

export default function Page() {
    redirect(ADMIN_ROUTES.articles);
}