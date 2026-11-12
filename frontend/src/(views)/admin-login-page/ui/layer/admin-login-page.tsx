import { AdminLoginForm } from "@/src/features/admin-auth";

import styles from "../styles/admin-login-page.module.scss";

export const AdminLoginPage = () => {
    return (
        <main className={styles["admin-login"]}>
            <div className={styles["admin-login__grid"]} aria-hidden="true" />
            <div className={styles["admin-login__orb"]} aria-hidden="true" />
            <div className={styles["admin-login__orb-muted"]} aria-hidden="true" />

            <AdminLoginForm />
        </main>
    );
};