import { PROJECT_API_URL, TOKEN_COOKIE } from "@/constant";
import { get } from "@/lib/cookies";
import { QueryFunctionContext } from "@tanstack/react-query";

export type Projects = {
  id: number;
  name: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  user_id: number;
  created_at: string;
  updated_at: string;
};

export const getAllProjects = async () => {
  const token = get(TOKEN_COOKIE);

  const response = await fetch(PROJECT_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Projects[] | string = await response.json();
  return data;
};

export const getProjects = async (ctx: QueryFunctionContext) => {
  const token = get(TOKEN_COOKIE);

  const response = await fetch(`${PROJECT_API_URL}/${ctx.queryKey[1]}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Projects | string = await response.json();
  return data;
};
