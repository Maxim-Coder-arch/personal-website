import Link from "next/link";

import type { FooterAdminLinkProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterAdminLink = ({ label, href }: FooterAdminLinkProps) => {
    return (
        <Link href={href} className={styles["footer__admin"]} prefetch={false}>
            {label}
            <span aria-hidden="true">→</span>
        </Link>
    );
};