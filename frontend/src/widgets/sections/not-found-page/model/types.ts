import type { ReactNode } from "react";
import type { MotionValue } from "framer-motion";

export interface SceneLayerProps {
    lit: boolean;
    mask?: MotionValue<string>;
}

export interface SceneDigitProps {
    index: number;
    ghost?: boolean;
    children: ReactNode;
}

export interface SceneLensProps {
    x: MotionValue<number>;
    y: MotionValue<number>;
}