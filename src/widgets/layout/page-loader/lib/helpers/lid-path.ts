import { EYE } from "../../model/config";

export const lidPath = (cx: number, curve: number) =>
    `M ${cx - EYE.rx} ${EYE.cy} Q ${cx} ${EYE.cy + curve} ${cx + EYE.rx} ${EYE.cy}`;