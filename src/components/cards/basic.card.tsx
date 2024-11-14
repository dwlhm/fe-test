import { ReactNode } from "react";

export const BasicCard = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={`${className} rounded-xl p-5 shadow-sm bg-gray-100/30 hover:bg-gray-100/60 transition`}>{children}</div>;
};
