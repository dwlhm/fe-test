import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="p-2 w-full max-w-72">
        <h2 className="text-2xl font-semibold mb-5 ml-2 drop-shadow">Login</h2>
        {children}
      </div>
    </div>
  );
}
