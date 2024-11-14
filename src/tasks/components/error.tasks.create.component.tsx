import { ErrorCard } from "@/components/cards";
import { ErrorCreateTasksResponse } from "../actions";

export const ErrorTasksCreateComponent = ({ schema }: { schema: string }) => {
  try {
    const error: ErrorCreateTasksResponse = JSON.parse(schema);

    return (
      <>
        {error.title.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.description.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.status.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.due_date.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.priority.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
        {error.project_id.map((item) => (
          <ErrorCard>{item}</ErrorCard>
        ))}
      </>
    );
  } catch (error) {
    return <ErrorCard>{schema}</ErrorCard>;
  }
};
