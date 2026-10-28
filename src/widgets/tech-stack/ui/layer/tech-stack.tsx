
import { technologies } from "../../model/data";

import { TechStackGrid } from "./components/tech-stack-grid";
import { TechStackHeader } from "./components/tech-stack-heading";
import { TechStackLayout } from "./components/tech-stack-layout";

export const TechStack = () => {
    return (
        <TechStackLayout>
            <TechStackHeader />
            <TechStackGrid technologies={technologies} />
        </TechStackLayout>
    );
};
