export type ExperienceId = "commercial" | "freelance" | "own" | "practice";

export interface IExperience {
    id: ExperienceId;
}

export interface ExperienceCardContentProps {
    experience: IExperience;
}

export interface ExperienceCardProps {
    experience: IExperience;
    index: number;
    shouldReduceMotion: boolean | null;
}