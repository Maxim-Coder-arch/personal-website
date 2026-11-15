import { createRepeatedIcons } from "../lib/helpers/create-icons";

import { ITechnology } from "./types";

export const technologies: ITechnology[] = [
    {
        id: "frontend",
        icons: createRepeatedIcons(7),
    },
    {
        id: "backend",
        icons: createRepeatedIcons(7),
    },
    {
        id: "tools",
        icons: createRepeatedIcons(7),
    },
    {
        id: "databases",
        icons: createRepeatedIcons(7),
    },
    {
        id: "other",
        icons: createRepeatedIcons(7),
    },
];
