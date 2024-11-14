"use client";

import { BasicButton } from "@/components/buttons";
import { BasicInput } from "@/components/inputs";
import { register } from "@/register/actions";
import { ErrorRegister } from "@/register/components/error.register";
import {
  EMAIL_INPUT,
  NAME_INPUT,
  PASSWORD_CONFIRMATION_INPUT,
  PASSWORD_INPUT,
  REGISTRATION_SUCCESS_MESSAGE,
} from "@/register/constant";
import Link from "next/link";
import { useActionState } from "react";

export default function Register() {
  const [state, formAction] = useActionState(register, {
    message: "",
  });

  return (
    <form action={formAction}>
      <BasicInput type="text" name={NAME_INPUT} label="Name" required={true} />
      <BasicInput
        type="email"
        name={EMAIL_INPUT}
        label="Email"
        required={true}
      />
      <BasicInput
        type="password"
        name={PASSWORD_INPUT}
        label="Password"
        required={true}
      />
      <BasicInput
        type="password"
        name={PASSWORD_CONFIRMATION_INPUT}
        label="Password"
        required={true}
      />
      <BasicButton type="submit">Register</BasicButton>
      <p>
        Have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
        .
      </p>
      <div
        className={
          state.message == REGISTRATION_SUCCESS_MESSAGE
            ? `text-green-900`
            : `text-red-900`
        }
      >
        {state.message ? (
          state.message == REGISTRATION_SUCCESS_MESSAGE ? (
            (state?.message as string)
          ) : (
            <ErrorRegister schema={state.message as string} />
          )
        ) : null}
      </div>
    </form>
  );
}
