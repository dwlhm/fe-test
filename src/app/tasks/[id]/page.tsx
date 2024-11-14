import { BasicButton } from "@/components/buttons";
import { ErrorCard } from "@/components/cards";
import { BasicContainerWithTitleAction } from "@/components/containers";
import { BasicLoading } from "@/components/loadings";
import { getProjects } from "@/projects/api";
import { DetailProjectComponent } from "@/projects/components";
import { useProjects } from "@/projects/hooks";

export default async function TasksIDPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  return <DetailProjectComponent id={id} />;
}
