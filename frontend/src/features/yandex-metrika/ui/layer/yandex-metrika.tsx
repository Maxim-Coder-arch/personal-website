"use client";

import { YANDEX_METRIKA_CONFIG } from "../../model/config";
import { useMetrikaHits } from "../../lib/hooks/use-metrika-hits";

const MetrikaTracker = () => {
    useMetrikaHits(YANDEX_METRIKA_CONFIG.counterId);

    return null;
};

export const YandexMetrika = () => {
    if (!YANDEX_METRIKA_CONFIG.enabled) return null;

    return <MetrikaTracker />;
};