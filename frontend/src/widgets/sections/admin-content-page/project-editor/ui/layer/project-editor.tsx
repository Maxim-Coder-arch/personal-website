"use client";

import type { ProjectEditorProps } from "../../model/types";

import { ProjectEditorForm } from "./components/project-editor-form";
import { ProjectEditorLoader } from "./components/project-editor-loader";

export const ProjectEditor = ({ projectId }: ProjectEditorProps) => {
    if (!projectId) return <ProjectEditorForm />;

    return <ProjectEditorLoader projectId={projectId} />;
};