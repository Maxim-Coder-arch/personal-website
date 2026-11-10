"use client";

import { motion } from "framer-motion";

import { useSpotlight } from "../../lib/hooks/use-spotlight";
import { SCENE_VARIANTS } from "../../model/animations";

import { SceneContent } from "./components/scene-content";
import { SceneLayer } from "./components/scene-layer";
import { SceneLens } from "./components/scene-lens";

import styles from "../styles/not-found-scene.module.scss";

export const NotFoundScene = () => {
    const { ref, mask, lensX, lensY, onPointerMove, shouldReduceMotion } =
        useSpotlight();

    return (
        <motion.section
            ref={ref}
            className={styles["scene"]}
            variants={SCENE_VARIANTS}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            onPointerMove={onPointerMove}
        >
            <SceneLayer lit={false} />
            <SceneLayer lit mask={mask} />
            <SceneLens x={lensX} y={lensY} />
            <SceneContent />
        </motion.section>
    );
};