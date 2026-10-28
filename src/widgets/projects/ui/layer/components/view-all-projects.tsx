
import Link from "next/link";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import { ViewAllProjectsProps } from "../../../model/types";

import styles from "../../styles/projects.module.scss";

export const ViewAllProjects = ({
    href = "/projects",
}: ViewAllProjectsProps) => {
    return (
        <div className={styles["projects-section__heading__more-projects"]}>
            <Link
                href={href}
                className="flex items-center gap-4 px-6 py-3 rounded-3xl"
            >
                <span>Подробнее</span>
                <ArrowRightUp />
            </Link>
        </div>
    );
};