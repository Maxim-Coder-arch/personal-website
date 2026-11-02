import { useSyncExternalStore } from "react";

import {
    getIntroServerSnapshot,
    getIntroSnapshot,
    subscribeIntro,
} from "./intro-store";

export const useIntroDone = () => {
    return useSyncExternalStore(
        subscribeIntro,
        getIntroSnapshot,
        getIntroServerSnapshot,
    );
}