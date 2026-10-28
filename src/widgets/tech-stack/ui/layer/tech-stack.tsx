import { ReactElement } from "react";
import styles from "../styles/tech-stack.module.scss";

export interface ITecnology {
    id: string;
    title: string;
    description: string;
    icons: {
        id: string;
        svgImage: ReactElement;
        pointerLabel: string;
    }[];
}

export const JsIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
            <path d="M0 0h256v256H0z" fill="none" />
            <path fill="#f7df1e" d="M0 0h256v256H0z" />
            <path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574" />
        </svg>
    )
}

export const tecnologies: ITecnology[] = [
    {
        id: "1",
        title: "Frontend",
        description: "Мое основное направление. Эти технологии я знаю лучше всего",
        icons: [
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
        ],
    },
    {
        id: "2",
        title: "Frontend",
        description: "Мое основное направление. Эти технологии я знаю лучше всего",
        icons: [
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
        ],
    },
    {
        id: "3",
        title: "Frontend",
        description: "Мое основное направление. Эти технологии я знаю лучше всего",
        icons: [
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
        ],
    },
    {
        id: "4",
        title: "Frontend",
        description: "Мое основное направление. Эти технологии я знаю лучше всего",
        icons: [
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
        ],
    },
    {
        id: "5",
        title: "Frontend",
        description: "Мое основное направление. Эти технологии я знаю лучше всего",
        icons: [
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
            {
                id: `icon-${crypto.randomUUID()}`,
                svgImage: <JsIcon />, 
                pointerLabel: "Javascript",
            },
        ],
    },
]



interface TechStackCardProps {
    technology: ITecnology;
}

export const TechStackCard = ({ technology }: TechStackCardProps) => {
    return (
        <article className={styles["tech-stack__card"]}>
            <div className={styles["tech-stack__card-icons"]}>
                {technology.icons.map((icon) => (
                    <div
                        key={icon.id}
                        className={styles["tech-stack__card-icons__icon"]}
                        title={icon.pointerLabel}
                        aria-label={icon.pointerLabel}
                    >
                        {icon.svgImage}
                    </div>
                ))}
            </div>

            <div className={styles["tech-stack__card-content"]}>
                <h4 className={styles["tech-stack__card-title"]}>
                    {technology.title}
                </h4>

                <p className={styles["tech-stack__card-description"]}>
                    {technology.description}
                </p>
            </div>
        </article>
    );
};


export const TechStack = () => {
    return (
        <section id="tech-stack">
            <div
                className={`${styles["tech-stack"]} min-h-screen py-8 px-6 flex flex-col gap-8`}
            >
                <div
                    className={`${styles["tech-stack__heading"]} w-full flex flex-col`}
                >
                    <div className="w-full flex justify-start">
                        <h2>Tech stack</h2>
                    </div>

                    <div className="w-full flex justify-end">
                        <h3>Те самые технологии</h3>
                    </div>
                </div>

                <div className={styles["tech-stack__grid"]}>
                    {tecnologies.map((technology) => (
                       <div
                            key={technology.id}
                            className={
                                styles[`tech-stack__card-wrapper--${technology.id}`]
                            }
                        >
                            <TechStackCard technology={technology} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}