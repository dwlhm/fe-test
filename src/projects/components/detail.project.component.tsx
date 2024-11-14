"use client";

import { BasicLoading } from "@/components/loadings";
import { useProjects } from "../hooks";
import { ErrorCard } from "@/components/cards";
import { BasicContainerWithTitleAction } from "@/components/containers";
import { BasicButton } from "@/components/buttons";
import { ListTasksLayout } from "@/tasks/layouts";
import { ReactNode, useState } from "react";
import { EditLayout } from "../layouts/edit.layout";
import { Projects } from "../api";
import { DeleteLayout } from "../layouts";

export const DetailProjectComponent = ({ id }: { id: number }) => {
  const [popupElement, setPopupElement] = useState<ReactNode>(<></>);

  const reset = () => setPopupElement(<></>);
  const { isLoading, data, error } = useProjects(id);

  if (isLoading) return <BasicLoading />;

  if (typeof data == "string") return <ErrorCard>{data}</ErrorCard>;

  return (
    <>
      <BasicContainerWithTitleAction
        title={data?.name || "-"}
        className="detail-page"
        action={
          <div className="flex gap-2">
            <BasicButton
              className="btn-small"
              onClick={() =>
                setPopupElement(
                  <EditLayout data={data as Projects} reset={reset} />
                )
              }
            >
              Edit
            </BasicButton>
            <BasicButton
              className="btn-small bg-transparent !text-black !border-0"
              onClick={() =>
                setPopupElement(
                  <DeleteLayout data={data as Projects} reset={reset} />
                )
              }
            >
              Delete
            </BasicButton>
          </div>
        }
      >
        <div>
          <p className="detail-deskripsi">{data?.description}</p>
          <p className="detail-status">
            <span className={`${data?.status} px-3 py-1 rounded-xl`}>
              {data?.status}
            </span>
          </p>
        </div>
        <ListTasksLayout project_id={id} />
      </BasicContainerWithTitleAction>
      {popupElement}
    </>
  );
};
