"use client";

import { useReducedMotion } from "framer-motion";

import { HeroIdentity } from "./components/hero-identity";
import { HeroPortrait } from "./components/hero-portait";
import { HeroLayout } from "./components/hero-layout";

export const HeroSection = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <HeroLayout shouldReduceMotion={shouldReduceMotion}>
            <HeroIdentity
                shouldReduceMotion={shouldReduceMotion}
            />

            <HeroPortrait
                shouldReduceMotion={shouldReduceMotion}
            />
        </HeroLayout>
    );
};