import { BasicButton } from "@/components/buttons";
import { PopupContainerWithTitle } from "@/components/containers";
import { BasicInput, RadioInput } from "@/components/inputs";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState } from "react";
import { createTasks } from "../actions";
import { SUCCESS_MSG } from "../constant";
import { ErrorTasksCreateComponent } from "../components/error.tasks.create.component";

export const NewLayout = ({
  project_id,
  reset,
}: {
  project_id: number;
  reset: () => void;
}) => {
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(createTasks, {
    message: "",
  });

  if (state.message == SUCCESS_MSG)
    queryClient.invalidateQueries({
      queryKey: ["all.tasks"],
    });
  return (
    <PopupContainerWithTitle title="New Projects" reset={reset}>
      <form action={formAction} className="mt-5">
        <BasicInput
          type="text"
          name="title"
          label="Title"
          required={true}
          className="bg-white"
        />
        <BasicInput
          type="text"
          name="description"
          label="Description"
          required={true}
          className="bg-white"
        />
        <BasicInput
          type="text"
          name="due_date"
          label="Due Date"
          required={true}
          defaultValue={new Date().toISOString()}
          className="bg-white"
        />
        <RadioInput
          name="status"
          label="Status"
          data={["pending", "in-progress", "completed"]}
        />
        <RadioInput
          name="priority"
          label="Priority"
          data={["low", "medium", "high"]}
        />
        <div style={{ display: "none" }}>
          <BasicInput
            type="number"
            name="project_id"
            label="Project ID"
            required={true}
            defaultValue={String(project_id)}
            className="bg-white hidden"
          />
        </div>
        <BasicButton type="submit" disabled={isPending}>
          Create
        </BasicButton>
        <div
          className={
            state.message == SUCCESS_MSG ? `text-green-900` : `text-red-900`
          }
        >
          {state.message ? (
            state.message == SUCCESS_MSG ? (
              (state?.message as string)
            ) : (
              <ErrorTasksCreateComponent schema={state.message as string} />
            )
          ) : null}
        </div>
      </form>
    </PopupContainerWithTitle>
  );
};
