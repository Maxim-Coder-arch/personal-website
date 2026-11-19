import { YANDEX_METRIKA_CONFIG } from "../../model/config";

interface MetrikaQueue {
    (...args: unknown[]): void;
    a?: unknown[][];
    l?: number;
}

interface MetrikaWindow extends Window {
    ym?: MetrikaQueue;
}

let initialized = false;

const ensureQueue = (target: MetrikaWindow): MetrikaQueue => {
    if (target.ym) return target.ym;

    const queue: MetrikaQueue = (...args) => {
        queue.a = queue.a ?? [];
        queue.a.push(args);
    };

    queue.l = Date.now();
    target.ym = queue;

    return queue;
};

export const initMetrika = (counterId: number) => {
    if (initialized) return;

    initialized = true;

    const ym = ensureQueue(window as MetrikaWindow);

    const script = document.createElement("script");

    script.async = true;
    script.src = `${YANDEX_METRIKA_CONFIG.scriptSrc}?id=${counterId}`;
    document.head.appendChild(script);

    ym(counterId, "init", YANDEX_METRIKA_CONFIG.options);
};

export const sendMetrikaHit = (counterId: number, url: string, referer: string | null) => {
    (window as MetrikaWindow).ym?.(counterId, "hit", url, {
        referer: referer ?? document.referrer,
    });
};