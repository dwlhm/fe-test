import { TASKS_API_URL, TOKEN_COOKIE } from "@/constant";
import { get } from "@/lib/cookies";
import { QueryFunctionContext } from "@tanstack/react-query";

export type Tasks = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  due_date: string;
  priority: "low" | "medium" | "high";
  project_id: number;
};

export const getAllTasks = async () => {
  const token = get(TOKEN_COOKIE);

  const response = await fetch(TASKS_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Tasks[] | string = await response.json();
  return data;
};

export const getTasks = async (ctx: QueryFunctionContext) => {
  const token = get(TOKEN_COOKIE);

  const response = await fetch(`${TASKS_API_URL}/${ctx.queryKey[1]}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Tasks | string = await response.json();
  return data;
};
