import { TechStackIconsProps } from "../../../model/types";

import { TechStackIcon } from "./tech-stack-icon";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackIcons = ({
    icons,
    reduceMotion,
}: TechStackIconsProps) => {
    return (
        <div className={styles["tech-stack__card-icons"]}>
            {icons.map((icon, index) => (
                <TechStackIcon
                    key={icon.id}
                    icon={icon}
                    index={index}
                    reduceMotion={reduceMotion}
                />
            ))}
        </div>
    );
};
