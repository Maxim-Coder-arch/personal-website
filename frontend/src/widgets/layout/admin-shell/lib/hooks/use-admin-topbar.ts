import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { analyticsKeys } from "@/src/entities/api/analytics/analytics-queries";

import { useAdminNav } from "./use-admin-nav";

export const useAdminTopbar = () => {
    const queryClient = useQueryClient();
    const { title } = useAdminNav();
    const fetching = useIsFetching({ queryKey: analyticsKeys.all }) > 0;

    const refresh = () => queryClient.invalidateQueries({ queryKey: analyticsKeys.all });

    return { title, fetching, refresh };
};