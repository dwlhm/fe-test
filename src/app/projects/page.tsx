"use client";

import { BasicButton } from "@/components/buttons";
import { ErrorCard } from "@/components/cards";
import { BasicContainerWithTitleAction } from "@/components/containers";
import { DetailComponent } from "@/projects/components";
import { useAllProjects } from "@/projects/hooks";
import { NewLayout } from "@/projects/layouts";
import { ReactNode, useState } from "react";

export default function ProjectsPage() {
  const [popupElement, setPopupElement] = useState<ReactNode>(<></>);
  const reset = () => setPopupElement(<></>);

  const { isLoading, data } = useAllProjects();

  return (
    <>
      <BasicContainerWithTitleAction
        title="My Projects"
        action={
          <BasicButton
            className="!w-[unset] bg-gray-800 text-sm hover:border-black hover:bg-black"
            onClick={() => setPopupElement(<NewLayout reset={reset} />)}
          >
            New Projects
          </BasicButton>
        }
      >
        <div className="flex gap-2 flex-col">
          {typeof data == "string" ? (
            <ErrorCard>{data}</ErrorCard>
          ) : (
            data?.map((item) => (
              <DetailComponent key={`projects.${item.id}`} data={item} />
            ))
          )}
        </div>
      </BasicContainerWithTitleAction>
      {popupElement}
    </>
  );
}
