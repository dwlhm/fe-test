import { BasicButton } from "@/components/buttons";
import { PopupContainerWithTitle } from "@/components/containers";
import { BasicInput } from "@/components/inputs";
import { useActionState } from "react";
import { Tasks } from "../api";
import { deleteTasks } from "../actions";
import { SUCCESS_DELETE_MSG } from "../constant";
import { redirect } from "next/navigation";
import { ErrorTasksCreateComponent } from "../components/error.tasks.create.component";
import { useQueryClient } from "@tanstack/react-query";

export const DeleteLayout = ({
  data,
  reset,
}: {
  data: Tasks;
  reset: () => void;
}) => {
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(deleteTasks, {
    message: "",
  });

  if (state.message == SUCCESS_DELETE_MSG) {
    queryClient.invalidateQueries({
      queryKey: [`all.tasks`],
    });
    redirect(`/tasks/${data.project_id}`);
  }

  return (
    <PopupContainerWithTitle title="Delete Projects" reset={reset}>
      <form action={formAction} className="mt-5">
        <p>Are you sure to delete this task?</p>
        <div className="flex gap-2">
          <div style={{ display: "none" }}>
            <BasicInput
              type="number"
              name="id"
              label="ID"
              required={true}
              defaultValue={String(data.id)}
              className="bg-white"
            />
          </div>
          <BasicButton type="submit" disabled={isPending}>
            Sure
          </BasicButton>
          <BasicButton onClick={() => reset()}>Cancel</BasicButton>
        </div>
        <div
          className={
            state.message == SUCCESS_DELETE_MSG
              ? `text-green-900`
              : `text-red-900`
          }
        >
          {state.message ? (
            state.message == SUCCESS_DELETE_MSG ? (
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
