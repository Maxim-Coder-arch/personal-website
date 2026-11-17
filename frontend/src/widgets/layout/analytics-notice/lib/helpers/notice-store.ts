import { ANALYTICS_NOTICE_CONFIG } from "../../model/config";

const listeners = new Set<() => void>();

let acknowledgedInMemory = false;

export const getNoticeSnapshot = () => {
    if (acknowledgedInMemory) return true;

    try {
        return window.localStorage.getItem(ANALYTICS_NOTICE_CONFIG.storageKey) === "1";
    } catch {
        return false;
    }
};

export const getNoticeServerSnapshot = () => true;

export const subscribeNotice = (listener: () => void) => {
    listeners.add(listener);
    window.addEventListener("storage", listener);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
};

export const acknowledgeNotice = () => {
    acknowledgedInMemory = true;

    try {
        window.localStorage.setItem(ANALYTICS_NOTICE_CONFIG.storageKey, "1");
    } catch {}

    listeners.forEach((listener) => listener());
};