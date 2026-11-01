"use client";

import { useReducedMotion } from "framer-motion";

import { ScenicLayout } from "./components/scenic-layout";
import { ScenicContact } from "./components/scenic-contact";

import { contactAnimation } from "../../lib/helpers/animations";

export const Scenic = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <ScenicLayout>
            <ScenicContact
                shouldReduceMotion={shouldReduceMotion}
                animation={contactAnimation(shouldReduceMotion)}
            />
        </ScenicLayout>
    );
};