import { BasicButton } from "@/components/buttons";
import { PopupContainerWithTitle } from "@/components/containers";
import { BasicInput, RadioInput } from "@/components/inputs";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState } from "react";
import { createproject, editProject } from "../actions";
import { SUCCESS_EDIT_MSG, SUCCESS_MSG } from "../constant";
import { ErrorprojectCreate } from "../components";
import { Projects } from "../api";
import { get } from "@/lib/cookies";
import { AUTH_COOKIE } from "@/constant";
import { useRouter } from "next/navigation";

export const EditLayout = ({
  data,
  reset,
}: {
  data: Projects;
  reset: () => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(editProject, {
    message: "",
  });

  const user = get(AUTH_COOKIE);

  if (state.message == SUCCESS_EDIT_MSG) {
    queryClient.invalidateQueries({
      queryKey: [`specific.projects.${data.id}`],
    });
  }

  return (
    <PopupContainerWithTitle title="Edit Projects" reset={reset}>
      <form action={formAction} className="mt-5">
        <BasicInput
          type="text"
          name="name"
          label="Name"
          required={true}
          defaultValue={data.name}
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
        <RadioInput
          name="status"
          label="Status"
          data={["pending", "in-progress", "completed"]}
        />
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
          Edit
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
              <ErrorprojectCreate schema={state.message as string} />
            )
          ) : null}
        </div>
      </form>
    </PopupContainerWithTitle>
  );
};
