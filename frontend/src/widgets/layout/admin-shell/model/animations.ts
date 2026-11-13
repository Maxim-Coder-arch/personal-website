export const SIDEBAR_PILL_ID = "admin-sidebar-pill";

export const BOTTOM_PILL_ID = "admin-bottom-pill";

export const contentMotion = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" },
} as const;

export const REFRESH_TAP = { scale: 0.9 } as const;