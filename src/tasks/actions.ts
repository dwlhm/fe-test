"use server";

import { z } from "zod";
import { SUCCESS_DELETE_MSG, SUCCESS_EDIT_MSG, SUCCESS_MSG } from "./constant";
import { cookies } from "next/headers";
import { TASKS_API_URL, TOKEN_COOKIE } from "@/constant";

export type CreateProjectResponse = {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ErrorCreateTasksResponse = {
  title: string[];
  description: string[];
  status: string[];
  due_date: string[];
  priority: string[];
  project_id: string[];
};

export async function createTasks(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const cookie = (await cookies()).get(TOKEN_COOKIE);

  const schema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    due_date: z.string(),
    priority: z.string(),
    project_id: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    due_date: formData.get("due_date"),
    priority: formData.get("priority"),
    project_id: formData.get("project_id"),
  });

  if (parse.error) return { message: parse.error };

  try {
    const response = await fetch(TASKS_API_URL, {
      method: "POST",
      body: JSON.stringify(parse.data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie?.value.replaceAll('"', "")}`,
      },
    });
    const data = await response.json();

    return {
      message: data["id"] ? SUCCESS_MSG : data,
    };
  } catch (error) {
    return { message: error };
  }
}

export async function editTasks(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const cookie = (await cookies()).get(TOKEN_COOKIE);

  const schema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    due_date: z.string(),
    priority: z.string(),
    project_id: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    due_date: formData.get("due_date"),
    priority: formData.get("priority"),
    project_id: formData.get("project_id"),
  });

  if (parse.error) return { message: parse.error };

  try {
    const response = await fetch(`${TASKS_API_URL}/${formData.get("id")}`, {
      method: "PUT",
      body: JSON.stringify(parse.data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie?.value.replaceAll('"', "")}`,
      },
    });
    const data = await response.json();

    return {
      message: data["id"] ? SUCCESS_EDIT_MSG : data,
    };
  } catch (error) {
    return { message: error };
  }
}

export async function deleteTasks(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const cookie = (await cookies()).get(TOKEN_COOKIE);

  try {
    const response = await fetch(`${TASKS_API_URL}/${formData.get("id")}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie?.value.replaceAll('"', "")}`,
      },
    });
    const data = await response.json();

    return {
      message: data["id"] ? SUCCESS_DELETE_MSG : data,
    };
  } catch (error) {
    return { message: error };
  }
}