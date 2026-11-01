import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import styles from "../styles/footer.module.scss";

const SOCIAL_LINKS = [
    {
        label: "Telegram",
        href: "https://t.me/Stxxxvans",
    },
    {
        label: "GitHub",
        href: "https://github.com/Maxim-Coder-arch",
    },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer">
            <div className={styles["footer"]}>
                <div className={styles["footer__main"]}>
                    <div className={styles["footer__identity"]}>
                        <span className={styles["footer__eyebrow"]}>
                            THANKS FOR VISITING
                        </span>

                        <h2>maxim novikov<span>.</span></h2>

                        <p>Frontend Developer</p>
                    </div>

                    <div className={styles["footer__socials"]}>
                        <span className={styles["footer__label"]}>
                            FIND ME HERE
                        </span>

                        <ul>
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.label}>
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
                </div>

                <div className={styles["footer__bottom"]}>
                    <span>
                        © {currentYear} Maxim Novikov. All rights reserved.
                    </span>

                    <span className={styles["footer__made"]}>
                        Designed & developed with care.
                    </span>
                </div>
            </div>
        </footer>
    );
};