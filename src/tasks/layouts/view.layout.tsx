import {
  PopupContainerWithTitle,
} from "@/components/containers";
import { Tasks } from "../api";
import { BasicButton } from "@/components/buttons";
import { useState } from "react";
import { EditLayout } from "./edit.layout";
import { useTasks } from "../hooks";
import { BasicLoading } from "@/components/loadings";
import { DeleteLayout } from "./delete.layout";

export const ViewLayout = ({
  data,
  reset,
}: {
  data: Tasks;
  reset: () => void;
}) => {
  const [popupElement, setPopupElement] = useState(<></>);
  const resetViewPopup = () => setPopupElement(<></>);

  const { isLoading, data: data_task } = useTasks(data.id);

  if (isLoading) return <BasicLoading />;

  if (typeof data_task == "string") return <p>{data_task}</p>;

  if (!data_task) return <p>Data not found.</p>;

  return (
    <>
      <PopupContainerWithTitle title={data_task.title} reset={reset}>
        <div className="detail-body">
          <p className="detail-deskripsi">{data_task.description}</p>
          <div className="flex gap-2">
            <p className="detail-status">
              <span className={`${data_task.status} px-3 py-1 rounded-xl`}>
                {data_task.status}
              </span>
            </p>
            <p className="detail-priority">
              <span className={`${data_task.priority} px-3 py-1 rounded-xl`}>
                {data_task.priority}
              </span>
            </p>
          </div>
          <p className="detail-duedate">
            <span className={`px-3 py-1 rounded-xl`}>
              {new Date(data_task.due_date).toLocaleString()}
            </span>
          </p>
          <div className="flex gap-2">
            <BasicButton
              onClick={() =>
                setPopupElement(
                  <EditLayout data={data_task} reset={resetViewPopup} />
                )
              }
            >
              Edit
            </BasicButton>
            <BasicButton
              onClick={() =>
                setPopupElement(
                  <DeleteLayout data={data_task} reset={resetViewPopup} />
                )
              }
            >
              Delete
            </BasicButton>
          </div>
        </div>
      </PopupContainerWithTitle>
      {popupElement}
    </>
  );
};
