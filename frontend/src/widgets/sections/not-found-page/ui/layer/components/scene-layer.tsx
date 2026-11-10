import { motion } from "framer-motion";

import type { SceneLayerProps } from "../../../model/types";

import { SceneDigits } from "./scene-digits";
import { SceneMarquee } from "./scene-marquee";
import { ScenePath } from "./scene-path";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneLayer = ({ lit, mask }: SceneLayerProps) => {
    return (
        <motion.div
            className={`${styles["scene__layer"]} ${
                lit ? styles["scene__layer--lit"] : styles["scene__layer--dim"]
            }`}
            style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
            aria-hidden="true"
        >
            <SceneDigits />
            <ScenePath />
            <SceneMarquee />
        </motion.div>
    );
};