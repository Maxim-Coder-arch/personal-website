
"use client";

import { ReactChildren } from "@/src/shared/types/global-types";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from "react";


export function QueryProvider({ children }: ReactChildren) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        retry: 1,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
