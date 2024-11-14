import { LinkButton } from "@/components/buttons";
import { BasicContainerWithFlexMarginTop } from "@/components/containers";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Tasks 💪",
};

export default function TasksIDLayout({ children }: { children: ReactNode }) {
  return (
    <BasicContainerWithFlexMarginTop>
      <div className="mx-auto max-w-3xl">
        <LinkButton
          className="bg-transparent !text-black !border-0 italic"
          href={"/tasks"}
        >
          {`< `}Back
        </LinkButton>
      </div>
      {children}
    </BasicContainerWithFlexMarginTop>
  );
}
