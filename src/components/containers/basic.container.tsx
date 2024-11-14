import { ReactNode } from "react";

export const BasicContainerWithFlexMarginTop = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="mt-16 w-full">{children}</div>;
};

export const BasicContainerWithTitleAction = ({
  title,
  children,
  action,
  className = "",
}: {
  title: string;
  children: ReactNode;
  action: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} mx-auto max-w-3xl`}>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-semibold capitalize">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
};
