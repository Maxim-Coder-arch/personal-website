import { useIntroDone } from "@/src/shared/lib/intro/use-intro-done";

export const useHeroReveal = (shouldReduceMotion: boolean | null) => {
    const introDone = useIntroDone();

    return introDone || Boolean(shouldReduceMotion);
};