import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/src/entities/api/admin-auth/get-admin";
import { AdminShell } from "@/src/widgets/admin-shell";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminShell email={admin.email}>{children}</AdminShell>;
}