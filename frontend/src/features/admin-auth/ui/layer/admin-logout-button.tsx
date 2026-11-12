"use client";

import { useRouter } from "next/navigation";

import { useAdminLogout } from "@/src/entities/api/admin-auth/admin-auth-queries";

import { LOGIN_COPY } from "../../model/data";

import styles from "../styles/admin-auth.module.scss";

export const AdminLogoutButton = () => {
    const router = useRouter();
    const logout = useAdminLogout();

    const handleClick = () => {
        logout.mutate(undefined, {
            onSettled: () => {
                router.replace("/admin/login");
                router.refresh();
            },
        });
    };

    return (
        <button
            type="button"
            className={styles["logout"]}
            disabled={logout.isPending}
            onClick={handleClick}
        >
            {LOGIN_COPY.logout}
        </button>
    );
};