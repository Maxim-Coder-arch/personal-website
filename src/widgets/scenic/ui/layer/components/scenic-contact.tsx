"use client";

import { motion } from "framer-motion";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import { ScenicContactProps } from "../../../model/types";

import styles from "../../styles/scenic.module.scss";

export const ScenicContact = ({
    shouldReduceMotion,
    animation,
}: ScenicContactProps) => {
    return (
        <motion.a
            href="https://t.me/Stxxxvans"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["scenic__contact"]}
            {...animation}
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.04,
                        y: -3,
                    }
            }
        >
            <span>@Stxxxvans</span>
            <ArrowRightUp />
        </motion.a>
    );
};