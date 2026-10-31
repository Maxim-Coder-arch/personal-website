import { HTMLMotionProps } from "framer-motion";

export interface ScenicContactProps {
    shouldReduceMotion: boolean | null;
    animation: ScenicAnimationProps;
}

export type ScenicAnimationProps = Pick<
    HTMLMotionProps<"a">,
    "initial" | "whileInView" | "viewport" | "transition"
>;