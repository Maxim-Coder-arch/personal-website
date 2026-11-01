import { JsIcon } from "@/src/shared/icons/firm-icons/javascript";

export const createRepeatedIcons = (count: number) =>
Array.from({ length: count }, (_, index) => ({
    id: `javascript-${index + 1}`,
    svgImage: <JsIcon />,
    pointerLabel: "JavaScript",
}));