"use client";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { useAdminNav } from "./use-admin-nav";

export const useAdminTopbar = () => {
    const queryClient = useQueryClient();
    const { title, hasRange } = useAdminNav();
    const fetching = useIsFetching() > 0;

    const refresh = () => queryClient.invalidateQueries();

    return { title, hasRange, fetching, refresh };
};