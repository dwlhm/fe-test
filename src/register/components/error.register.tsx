import { ErrorCard } from "@/components/cards/error.card";
import { RegisterErrorResponse } from "../actions";

export const ErrorRegister = ({ schema }: { schema: string }) => {
  const error: RegisterErrorResponse = JSON.parse(schema);

  return (
    <>
      {error.email.map((item) => (
        <ErrorCard>{item}</ErrorCard>
      ))}
      {error.password.map((item) => (
        <ErrorCard>{item}</ErrorCard>
      ))}
    </>
  );
};
