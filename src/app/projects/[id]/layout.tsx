import { LinkButton } from "@/components/buttons";
import { BasicContainerWithFlexMarginTop } from "@/components/containers";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Projects 💪",
};

export default function ProjectIDLayout({ children }: { children: ReactNode }) {
  return (
    <BasicContainerWithFlexMarginTop>
      <div className="mx-auto max-w-3xl">
        <LinkButton
          className="bg-transparent !text-black !border-0 italic"
          href={"/projects"}
        >
          {`< `}Back
        </LinkButton>
      </div>
      {children}
    </BasicContainerWithFlexMarginTop>
  );
}
