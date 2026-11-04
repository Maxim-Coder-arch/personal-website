import Image from "next/image";

import { motion } from "framer-motion";

import {
    MEDIA_IMAGE_VARIANTS,
    MEDIA_VARIANTS,
} from "../../../model/animations";
import type { SlabMediaProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabMedia = ({ title, imagePath }: SlabMediaProps) => {
    return (
        <motion.div
            className={styles["slab__media"]}
            variants={MEDIA_VARIANTS}
        >
            <motion.div
                className={styles["slab__media-inner"]}
                variants={MEDIA_IMAGE_VARIANTS}
            >
                <Image
                    src={imagePath}
                    alt={`Скриншот проекта ${title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className={styles["slab__image"]}
                />
            </motion.div>
        </motion.div>
    );
};