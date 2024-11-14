"use client";

import { MouseEventHandler, ReactNode } from "react";

export const BasicButton = ({
  className = "",
  type = "button",
  disabled = false,
  children,
  onClick = () => {},
}: {
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  return (
    <button
      className={`${className} transition bg-black border-2 border-black hover:border-blue-500 text-white w-full my-5 px-3 py-2 rounded-xl`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
