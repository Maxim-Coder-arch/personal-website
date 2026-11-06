
import { ProjectSpecsProps } from "../../../model/types";

import styles from "../../styles/projects.module.scss";

export const ProjectSpecs = ({ specs }: ProjectSpecsProps) => {
    return (
        <dl className={styles["projects-section__specs"]}>
            {specs.map(({ label, value }, index) => (
                <div
                    key={`${label}-${index}`}
                    className={styles["projects-section__spec"]}
                >
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    );
};