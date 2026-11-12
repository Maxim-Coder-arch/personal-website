import {
    ANALYTICS_URL,
    HEARTBEAT_MS,
    SESSION_KEY,
    VISITOR_KEY,
} from "../model/config";

import { readStorage, writeStorage } from "./storage";

interface PageState {
    path: string;
    pageViewId: string | null;
    activeMs: number;
    visibleSince: number | null;
    sentSeconds: number;
}

interface TrackResponse {
    sessionId: string;
    pageViewId: string;
}

let current: PageState | null = null;
let isFirstPage = true;
let listening = false;
let fallbackVisitorId: string | null = null;

const getVisitorId = (): string => {
    const stored = readStorage(VISITOR_KEY);

    if (stored) {
        return stored;
    }

    const id = fallbackVisitorId ?? crypto.randomUUID();

    fallbackVisitorId = id;
    writeStorage(VISITOR_KEY, id);

    return id;
};

const externalReferrer = (): string | null => {
    if (!document.referrer) {
        return null;
    }

    try {
        const host = new URL(document.referrer).host;

        return host === window.location.host ? null : document.referrer.slice(0, 2000);
    } catch {
        return null;
    }
};

const buildPayload = (path: string, first: boolean) => {
    const params = new URLSearchParams(window.location.search);

    return {
        visitorId: getVisitorId(),
        sessionId: readStorage(SESSION_KEY),
        path,
        referrer: first ? externalReferrer() : null,
        utmSource: first ? params.get("utm_source")?.slice(0, 100) ?? null : null,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
        maxTouchPoints: navigator.maxTouchPoints,
        language: navigator.language,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
};

const pause = (page: PageState) => {
    if (page.visibleSince !== null) {
        page.activeMs += performance.now() - page.visibleSince;
        page.visibleSince = null;
    }
};

const resume = (page: PageState) => {
    if (page.visibleSince === null) {
        page.visibleSince = performance.now();
    }
};

const activeSeconds = (page: PageState) => {
    const running =
        page.visibleSince === null ? 0 : performance.now() - page.visibleSince;

    return Math.round((page.activeMs + running) / 1000);
};

const post = (url: string, body: string, beacon: boolean) => {
    if (beacon && typeof navigator.sendBeacon === "function") {
        const queued = navigator.sendBeacon(
            url,
            new Blob([body], { type: "application/json" }),
        );

        if (queued) {
            return;
        }
    }

    void fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
    }).catch(() => undefined);
};

const sendDuration = (page: PageState, beacon: boolean) => {
    if (!page.pageViewId) {
        return;
    }

    const seconds = activeSeconds(page);

    if (seconds <= page.sentSeconds) {
        return;
    }

    page.sentSeconds = seconds;

    post(
        `${ANALYTICS_URL}/duration`,
        JSON.stringify({ pageViewId: page.pageViewId, seconds }),
        beacon,
    );
};

const handleVisibility = () => {
    if (!current) {
        return;
    }

    if (document.visibilityState === "hidden") {
        pause(current);
        sendDuration(current, true);
    } else {
        resume(current);
    }
};

const handlePageHide = () => {
    if (!current) {
        return;
    }

    pause(current);
    sendDuration(current, true);
};

const listen = () => {
    if (listening) {
        return;
    }

    listening = true;

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);

    window.setInterval(() => {
        if (current && document.visibilityState === "visible") {
            sendDuration(current, false);
        }
    }, HEARTBEAT_MS);
};

export const trackPage = async (path: string) => {
    if (current?.path === path) {
        return;
    }

    listen();

    if (current) {
        pause(current);
        sendDuration(current, false);
    }

    const page: PageState = {
        path,
        pageViewId: null,
        activeMs: 0,
        visibleSince:
            document.visibilityState === "visible" ? performance.now() : null,
        sentSeconds: 0,
    };

    current = page;

    const first = isFirstPage;

    isFirstPage = false;

    try {
        const response = await fetch(`${ANALYTICS_URL}/pageview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildPayload(path, first)),
            keepalive: true,
        });

        if (response.status !== 200) {
            return;
        }

        const result = (await response.json()) as TrackResponse;

        writeStorage(SESSION_KEY, result.sessionId);
        page.pageViewId = result.pageViewId;
    } catch {
        return;
    }
};

export const stopTracking = () => {
    if (!current) {
        return;
    }

    pause(current);
    sendDuration(current, false);

    current = null;
};