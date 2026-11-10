"use client";

import { isEmptyData } from "../../lib/helpers/is-empty-data";
import type { QueryBoundaryProps } from "../../model/types";

import { QueryState } from "./components/query-state";

export const QueryBoundary = <TData,>({
    query,
    children,
    loadingFallback,
    errorFallback,
    emptyFallback,
    isEmpty = isEmptyData,
}: QueryBoundaryProps<TData>) => {
    const { data, isError, refetch } = query;

    if (data !== undefined) {
        if (isEmpty(data)) {
            return emptyFallback ?? <QueryState kind="empty" />;
        }

        return <>{children(data)}</>;
    }

    if (isError) {
        return (
            errorFallback ?? (
                <QueryState
                    kind="error"
                    onRetry={() => refetch()}
                />
            )
        );
    }

    return loadingFallback ?? <QueryState kind="loading" />;
};