export interface IThought {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    createdAt: string;
}

export interface ThoughtsListItemProps {
    thought: IThought;
    index: number;
    shouldReduceMotion: boolean | null;
}