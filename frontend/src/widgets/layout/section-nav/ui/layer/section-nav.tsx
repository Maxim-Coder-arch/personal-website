"use client";

import { AnimatePresence } from "framer-motion";

import { useSectionNavVisibility } from "../../lib/hooks/use-section-nav-visibility";

import { NavPanel } from "./components/nav-panel";

export const SectionNav = () => {
    const visible = useSectionNavVisibility();

    return <AnimatePresence>{visible && <NavPanel />}</AnimatePresence>;
};