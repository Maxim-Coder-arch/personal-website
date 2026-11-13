"use client";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { analyticsQueries } from "@/src/entities/api/analytics/analytics-queries";

import { useAdminNav } from "./use-admin-nav";

export const useAdminTopbar = () => {
    const queryClient = useQueryClient();
    const { title } = useAdminNav();
    const fetching = useIsFetching({ queryKey: analyticsQueries.key }) > 0;

    const refresh = () => queryClient.invalidateQueries({ queryKey: analyticsQueries.key });

    return { title, fetching, refresh };
};