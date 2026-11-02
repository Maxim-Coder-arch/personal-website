import { EYE } from "../../model/config";
import type { EyeState, IntroPhase } from "../../model/types";

const SLEEP: EyeState = { closed: true, curve: EYE.lidCurve.sleep };
const OPEN: EyeState = { closed: false, curve: EYE.lidCurve.sleep };
const WINK: EyeState = { closed: true, curve: EYE.lidCurve.wink };

export const getEyesState = (
    phase: IntroPhase,
    blinking: boolean,
): readonly [EyeState, EyeState] => {
    if (phase === "idle") return [SLEEP, SLEEP];
    if (phase === "wink") return [OPEN, WINK];

    return blinking ? [SLEEP, SLEEP] : [OPEN, OPEN];
};