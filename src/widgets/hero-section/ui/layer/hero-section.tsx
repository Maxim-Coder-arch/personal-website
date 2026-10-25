"use client";

import { HeroSectionLayer } from "./components/hero-section-layer";
import { HeroLabels } from "./components/hero-labels";
import { HeroTitle } from "./components/hero-title";
import { HeroDecorators } from "./components/hero-decorators";

import { useReducedMotion } from "framer-motion";

export const HeroSection = () => {
    const shouldReduceMotion = useReducedMotion();
    const initialState = shouldReduceMotion ? false : "hidden";
    const animateState = "visible";

    return (
        <HeroSectionLayer>
            
            <HeroLabels
                shouldReduceMotion={shouldReduceMotion}
                initialState={initialState}
                animateState={animateState}
            />

            <HeroTitle
                initialState={initialState}
                animateState={animateState}
            />
            

            <HeroDecorators
                shouldReduceMotion={shouldReduceMotion}
                initialState={initialState}
                animateState={animateState}
            />
            
        </HeroSectionLayer>
    );
};
