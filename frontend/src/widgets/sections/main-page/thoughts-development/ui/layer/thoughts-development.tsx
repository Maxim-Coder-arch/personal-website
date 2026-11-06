import type { ThoughtsDevelopmentProps } from "../../model/types";

import { ThoughtsHeader } from "./components/thoughts-header";
import { ThoughtsLayout } from "./components/thoughts-layout";
import { ThoughtsList } from "./components/thoughts-list";

export const ThoughtsDevelopment = ({ articles }: ThoughtsDevelopmentProps) => {
    return (
        <ThoughtsLayout>
            <ThoughtsHeader />
            <ThoughtsList articles={articles} />
        </ThoughtsLayout>
    );
};