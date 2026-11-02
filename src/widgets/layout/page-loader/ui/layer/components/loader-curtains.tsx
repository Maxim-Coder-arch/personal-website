import { motion } from "framer-motion";

import { CURTAINS, CURTAIN_TRANSITION } from "../../../model/config";
import type { LoaderCurtainsProps } from "../../../model/types";

import styles from "../../styles/page-loader.module.scss";

export const LoaderCurtains = ({ open }: LoaderCurtainsProps) => {
    return (
        <>
            {CURTAINS.map(({ side, offset }) => (
                <motion.div
                    key={side}
                    className={`${styles["page-loader__curtain"]} ${
                        styles[`page-loader__curtain--${side}`]
                    }`}
                    style={{ visibility: open ? "visible" : "hidden" }}
                    initial={false}
                    animate={{ y: open ? offset : "0%" }}
                    transition={CURTAIN_TRANSITION}
                />
            ))}
        </>
    );
};