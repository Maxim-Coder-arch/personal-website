import { FACE } from "../../model/config";

export const lidPath = (cx: number, curve: number) => `M ${cx - 10} ${FACE.eyeY} Q ${cx} ${FACE.eyeY + curve} ${cx + 10} ${FACE.eyeY}`;