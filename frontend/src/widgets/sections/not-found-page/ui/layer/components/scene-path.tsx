"use client";

import { usePathname } from "next/navigation";

import { NOT_FOUND_TECH } from "../../../model/data";

import styles from "../../styles/not-found-scene.module.scss";

export const ScenePath = () => {
    const pathname = usePathname();

    return (
        <p className={styles["scene__path"]}>
            <span>{NOT_FOUND_TECH.method}</span> {pathname}{" "}
            <span>{NOT_FOUND_TECH.status}</span>
        </p>
    );
};