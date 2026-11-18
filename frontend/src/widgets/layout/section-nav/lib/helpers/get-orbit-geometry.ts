import type { OrbitGeometry } from "../../model/types";

const toDegrees = (radians: number) => (radians * 180) / Math.PI;

export const getOrbitGeometry = (
    count: number,
    radius: number,
    step: number,
): OrbitGeometry => {
    const spacing = Math.min(step, (radius * 0.96) / count);

    const nodes = Array.from({ length: count }, (_, index) => {
        const y = spacing * (index + 1);
        const x = Math.sqrt(radius * radius - y * y);

        return { x: -x, y: -y, angle: toDegrees(Math.asin(y / radius)) };
    });

    return { radius, nodes, sweep: nodes[nodes.length - 1].angle };
};