import { SCENIC_ANIMATION } from "../../model/animations";

import { ScenicAnimationProps } from "../../model/types";

export const getAnimationProps = (
    delay: number,
    shouldReduceMotion: boolean | null,
): ScenicAnimationProps => ({
    initial: shouldReduceMotion ? false : {
        opacity: 0,
        y: 45,
    },
    whileInView: {
        opacity: 1,
        y: 0,
    },
    viewport: {
        once: true,
        amount: SCENIC_ANIMATION.viewportAmount,
    },
    transition: {
        duration: shouldReduceMotion ? 0 : SCENIC_ANIMATION.duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: SCENIC_ANIMATION.easing,
    },
});

export const contactAnimation = (
    shouldReduceMotion: boolean | null,
): ScenicAnimationProps => {
    return getAnimationProps(
        SCENIC_ANIMATION.delay + 0.3,
        shouldReduceMotion,
    );
}