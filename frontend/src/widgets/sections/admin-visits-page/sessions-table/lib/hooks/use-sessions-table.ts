import { useSessions } from "@/src/entities/api/analytics/analytics-queries";
import { useThoughtTitles } from "@/src/entities/api/thoughts/thought-queries";
import { useDateRange } from "@/src/features/date-range";
import {
    VISITS_PARAMS_CONFIG,
    useSelectedSession,
    useVisitsParams,
} from "@/src/features/visits-params";

import { getPageCount } from "../helpers/get-page-count";

export const useSessionsTable = () => {
    const { range } = useDateRange();
    const { filters, page, setPage } = useVisitsParams();
    const { open } = useSelectedSession();
    const titles = useThoughtTitles();

    const query = useSessions({
        range,
        filters,
        page,
        pageSize: VISITS_PARAMS_CONFIG.pageSize,
    });

    const pageCount = query.data ? getPageCount(query.data.total, query.data.pageSize) : 1;

    return {
        query,
        titles: titles.data,
        page,
        pageCount,
        setPage,
        openSession: open,
    };
};