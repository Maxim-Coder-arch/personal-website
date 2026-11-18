export const SECTION_NAV_ITEMS = [
    { id: "top", key: "hero" },
    { id: "projects", key: "projects" },
    { id: "tech-stack", key: "techStack" },
    { id: "experience", key: "experience" },
    { id: "thoughts-development", key: "thoughts" },
    { id: "scenic", key: "scenic" },
] as const;

export const SECTION_IDS: string[] = SECTION_NAV_ITEMS.map(({ id }) => id);