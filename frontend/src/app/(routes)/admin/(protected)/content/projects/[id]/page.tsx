import { AdminProjectEditorPage } from "@/src/(views)/admin-project-editor-page";

interface ProjectEditRouteProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: ProjectEditRouteProps) {
    const { id } = await params;

    return <AdminProjectEditorPage projectId={id} />;
}