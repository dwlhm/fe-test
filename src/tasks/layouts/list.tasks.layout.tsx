import { BasicButton } from "@/components/buttons";
import { ErrorCard } from "@/components/cards";
import { BasicContainerWithTitleAction } from "@/components/containers";
import { DetailComponent } from "../components";
import { NewLayout } from "../layouts";
import { ReactNode, useState } from "react";
import { useAllTasks } from "../hooks";
import { BasicLoading } from "@/components/loadings";

export const ListTasksLayout = ({ project_id }: { project_id: number }) => {
  const [popupElement, setPopupElement] = useState<ReactNode>(<></>);
  const reset = () => setPopupElement(<></>);

  const { isLoading, data } = useAllTasks();

  return (
    <>
      <BasicContainerWithTitleAction
        className="child"
        title="Tasks"
        action={
          <BasicButton
            className="!w-[unset] btn bg-gray-800 text-sm hover:border-black hover:bg-black"
            onClick={() =>
              setPopupElement(
                <NewLayout project_id={project_id} reset={reset} />
              )
            }
          >
            New Tasks
          </BasicButton>
        }
      >
        {isLoading ? (
          <BasicLoading />
        ) : (
          <div className="flex gap-2 flex-col">
            {typeof data == "string" ? (
              <ErrorCard>{data}</ErrorCard>
            ) : (
              data
                ?.filter((item) => item.project_id == project_id)
                .map((item) => (
                  <DetailComponent key={`tasks.${item.id}`} data={item} />
                ))
            )}
          </div>
        )}
      </BasicContainerWithTitleAction>
      {popupElement}
    </>
  );
};
