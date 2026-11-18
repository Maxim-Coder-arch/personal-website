export const SECTION_NAV_CONFIG = {
    compactQuery: "(max-width: 640px)",
    hoverQuery: "(hover: hover)",
    closeDelay: 280,
    focusLine: 0.4,
    footerId: "footer",
    footerMargin: "0px 0px -120px 0px",
    listId: "section-nav-list",
} as const;

export const ORBIT_PRESETS = {
    regular: { radius: 280, step: 44 },
    compact: { radius: 200, step: 32 },
} as const;