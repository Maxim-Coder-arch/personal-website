import { ReactChildren } from "@/src/shared/types/global-types";

import { FOOTER_CONFIG } from "../../../model/data";

import { FooterTopButton } from "./footer-top-button";
import { FooterAdminLink } from "./footer-admin-link";

import styles from "../../styles/footer.module.scss";

export const FooterLayout = ({ children }: ReactChildren) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className={styles["footer"]}>
            {children}

            <div className={styles["footer__bottom"]}>
                <span>
                    © {currentYear} {FOOTER_CONFIG.copyright.name}.{" "}
                    {FOOTER_CONFIG.copyright.rights}
                </span>

                <span>{FOOTER_CONFIG.copyright.description}</span>

                <div className={styles["footer__bottom-actions"]}>
                    <FooterAdminLink
                        label={FOOTER_CONFIG.admin.label}
                        href={FOOTER_CONFIG.admin.href}
                    />

                    <FooterTopButton label={FOOTER_CONFIG.top} />
                </div>
                
            </div>
        </footer>
    );
};