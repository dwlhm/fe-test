"use server";

import { AUTH_COOKIE, TOKEN_COOKIE } from "@/constant";
import { constant as constantLogin } from "@/login/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
};

export async function login(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (parse.error)
    return { message: constantLogin.INVALID_EMAIL_PASSWORD_MESSAGE };

  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(parse.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: LoginResponse = await response.json();

    (await cookies()).set(AUTH_COOKIE, JSON.stringify(data));
    (await cookies()).set(TOKEN_COOKIE, JSON.stringify(data.token));

    return {
      message: data.token
        ? constantLogin.SUCCESS_MESSAGE
        : constantLogin.INVALID_EMAIL_PASSWORD_MESSAGE,
    };
  } catch (error) {
    return { message: error };
  }
}

export async function logout(
  _: {
    message: unknown;
  },
  __: FormData
) {
  const cookie = await cookies();
  cookie.delete(AUTH_COOKIE);
  cookie.delete(TOKEN_COOKIE);

  redirect("/login");

  return { message: "OK" };
}
