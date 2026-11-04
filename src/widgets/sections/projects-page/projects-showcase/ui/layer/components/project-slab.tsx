"use client";

import { motion } from "framer-motion";

import {
    SLAB_CARD_VARIANTS,
    SLAB_VIEWPORT,
} from "../../../model/animations";
import type { ProjectSlabProps } from "../../../model/types";



import { SlabDescription } from "./slab-description";
import { SlabIndex } from "./slab-index";
import { SlabMedia } from "./slab-media";
import { SlabMeta } from "./slab-meta";
import { SlabShade } from "./slab-shade";
import { SlabSpecs } from "./slab-specs";
import { SlabTitle } from "./slab-title";

import styles from "../../styles/projects-showcase.module.scss";
import { useProjectSlab } from "../../../lib/hooks/use-projects-slab";

export const ProjectSlab = ({
    project,
    index,
    total,
    progress,
    stacked,
    shouldReduceMotion,
}: ProjectSlabProps) => {
    const { reversed, direction, number, totalLabel, cardStyle, shade } =
        useProjectSlab({ index, total, progress, stacked, shouldReduceMotion });

    return (
        <div className={styles["slab"]}>
            <motion.article
                className={`${styles["slab__card"]} ${
                    reversed ? styles["slab__card--reversed"] : ""
                }`}
                style={cardStyle}
                variants={SLAB_CARD_VARIANTS}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={SLAB_VIEWPORT}
            >
                <SlabIndex number={number} direction={direction} />

                <SlabMedia
                    title={project.title}
                    imagePath={project.imagePath}
                />

                <div className={styles["slab__content"]}>
                    <SlabMeta number={number} total={totalLabel} />

                    <SlabTitle
                        title={project.title}
                        subtitle={project.subtitle}
                    />

                    <SlabDescription text={project.description} />

                    {project.additionalData &&
                        project.additionalData.length > 0 && (
                            <SlabSpecs items={project.additionalData} />
                        )}
                </div>

                <SlabShade opacity={shade} />
            </motion.article>
        </div>
    );
};