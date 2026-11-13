import type { SessionFilters } from "@/src/entities/api/analytics/types";
import { useUrlParams } from "@/src/shared/lib/hooks/use-url-params";

import { VISITS_PARAMS_CONFIG } from "../../model/config";
import type { DeviceFilter, VisitorFilter } from "../../model/types";
import { parseCountry, parseDevice, parsePage, parseVisitor } from "../helpers/parse-params";

const { keys } = VISITS_PARAMS_CONFIG;

export const useVisitsParams = () => {
    const { searchParams, update } = useUrlParams();

    const device = parseDevice(searchParams.get(keys.device));
    const visitor = parseVisitor(searchParams.get(keys.visitor));
    const country = parseCountry(searchParams.get(keys.country));
    const page = parsePage(searchParams.get(keys.page));

    const filters: SessionFilters = {
        device: device === "all" ? undefined : device,
        country,
        returning: visitor === "all" ? undefined : visitor === "returning",
    };

    const hasFilters = device !== "all" || visitor !== "all" || country !== undefined;

    const setDevice = (id: DeviceFilter) =>
        update({ [keys.device]: id === "all" ? null : id, [keys.page]: null });

    const setVisitor = (id: VisitorFilter) =>
        update({ [keys.visitor]: id === "all" ? null : id, [keys.page]: null });

    const setCountry = (code?: string) =>
        update({ [keys.country]: code ?? null, [keys.page]: null });

    const setPage = (next: number) =>
        update({ [keys.page]: next > 1 ? String(next) : null });

    const reset = () =>
        update({
            [keys.device]: null,
            [keys.visitor]: null,
            [keys.country]: null,
            [keys.page]: null,
        });

    return {
        device,
        visitor,
        country,
        page,
        filters,
        hasFilters,
        setDevice,
        setVisitor,
        setCountry,
        setPage,
        reset,
    };
};