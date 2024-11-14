"use client";

import { ErrorCard } from "@/components/cards";
import { BasicContainerWithTitleAction } from "@/components/containers";
import { DetailComponent } from "@/tasks/components";
import { ReactNode, useState } from "react";
import { useAllTasks } from "@/tasks/hooks";

export default function TasksPage() {
  const { data } = useAllTasks();

  return (
    <BasicContainerWithTitleAction title="My Tasks" action={<></>}>
      <div className="flex gap-2 flex-col mt-5">
        {typeof data == "string" ? (
          <ErrorCard>{data}</ErrorCard>
        ) : (
          data?.map((item) => (
            <DetailComponent key={`tasks.${item.id}`} data={item} />
          ))
        )}
      </div>
    </BasicContainerWithTitleAction>
  );
}
