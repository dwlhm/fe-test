import { BasicButton } from "@/components/buttons";
import { PopupContainerWithTitle } from "@/components/containers";
import { BasicInput, RadioInput } from "@/components/inputs";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState } from "react";
import { createproject } from "../actions";
import { SUCCESS_MSG } from "../constant";
import { ErrorprojectCreate } from "../components";

export const NewLayout = ({ reset }: { reset: () => void }) => {
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(createproject, {
    message: "",
  });

  if (state.message == SUCCESS_MSG)
    queryClient.invalidateQueries({
      queryKey: ["all.projects"],
    });
  return (
    <PopupContainerWithTitle title="New Projects" reset={reset}>
      <form action={formAction} className="mt-5">
        <BasicInput
          type="text"
          name="name"
          label="Name"
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
        <RadioInput
          name="status"
          label="Status"
          data={["pending", "in-progress", "completed"]}
        />
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
              <ErrorprojectCreate schema={state.message as string} />
            )
          ) : null}
        </div>
      </form>
    </PopupContainerWithTitle>
  );
};
