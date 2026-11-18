import type { MotionValue } from "framer-motion";
import type { MouseEventHandler } from "react";

import type { ORBIT_PRESETS } from "./config";
import type { SECTION_NAV_ITEMS } from "./data";

export type OrbitPresetName = keyof typeof ORBIT_PRESETS;

export type NavItem = (typeof SECTION_NAV_ITEMS)[number];

export interface NodeLayout {
    x: number;
    y: number;
    angle: number;
}

export interface OrbitGeometry {
    radius: number;
    sweep: number;
    nodes: NodeLayout[];
}

export interface NodeMotionCustom {
    x: number;
    y: number;
    index: number;
}

export interface NavDialProps {
    preset: OrbitPresetName;
}

export interface NavOrbitProps {
    geometry: OrbitGeometry;
    handAngle: MotionValue<number>;
    fill: MotionValue<number>;
}

export interface NavTriggerProps {
    open: boolean;
    progress: MotionValue<number>;
    label: string;
    controls: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface NavNodeProps {
    item: NavItem;
    index: number;
    layout: NodeLayout;
    active: boolean;
    open: boolean;
    reduceMotion: boolean;
    onSelect: (id: string) => void;
}