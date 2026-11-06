import { ExperienceGrid } from "./components/experience-grid";
import { ExperienceHeader } from "./components/experience-header";
import { ExperienceLayout } from "./components/experience-layout";


export const Experience = () => {
    return (
        <ExperienceLayout>
            <ExperienceHeader />
            <ExperienceGrid />
        </ExperienceLayout>
    );
};
