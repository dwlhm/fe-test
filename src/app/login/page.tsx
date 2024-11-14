"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "../../login/actions";
import { redirect } from "next/navigation";
import { constant } from "@/login/constant";
import { BasicButton } from "@/components/buttons";
import { BasicInput } from "@/components/inputs";

export default function Login() {
  const [state, formAction] = useActionState(login, { message: "" });

  if (state.message == constant.SUCCESS_MESSAGE) {
    redirect("/");
  }
  return (
    <form action={formAction}>
      <BasicInput type="email" name="email" label="Email" required={true} />
      <BasicInput
        type="password"
        name="password"
        label="Password"
        required={true}
      />
      <BasicButton type="submit">Login</BasicButton>
      <p>
        Doesn't have an account? 
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
        .
      </p>
      <div
        className={
          state.message == constant.SUCCESS_MESSAGE
            ? `text-green-900`
            : `text-red-900`
        }
      >
        {state?.message as string}
      </div>
    </form>
  );
}
