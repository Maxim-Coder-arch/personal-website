import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import { FooterSocialsProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterSocials = ({
    label,
    links,
}: FooterSocialsProps) => {
    return (
        <div className={styles["footer__socials"]}>
            <span className={styles["footer__label"]}>
                {label}
            </span>

            <ul>
                {links.map((social) => (
                    <li key={social.id}>
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{social.label}</span>
                            <ArrowRightUp />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};