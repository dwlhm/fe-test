"use client";

import { ReactNode } from "react";
import { BasicButton } from "../buttons";

export const PopupContainerWithTitle = ({
  reset,
  title,
  children,
}: {
  title: string;
  children: ReactNode;
  reset: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col backdrop-blur">
      <div className="w-full overflow-auto max-w-96 rounded-xl bg-gray-100 p-5 max-h-[90vh]">
        <div className="flex justify-between w-full">
          <h3 className="text-lg font-semibold">{title}</h3>
          <BasicButton
            className="!w-6 h-6 !p-0 !m-0 flex items-center justify-center hover:border-red-900 hover:bg-red-900 text-sm rounded-lg"
            onClick={() => reset()}
          >
            X
          </BasicButton>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
