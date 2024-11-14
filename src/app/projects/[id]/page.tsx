import { DetailProjectComponent } from "@/projects/components";

export default async function ProjectsIDPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  return <DetailProjectComponent id={id} />;
}
