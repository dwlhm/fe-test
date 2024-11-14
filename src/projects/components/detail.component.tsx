"use client";

import { BasicCard } from "@/components/cards";
import { Projects } from "../api";
import Link from "next/link";

export const DetailComponent = ({ data }: { data: Projects }) => {
  return (
    <BasicCard>
      <Link href={`/projects/${data.id}`} className="basic-card-detail">
        <div className="basic-card-detail-header">
          <h3 className="capitalize">{data.name}</h3>
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
        </div>
        <div className="basic-card-detail-body">
          <p>{data.description}</p>
          <span>{`>`}</span>
        </div>
      </Link>
    </BasicCard>
  );
};
