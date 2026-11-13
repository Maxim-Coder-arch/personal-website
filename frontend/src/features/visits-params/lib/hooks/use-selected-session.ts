import { useUrlParams } from "@/src/shared/lib/hooks/use-url-params";

import { VISITS_PARAMS_CONFIG } from "../../model/config";

const { session } = VISITS_PARAMS_CONFIG.keys;

export const useSelectedSession = () => {
    const { searchParams, update } = useUrlParams();

    const sessionId = searchParams.get(session);

    const open = (id: string) => update({ [session]: id });

    const close = () => update({ [session]: null });

    return { sessionId, open, close };
};