import { motion } from "framer-motion";

import { Mascot } from "@/src/features/mascot";
import { TELEGRAM_URL } from "@/src/shared/config/links";
import { TelegramIcon } from "@/src/shared/icons/social-networks/telegram";

import { menuAnimationConfig } from "../../../model/animations";

import styles from "../../styles/menu.module.scss";

export const MenuExtras = () => {
    return (
        <>
            <li className={styles["hero-nav__divider"]} aria-hidden="true" />

            <motion.li
                className={styles["hero-nav__mascot"]}
                variants={menuAnimationConfig.items}
            >
                <Mascot />
            </motion.li>

            <motion.li
                className={styles["hero-nav__social"]}
                variants={menuAnimationConfig.items}
            >
                <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                >
                    <TelegramIcon />
                </a>
            </motion.li>
        </>
    );
};