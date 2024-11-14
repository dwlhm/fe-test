"use client";

import { BasicCard } from "@/components/cards";
import { Tasks } from "../api";
import Link from "next/link";
import { useState } from "react";
import { ViewLayout } from "../layouts";

export const DetailComponent = ({ data }: { data: Tasks }) => {
  const [popupElement, setPopupElement] = useState(<></>);
  const reset = () => setPopupElement(<></>);
  return (
    <BasicCard>
      <div
        className="basic-card-detail"
        onClick={() =>
          setPopupElement(<ViewLayout data={data} reset={reset} />)
        }
      >
        <div className="basic-card-detail-header">
          <h3 className="capitalize">{data.title}</h3>
          <div className="flex gap-2">
            <div
              className={`${
                data.status == "pending"
                  ? `pending`
                  : data.status == "in-progress"
                  ? "in-progress"
                  : "completed"
              } status`}
            >
              {data.status}
            </div>
            <div className={`${data.priority} priority`}>{data.priority}</div>
          </div>
        </div>
        <div className="basic-card-detail-body">
          <p>{data.description}</p>
          <span>{`>`}</span>
        </div>
      </div>
      {popupElement}
    </BasicCard>
  );
};
