import Link from "next/link";
import styles from "../styles/projects.module.scss";
import { ArrowRightUp } from "@/src/shared/icons/arrow-right-up";
import { projects } from "../../model/dev-mock.data";
import Image from "next/image";

export const Projects = () => {
    return (
        <section id="projects">
            <div className={`${styles["projects-section"]} min-h-screen px-8 py-10 flex flex-col gap-[2rem]`}>
                <div className={`${styles["projects-section__heading"]} flex justify-between items-center`}>
                    <h2>Projects</h2>

                    <div className={`${styles["projects-section__heading__more-projects"]}`}>
                        <Link href={"/"} className="flex items-center gap-4 px-6 py-2 rounded-3xl">
                            Подробнее

                            <ArrowRightUp />
                        </Link>
                    </div>
                </div>

                <div className={`${styles["projects-section__project-list"]}`}>
                    {projects.map(project => {
                        return (
                            <Link href={project.id} key={project.id} className={`${styles["projects-section__project-list__project-card"]} flex flex-col gap-3 rounded-2xl p-2`}>
                                <div className={`${styles["projects-section__project-list__project-card__image"]} rounded-2xl`} style={{backgroundImage: `url(${project.imagePath})`}}></div>
                                
                                <div>
                                    <h3>{project.title}</h3>
                                    <span>{project.subtitle}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}