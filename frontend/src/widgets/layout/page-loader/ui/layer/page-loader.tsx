"use client";

import { usePageLoader } from "../../lib/hooks/use-page-loader";

import { LoaderCounter } from "./components/loader-counter";
import { LoaderEyes } from "./components/loader-eyes";
import { LoaderLayout } from "./components/loader-layout";

export const PageLoader = () => {
    const {
        visible,
        revealing,
        expanding,
        eyes,
        counter,
        pupilX,
        pupilY,
        skip,
    } = usePageLoader();

    if (!visible) return null;

    return (
        <LoaderLayout revealing={revealing} onSkip={skip}>
            <LoaderEyes
                eyes={eyes}
                expanding={expanding}
                pupilX={pupilX}
                pupilY={pupilY}
            />

            <LoaderCounter value={counter} hidden={expanding} />
        </LoaderLayout>
    );
};