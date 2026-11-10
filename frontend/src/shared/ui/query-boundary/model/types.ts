import type { ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

export interface QueryBoundaryProps<TData> {
    query: UseQueryResult<TData, Error>;
    children: (data: TData) => ReactNode;
    loadingFallback?: ReactNode;
    errorFallback?: ReactNode;
    emptyFallback?: ReactNode;
    isEmpty?: (data: TData) => boolean;
}

export type QueryStateKind = "loading" | "error" | "empty";

export interface QueryStateProps {
    kind: QueryStateKind;
    onRetry?: () => void;
}