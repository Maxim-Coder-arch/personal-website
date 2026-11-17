"use client";

import { AnimatePresence } from "framer-motion";

import { useAnalyticsNotice } from "../../lib/hooks/use-analytics-notice";

import { NoticeCard } from "./components/notice-card";

export const AnalyticsNotice = () => {
    const { visible, accept } = useAnalyticsNotice();

    return <AnimatePresence>{visible && <NoticeCard onAccept={accept} />}</AnimatePresence>;
};