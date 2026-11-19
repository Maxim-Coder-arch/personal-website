import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { initMetrika, sendMetrikaHit } from "../helpers/metrika";

export const useMetrikaHits = (counterId: number) => {
    const pathname = usePathname();
    const previous = useRef<string | null>(null);

    useEffect(() => {
        initMetrika(counterId);
    }, [counterId]);

    useEffect(() => {
        const url = `${window.location.origin}${pathname}${window.location.search}`;

        sendMetrikaHit(counterId, url, previous.current);
        previous.current = url;
    }, [counterId, pathname]);
};