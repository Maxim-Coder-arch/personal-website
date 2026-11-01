import { FooterIdentityProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterIdentity = ({
    eyebrow,
    name,
    role,
}: FooterIdentityProps) => {
    return (
        <div className={styles["footer__identity"]}>
            <span className={styles["footer__eyebrow"]}>
                {eyebrow}
            </span>

            <h2>
                {name}<span>.</span>
            </h2>

            <p>{role}</p>
        </div>
    );
};