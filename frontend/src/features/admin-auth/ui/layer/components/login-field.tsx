import type { LoginFieldProps } from "../../../model/types";

import styles from "../../styles/admin-auth.module.scss";

export const LoginField = ({
    id,
    label,
    type,
    value,
    autoComplete,
    autoFocus,
    trailing,
    onChange,
}: LoginFieldProps) => {
    return (
        <div className={styles["field"]}>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                placeholder=" "
                required
                className={styles["field__input"]}
                onChange={(event) => onChange(event.target.value)}
            />

            <label htmlFor={id} className={styles["field__label"]}>
                {label}
            </label>

            {trailing}
        </div>
    );
};