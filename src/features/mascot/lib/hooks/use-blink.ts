import { useCallback, useState } from "react";

import { TIMING } from "../../model/config";

import { useRandomTimer } from "./use-random-timer";
import { useTimeouts } from "./use-timeouts";

export const useBlink = (enabled: boolean) => {
    const [blinking, setBlinking] = useState(false);
    const { later } = useTimeouts();

    const blink = useCallback(() => {
        const { closedMs, gapMs, doubleChance } = TIMING.blink;

        setBlinking(true);
        later(() => setBlinking(false), closedMs);

        if (Math.random() < doubleChance) {
            later(() => setBlinking(true), closedMs + gapMs);
            later(() => setBlinking(false), closedMs * 2 + gapMs);
        }
    }, [later]);

    useRandomTimer(blink, TIMING.blink.everyMs, !enabled);

    return blinking;
};