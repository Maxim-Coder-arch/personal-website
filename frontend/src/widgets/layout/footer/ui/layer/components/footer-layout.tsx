import { useTranslations } from "next-intl";

import { ReactChildren } from "@/src/shared/types/global-types";

import { FOOTER_CONFIG } from "../../../model/data";

import { FooterTopButton } from "./footer-top-button";
import { FooterAdminLink } from "./footer-admin-link";

import styles from "../../styles/footer.module.scss";

export const FooterLayout = ({ children }: ReactChildren) => {
    const t = useTranslations("footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className={styles["footer"]}>
            {children}

            <div className={styles["footer__bottom"]}>
                <span>
                    © {currentYear} {t("copyright.name")}.{" "}
                    {t("copyright.rights")}
                </span>

                <span>{t("copyright.description")}</span>

                <div className={styles["footer__bottom-actions"]}>
                    <FooterAdminLink
                        label={t("admin")}
                        href={FOOTER_CONFIG.admin.href}
                    />

                    <FooterTopButton label={t("top")} />
                </div>
                
            </div>
        </footer>
    );
};