"use client";

import { useThoughts } from "@/src/entities/api/thoughts/thought-queries";
import type { ThoughtsDevelopmentProps } from "../../model/types";

import { ThoughtsHeader } from "./components/thoughts-header";
import { ThoughtsLayout } from "./components/thoughts-layout";
import { ThoughtsList } from "./components/thoughts-list";

export const ThoughtsDevelopment = ({ articles }: ThoughtsDevelopmentProps) => {
    const {data, isLoading, isError} = useThoughts();

    if (!data) {
        return <p>Empty</p>
    }

    if (isLoading) {
        return <p>loading...</p>
    }

    if (isError) {
        return <p>error</p>
    }

    return (
        <ThoughtsLayout>
            <ThoughtsHeader />
            <ThoughtsList articles={data} />
        </ThoughtsLayout>
    );
};