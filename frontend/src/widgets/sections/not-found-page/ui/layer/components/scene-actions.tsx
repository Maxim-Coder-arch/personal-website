"use client";

import { useState } from "react";
import type { MouseEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { CURTAIN_VARIANTS, FADE_VARIANTS } from "../../../model/animations";
import { LEAVE_DELAY_MS } from "../../../model/config";
import { NOT_FOUND_COPY } from "../../../model/data";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneActions = () => {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.button !== 0
        ) {
            return;
        }

        event.preventDefault();

        if (leaving) return;

        setLeaving(true);

        window.setTimeout(() => router.push("/"), LEAVE_DELAY_MS);
    };

    return (
        <>
            <motion.div
                className={styles["scene__actions"]}
                variants={FADE_VARIANTS}
            >
                <Link
                    href="/"
                    className={styles["scene__link"]}
                    onClick={handleClick}
                >
                    <span>{NOT_FOUND_COPY.action}</span>
                    <span
                        className={styles["scene__link-arrow"]}
                        aria-hidden="true"
                    >
                        →
                    </span>
                </Link>
            </motion.div>

            {leaving && (
                <motion.div
                    className={styles["scene__curtain"]}
                    variants={CURTAIN_VARIANTS}
                    initial="hidden"
                    animate="visible"
                />
            )}
        </>
    );
};