import { IProject, ProjectStructureBuilder } from "../../model/types";

export const projectStructureBuilder = (projectsData: ProjectStructureBuilder, limit: number = 10) => {
    const generated: IProject[] = [];
    const length = projectsData.length || limit;

    for (let i = 0; i < length; ++i) {
        const project = projectsData[i];
        const newProject = {
            id: crypto.randomUUID() + `index-${i}`,
            title: project?.title || `Project title - ${i}`,
            subtitle: project?.subtitle || `Project subtitle - ${i}`,
            description: project?.description || `Project description - ${i}`,
            additionalData: project?.additionalData,
            imagePath: project?.imagePath || "/projects-presentations/24963.jpg",
        }

        generated.push(newProject);
    }

    return generated;
}