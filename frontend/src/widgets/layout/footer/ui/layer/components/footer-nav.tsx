import Link from "next/link";

import type { FooterNavProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterNav = ({ label, links }: FooterNavProps) => {
    return (
        <div className={styles["footer__col"]}>
            <span className={styles["footer__label"]}>{label}</span>

            <ul className={styles["footer__list"]}>
                {links.map((link, index) => (
                    <li key={link.id}>
                        <Link href={link.href} className={styles["footer__link"]}>
                            <span>{link.label}</span>
                            <span className={styles["footer__index"]}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};