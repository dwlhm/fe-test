import { ErrorCard } from "@/components/cards/error.card";
import { ErrorCreateProjectResponse } from "../actions";

export const ErrorprojectCreate = ({ schema }: { schema: string }) => {
  try {
    const error: ErrorCreateProjectResponse = JSON.parse(schema);

    return (
      <>
        {error.name.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.description.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.status.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
      </>
    );
  } catch (error) {
    return <ErrorCard>System Error.</ErrorCard>;
  }
};
