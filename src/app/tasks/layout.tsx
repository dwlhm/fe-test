import { BasicContainerWithFlexMarginTop } from "@/components/containers";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Projects 💪",
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <BasicContainerWithFlexMarginTop>
      {children}
    </BasicContainerWithFlexMarginTop>
  );
}
