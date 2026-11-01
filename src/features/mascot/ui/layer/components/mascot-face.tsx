import { motion } from "framer-motion";

import { FACE } from "../../../model/config";
import type { MascotFaceProps } from "../../../model/types";

import { MascotBrows } from "./mascot-brows";
import { MascotCheeks } from "./mascot-cheeks";
import { MascotEye } from "./mascot-eye";
import { MascotMouth } from "./mascot-mouth";
import { MascotNose } from "./mascot-nose";

const EYES_X = [FACE.leftEyeX, FACE.rightEyeX] as const;

export const MascotFace = ({
    pose,
    eyes,
    closed,
    pupilX,
    pupilY,
    headX,
    headY,
    transition,
    eyeTransition,
}: MascotFaceProps) => {
    return (
        <motion.g style={{ x: headX, y: headY }}>
            <MascotCheeks opacity={pose.cheeks} transition={transition} />

            {EYES_X.map((cx, index) => (
                <MascotEye
                    key={cx}
                    cx={cx}
                    scale={eyes[index]}
                    closed={closed[index]}
                    lid={pose.lid}
                    pupilScale={pose.pupil}
                    pupilX={pupilX}
                    pupilY={pupilY}
                    transition={eyeTransition}
                />
            ))}

            <MascotBrows brow={pose.brow} transition={transition} />
            <MascotNose />
            <MascotMouth shape={pose.mouth} transition={transition} />
        </motion.g>
    );
};