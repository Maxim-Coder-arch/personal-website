import { useTransform, type MotionValue } from "framer-motion";

import type { OrbitGeometry } from "../../model/types";

export const useOrbitMotion = (
    progress: MotionValue<number>,
    geometry: OrbitGeometry,
) => {
    const indexes = geometry.nodes.map((_, index) => index);
    const angles = geometry.nodes.map(({ angle }) => angle);

    const handAngle = useTransform(progress, indexes, angles);
    const fill = useTransform(handAngle, (angle) => angle / geometry.sweep);

    return { handAngle, fill };
};