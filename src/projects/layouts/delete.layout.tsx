import { BasicButton } from "@/components/buttons";
import { PopupContainerWithTitle } from "@/components/containers";
import { BasicInput } from "@/components/inputs";
import { useActionState } from "react";
import { deleteProject } from "../actions";
import { SUCCESS_DELETE_MSG } from "../constant";
import { ErrorprojectCreate } from "../components";
import { redirect } from "next/navigation";
import { Projects } from "../api";

export const DeleteLayout = ({
  data,
  reset,
}: {
  data: Projects;
  reset: () => void;
}) => {
  
  const [state, formAction, isPending] = useActionState(deleteProject, {
    message: "",
  });

  if (state.message == SUCCESS_DELETE_MSG) redirect("/projects");

  return (
    <PopupContainerWithTitle title="Delete Projects" reset={reset}>
      <form action={formAction} className="mt-5">
        <p>Are you sure to delete this poroject?</p>
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
              <ErrorprojectCreate schema={state.message as string} />
            )
          ) : null}
        </div>
      </form>
    </PopupContainerWithTitle>
  );
};
