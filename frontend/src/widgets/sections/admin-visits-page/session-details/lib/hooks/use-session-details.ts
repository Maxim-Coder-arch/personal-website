import { useState } from "react";

import { useSession } from "@/src/entities/api/analytics/analytics-queries";
import { useThoughtTitles } from "@/src/entities/api/thoughts/thought-queries";
import { useSelectedSession } from "@/src/features/visits-params";

export const useSessionDetails = () => {
    const { sessionId, close } = useSelectedSession();
    const [lastId, setLastId] = useState<string | null>(null);

    if (sessionId && sessionId !== lastId) setLastId(sessionId);

    const query = useSession(sessionId ?? lastId);
    const titles = useThoughtTitles();

    return {
        open: sessionId !== null,
        close,
        query,
        titles: titles.data,
    };
};