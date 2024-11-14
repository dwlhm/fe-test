import {
  BasicContainerWithTitleAction,
  PopupContainerWithTitle,
} from "@/components/containers";
import { Tasks } from "../api";
import { BasicInput, RadioInput } from "@/components/inputs";
import { BasicButton } from "@/components/buttons";
import { useActionState } from "react";
import { editTasks } from "../actions";
import { useQueryClient } from "@tanstack/react-query";
import { SUCCESS_EDIT_MSG } from "../constant";
import { ErrorTasksCreateComponent } from "../components/error.tasks.create.component";

export const EditLayout = ({
  data,
  reset,
}: {
  data: Tasks;
  reset: () => void;
}) => {
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(editTasks, {
    message: "",
  });

  if (state.message == SUCCESS_EDIT_MSG) {
    queryClient.invalidateQueries({
      queryKey: ["all.tasks"],
    });
    queryClient.invalidateQueries({
      queryKey: [`specific.tasks.${data.id}`],
    });
    reset();
  }
  
  return (
    <PopupContainerWithTitle title="Edit Task" reset={reset}>
      <form action={formAction}>
        <BasicInput
          type="text"
          name="title"
          label="Title"
          required={true}
          defaultValue={data.title}
          className="bg-white"
        />
        <BasicInput
          type="text"
          name="description"
          label="Description"
          required={true}
          defaultValue={data.description}
          className="bg-white"
        />
        <BasicInput
          type="text"
          name="due_date"
          label="Due Date"
          required={true}
          defaultValue={data.due_date}
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
            name="id"
            label="ID"
            required={true}
            defaultValue={String(data.id)}
            className="bg-white hidden"
          />
          <BasicInput
            type="number"
            name="project_id"
            label="Project ID"
            required={true}
            defaultValue={String(data.project_id)}
            className="bg-white hidden"
          />
        </div>
        <BasicButton type="submit" disabled={isPending}>
          Save
        </BasicButton>
        <div
          className={
            state.message == SUCCESS_EDIT_MSG
              ? `text-green-900`
              : `text-red-900`
          }
        >
          {state.message ? (
            state.message == SUCCESS_EDIT_MSG ? (
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
