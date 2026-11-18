"use client";

import { useMemo } from "react";

import { useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

import { getOrbitGeometry } from "../../../lib/helpers/get-orbit-geometry";
import { scrollToSection } from "../../../lib/helpers/scroll-to-section";
import { useOrbitDisclosure } from "../../../lib/hooks/use-orbit-disclosure";
import { useOrbitMotion } from "../../../lib/hooks/use-orbit-motion";
import { useSectionProgress } from "../../../lib/hooks/use-section-progress";
import { ORBIT_PRESETS, SECTION_NAV_CONFIG } from "../../../model/config";
import { SECTION_IDS, SECTION_NAV_ITEMS } from "../../../model/data";
import type { NavDialProps } from "../../../model/types";

import { NavNode } from "./nav-node";
import { NavOrbit } from "./nav-orbit";
import { NavTrigger } from "./nav-trigger";

import styles from "../../styles/section-nav.module.scss";

export const NavDial = ({ preset }: NavDialProps) => {
    const t = useTranslations("sectionNav");
    const shouldReduceMotion = Boolean(useReducedMotion());
    const { radius, step } = ORBIT_PRESETS[preset];

    const geometry = useMemo(
        () => getOrbitGeometry(SECTION_NAV_ITEMS.length, radius, step),
        [radius, step],
    );

    const { progress, activeIndex } = useSectionProgress(SECTION_IDS);
    const { handAngle, fill } = useOrbitMotion(progress, geometry);

    const { scrollYProgress } = useScroll();
    const pageProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.5,
    });

    const { open, rootRef, rootHandlers, onTriggerClick, afterSelect } =
        useOrbitDisclosure();

    const handleSelect = (id: string) => {
        scrollToSection(id, shouldReduceMotion);
        afterSelect();
    };

    return (
        <div
            ref={rootRef}
            className={[styles["dial"], open ? styles["dial--open"] : ""].join(" ")}
            {...rootHandlers}
        >
            <div
                className={styles["dial__field"]}
                style={{ width: radius + 48, height: radius + 48 }}
            />

            <NavOrbit geometry={geometry} handAngle={handAngle} fill={fill} />

            <ul id={SECTION_NAV_CONFIG.listId} className={styles["dial__list"]}>
                {SECTION_NAV_ITEMS.map((item, index) => (
                    <NavNode
                        key={item.id}
                        item={item}
                        index={index}
                        layout={geometry.nodes[index]}
                        active={index === activeIndex}
                        open={open}
                        reduceMotion={shouldReduceMotion}
                        onSelect={handleSelect}
                    />
                ))}
            </ul>

            <NavTrigger
                open={open}
                progress={pageProgress}
                label={open ? t("close") : t("open")}
                controls={SECTION_NAV_CONFIG.listId}
                onClick={onTriggerClick}
            />
        </div>
    );
};