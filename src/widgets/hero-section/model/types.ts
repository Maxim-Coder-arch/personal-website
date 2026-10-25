export interface IHeroLabels {
    initialState:  false | "hidden";
    animateState: "visible";
    shouldReduceMotion: boolean | null;
}

export type IHeroTitle = Pick<IHeroLabels, "animateState" | "initialState">;

export type IHeroDecorators = IHeroLabels;