import { ErrorCard } from "@/components/cards/error.card";
import { ErrorCreateProjectResponse } from "../actions";

export const ErrorprojectCreate = ({ schema }: { schema: string }) => {
  try {
    const error: ErrorCreateProjectResponse = JSON.parse(schema);

    return (
      <>
        {error.name.map((item, index) => (
          <ErrorCard key={`ne.${index}`}>{item}</ErrorCard>
        ))}
        {error.description.map((item, index) => (
          <ErrorCard key={`de.${index}`}>{item}</ErrorCard>
        ))}
        {error.status.map((item, index) => (
          <ErrorCard key={`se.${index}`}>{item}</ErrorCard>
        ))}
      </>
    );
  } catch (_) {
    return <ErrorCard>System Error.</ErrorCard>;
  }
};
