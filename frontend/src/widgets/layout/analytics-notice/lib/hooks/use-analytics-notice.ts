import { useSyncExternalStore } from "react";

import { useIntroDone } from "@/src/shared/lib/hooks/use-intro-done";

import {
    acknowledgeNotice,
    getNoticeServerSnapshot,
    getNoticeSnapshot,
    subscribeNotice,
} from "../helpers/notice-store";

export const useAnalyticsNotice = () => {
    const introDone = useIntroDone();

    const acknowledged = useSyncExternalStore(
        subscribeNotice,
        getNoticeSnapshot,
        getNoticeServerSnapshot,
    );

    return { visible: introDone && !acknowledged, accept: acknowledgeNotice };
};