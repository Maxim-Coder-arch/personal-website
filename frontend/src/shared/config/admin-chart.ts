import { ADMIN_COLORS } from "./admin-colors";

export const CHART_ANIMATION_DURATION = 700;

export const CHART_TICK = { fill: ADMIN_COLORS.muted, fontSize: 12 } as const;

export const CHART_CURSOR_BAR = { fill: "rgba(255, 255, 255, 0.04)" } as const;

export const CHART_CURSOR_LINE = {
    stroke: ADMIN_COLORS.muted,
    strokeDasharray: "3 3",
} as const;

export const CHART_TOOLTIP_STYLE = {
    background: "#1d1d1d",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    borderRadius: 12,
    fontSize: 12,
} as const;

export const CHART_BAR_RADIUS: [number, number, number, number] = [4, 4, 0, 0];