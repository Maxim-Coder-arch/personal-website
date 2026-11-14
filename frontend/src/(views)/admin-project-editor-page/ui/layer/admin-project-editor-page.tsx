import { ProjectEditor } from "@/src/widgets/sections/admin-content-page/project-editor";

import type { AdminProjectEditorPageProps } from "../../model/types";

import { AdminProjectEditorPageLayout } from "./admin-project-editor-page-layout";

export const AdminProjectEditorPage = ({ projectId }: AdminProjectEditorPageProps) => {
    return (
        <AdminProjectEditorPageLayout>
            <ProjectEditor projectId={projectId} />
        </AdminProjectEditorPageLayout>
    );
};