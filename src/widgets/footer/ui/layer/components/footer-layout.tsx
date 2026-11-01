import { ReactChildren } from "@/src/shared/types/global-types";

import { FOOTER_CONFIG } from "../../../model/data";

import styles from "../../styles/footer.module.scss";

export const FooterLayout = ({ children }: ReactChildren) => {
    const currentYear = new Date().getFullYear();

    return (
         <footer id="footer">
            <div className={styles["footer"]}>
                <div className={styles["footer__main"]}>
                    { children }
                </div>

                <div className={styles["footer__bottom"]}>
                    <span>
                        © {currentYear} {FOOTER_CONFIG.copyright.name}.{" "}
                        {FOOTER_CONFIG.copyright.rights}
                    </span>

                    <span className={styles["footer__made"]}>
                        {FOOTER_CONFIG.copyright.description}
                    </span>
                </div>
            </div>
        </footer>
    )
}