export interface IExperience {
    id: string;
    title: string;
    description: string;
}

export interface ExperienceCardContentProps {
    experience: IExperience;
}

export interface ExperienceCardProps {
    experience: IExperience;
    index: number;
    shouldReduceMotion: boolean | null;
}