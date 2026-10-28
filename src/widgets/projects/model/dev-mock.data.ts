import { projectStructureBuilder } from "../lib/helpers/projects-builder";
import { IProject } from "./types";

export const projects: IProject[] = [...projectStructureBuilder([]), ...projectStructureBuilder([{
    title: "SoftByte Learn",
    subtitle: "Онлайн обучающая платформа",
    description: "Похоже на stepic",
    additionalData: [
        {
            label: "Срок разработки",
            value: "2 недели"
        },
        {
            label: "Есть бекенд",
            value: "да",
        },
    ],
    imagePath: "/projects-presentations/24963.jpg",
}])];