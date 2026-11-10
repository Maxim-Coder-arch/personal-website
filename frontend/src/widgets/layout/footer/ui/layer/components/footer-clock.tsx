"use client";

import { useSyncExternalStore } from "react";

import type { FooterClockProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Moscow",
});

const subscribe = (callback: () => void) => {
    const id = window.setInterval(callback, 1000);

    return () => window.clearInterval(id);
};

const getSnapshot = () => formatter.format(new Date());

const getServerSnapshot = () => "--:--";

export const FooterClock = ({ label, place }: FooterClockProps) => {
    const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [hours, minutes] = time.split(":");

    return (
        <div className={styles["footer__col"]}>
            <span className={styles["footer__label"]}>{label}</span>

            <div className={styles["footer__time"]} aria-label={time}>
                <span>{hours}</span>
                <span className={styles["footer__colon"]}>:</span>
                <span>{minutes}</span>
            </div>

            <span className={styles["footer__place"]}>{place}</span>
        </div>
    );
};