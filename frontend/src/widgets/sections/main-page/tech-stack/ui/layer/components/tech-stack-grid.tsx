import { getCardLayout } from "../../../lib/helpers/get-card-layout";

import { TechStackGridProps } from "../../../model/types";

import { TechStackCard } from "./tech-stack-card";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackGrid = ({
    technologies,
}: TechStackGridProps) => {
    return (
        <div className={styles["tech-stack__grid"]}>
            {technologies.map((technology, index) => {
                const layout = getCardLayout(technology.id);

                const wrapperClass =
                    layout === "default"
                        ? styles["tech-stack__card-wrapper"]
                        : styles[`tech-stack__card-wrapper--${layout}`];

                return (
                    <div
                        key={technology.id}
                        className={wrapperClass}
                    >
                        <TechStackCard
                            technology={technology}
                            index={index}
                        />
                    </div>
                );
            })}
        </div>
    );
};
