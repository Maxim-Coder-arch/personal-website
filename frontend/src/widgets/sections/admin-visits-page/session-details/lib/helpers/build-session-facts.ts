import type { SessionListItem } from "@/src/entities/api/analytics/types";
import { getDeviceTitle } from "@/src/shared/lib/helpers/analytics-labels";

import { SESSION_DETAILS_CONFIG } from "../../model/config";
import type { SessionFact } from "../../model/types";

const joinParts = (...parts: (string | number | null | undefined)[]) =>
    parts.filter((part) => part !== null && part !== undefined && part !== "").join(" ");

const joinSize = (width: number | null, height: number | null) =>
    width !== null && height !== null ? `${width}×${height}` : "";

export const buildSessionFacts = (session: SessionListItem): SessionFact[] => {
    const facts: SessionFact[] = [
        { label: "Устройство", value: getDeviceTitle(session) },
        { label: "Браузер", value: joinParts(session.browser, session.browserVersion) },
        { label: "ОС", value: joinParts(session.os, session.osVersion) },
        { label: "Экран", value: joinSize(session.screenWidth, session.screenHeight) },
        { label: "Окно", value: joinSize(session.viewportWidth, session.viewportHeight) },
        { label: "Плотность пикселей", value: session.pixelRatio ? `×${session.pixelRatio}` : "" },
        { label: "Язык", value: session.language ?? "" },
        { label: "Часовой пояс", value: session.timeZone ?? "" },
        {
            label: "Источник",
            value: session.referrerHost ?? SESSION_DETAILS_CONFIG.directReferrer,
        },
        { label: "UTM", value: session.utmSource ?? "" },
    ];

    return facts.filter((fact) => fact.value !== "");
};