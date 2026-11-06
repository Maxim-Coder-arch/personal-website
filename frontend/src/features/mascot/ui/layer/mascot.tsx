"use client";

import { useMascot } from "../../lib/hooks/use-mascot";

import { MascotFace } from "./components/mascot-face";
import { MascotHead } from "./components/mascot-head";
import { MascotLayout } from "./components/mascot-layout";
import { MascotWhiskers } from "./components/mascot-whiskers";

export const Mascot = () => {
    const { canHover, ref, hop, tap, handleClick, ...face } = useMascot();

    if (!canHover) return null;

    return (
        <MascotLayout
            ref={ref}
            hop={hop}
            tap={tap}
            onClick={handleClick}
        >
            <MascotHead />
            <MascotFace {...face} />
            <MascotWhiskers />
        </MascotLayout>
    );
};