import { ReactNode } from "react";

export const ErrorCard = ({ children }: { children: ReactNode }) => {
  return <p className="text-red-500">{children}</p>;
};
