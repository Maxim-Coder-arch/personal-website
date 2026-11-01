import { ThoughtsHeader } from "./components/thoughts-header";
import { ThoughtsLayout } from "./components/thoughts-layout";
import { ThoughtsList } from "./components/thoughts-list";

export const ThoughtsDevelopment = () => {
    return (
        <ThoughtsLayout>
            <ThoughtsHeader />
            <ThoughtsList />
        </ThoughtsLayout>
    );
};
