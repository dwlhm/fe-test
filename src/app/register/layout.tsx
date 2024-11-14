import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="p-2 w-full max-w-72">
        <h2 className="text-2xl font-semibold mb-5 ml-2 drop-shadow">Register</h2>
        {children}
      </div>
    </div>
  );
}
