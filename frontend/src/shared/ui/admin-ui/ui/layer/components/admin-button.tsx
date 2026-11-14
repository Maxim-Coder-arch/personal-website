import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import type { AdminButtonProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const AdminButton = ({
    variant = "ghost",
    size = "md",
    href,
    external,
    icon,
    loading,
    disabled,
    type = "button",
    onClick,
    children,
}: AdminButtonProps) => {
    const className = [
        styles["button"],
        styles[`button--${variant}`],
        size === "sm" ? styles["button--sm"] : "",
    ].join(" ");

    const content = (
        <>
            {loading ? <LoaderCircle size={16} className={styles["button__spinner"]} /> : icon}
            <span>{children}</span>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={className}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={className}
            disabled={disabled || loading}
            aria-busy={loading}
            onClick={onClick}
        >
            {content}
        </button>
    );
};