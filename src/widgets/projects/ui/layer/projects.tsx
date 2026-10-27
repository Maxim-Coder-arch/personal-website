import Link from "next/link";
import styles from "../styles/projects.module.scss";
import { ArrowRightUp } from "@/src/shared/icons/arrow-right-up";

export const Projects = () => {
    return (
        <section id="projects">
            <div className={`${styles["projects-section"]} min-h-screen px-8 py-6`}>
                <div className={`${styles["projects-section__heading"]} flex justify-between items-center`}>
                    <h2>Projects</h2>

                    <div className={`${styles["projects-section__heading__more-projects"]}`}>
                        <Link href={"/"} className="flex items-center gap-4 px-6 py-2 rounded-3xl">
                            Смотреть все
                            <ArrowRightUp />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}