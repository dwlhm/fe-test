import { ErrorCard } from "@/components/cards";
import { ErrorCreateTasksResponse } from "../actions";

export const ErrorTasksCreateComponent = ({ schema }: { schema: string }) => {
  try {
    const error: ErrorCreateTasksResponse = JSON.parse(schema);

    return (
      <>
        {error.title.map((item, index) => (
          <ErrorCard key={`te.${index}`}>{item}</ErrorCard>
        ))}
        {error.description.map((item, index) => (
          <ErrorCard key={`de.${index}`}>{item}</ErrorCard>
        ))}
        {error.status.map((item, index) => (
          <ErrorCard key={`se.${index}`}>{item}</ErrorCard>
        ))}
        {error.due_date.map((item, index) => (
          <ErrorCard key={`dde.${index}`}>{item}</ErrorCard>
        ))}
        {error.priority.map((item, index) => (
          <ErrorCard key={`pe.${index}`}>{item}</ErrorCard>
        ))}
        {error.project_id.map((item, index) => (
          <ErrorCard key={`pie.${index}`}>{item}</ErrorCard>
        ))}
      </>
    );
  } catch (_) {
    return <ErrorCard>{schema}</ErrorCard>;
  }
};
