import Link from "next/link";
import { ReactNode } from "react";

export const LinkButton = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`${className} transition bg-black border-2 border-black hover:border-blue-500 text-white w-full my-5 px-3 py-2 rounded-xl`}
    >
      {children}
    </Link>
  );
};
