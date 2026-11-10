import Link from "next/link";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import type { FooterLostProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterLost = ({ label, code, text, href }: FooterLostProps) => {
    return (
        <Link href={href} className={styles["footer__lost"]}>
            <span className={styles["footer__lost-orb"]} aria-hidden="true" />

            <span className={styles["footer__lost-label"]}>{label}</span>

            <span className={styles["footer__lost-code"]}>{code}</span>

            <span className={styles["footer__lost-text"]}>
                <span>{text}</span>
                <ArrowRightUp />
            </span>
        </Link>
    );
};