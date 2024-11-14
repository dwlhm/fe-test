"use server";

import { z } from "zod";
import { SUCCESS_DELETE_MSG, SUCCESS_EDIT_MSG, SUCCESS_MSG } from "./constant";
import { cookies } from "next/headers";
import { AUTH_COOKIE, PROJECT_API_URL, TOKEN_COOKIE } from "@/constant";
import { LoginResponse } from "@/login/actions";

export type CreateProjectResponse = {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ErrorCreateProjectResponse = {
  name: string[];
  description: string[];
  status: string[];
};

export async function createproject(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const cookie = (await cookies()).get(TOKEN_COOKIE);

  const schema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
  });

  const parse = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
  });

  if (parse.error) return { message: parse.error };

  try {
    const response = await fetch(PROJECT_API_URL, {
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

export async function editProject(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const cookie = (await cookies()).get(TOKEN_COOKIE);

  const cookie_auth = (await cookies()).get(AUTH_COOKIE);
  const auth: LoginResponse = !cookie_auth
    ? undefined
    : JSON.parse(cookie_auth?.value as string);

  const schema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    user_id: z.number(),
  });

  const parse = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
    user_id: auth.user.id,
  });

  console.log(parse.data)

  if (parse.error) return { message: parse.error };

  try {
    const response = await fetch(`${PROJECT_API_URL}/${formData.get("id")}`, {
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


export async function deleteProject(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const cookie = (await cookies()).get(TOKEN_COOKIE);

  try {
    const response = await fetch(`${PROJECT_API_URL}/${formData.get("id")}`, {
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
