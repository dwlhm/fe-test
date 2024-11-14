"use server";

import { z } from "zod";
import {
  EMAIL_INPUT,
  NAME_INPUT,
  PASSWORD_CONFIRMATION_INPUT,
  PASSWORD_INPUT,
  REGISTRATION_SUCCESS_MESSAGE,
} from "./constant";

export type RegisterResponse = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type RegisterErrorResponse = {
  email: string[];
  password: string[];
};

export async function register(
  prevState: {
    message: unknown;
  },
  formData: FormData
) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  });

  const parse = schema.safeParse({
    name: formData.get(NAME_INPUT),
    email: formData.get(EMAIL_INPUT),
    password: formData.get(PASSWORD_INPUT),
    password_confirmation: formData.get(PASSWORD_CONFIRMATION_INPUT),
  });

  if (parse.error)
    return {
      message: parse.error,
    };

  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(parse.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: RegisterResponse = await response.json();

    return {
      message: data.id ? REGISTRATION_SUCCESS_MESSAGE : JSON.stringify(data),
    };
  } catch (error) {
    return { message: error };
  }
}
