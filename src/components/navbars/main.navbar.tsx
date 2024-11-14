"use client";

import { LoginResponse, logout } from "@/login/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useState } from "react";

export const MainNavbar = ({ auth }: { auth: LoginResponse }) => {
  const path = usePathname();
  const isProjects = path.includes("projects");
  const isTasks = path.includes("tasks");

  const [_, formAction] = useActionState(logout, {
    message: "",
  });

  const [popup, setPopup] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between py-2 px-5">
      <h1 className="font-semibold drop-shadow">Profi</h1>
      <nav className="text-blue-500 italic">
        <Link href="/projects" className={isProjects ? `text-black` : ``}>
          Projects
        </Link>
        <span className="mx-1 text-black">/</span>
        <Link href="/tasks" className={isTasks ? `text-black` : ``}>
          Tasks
        </Link>
      </nav>
      <div className="relative">
        <>
          <button
            className="flex items-center hover:bg-black/30 px-2 rounded-xl"
            onClick={() => setPopup((prev) => !prev)}
          >
            {auth.user.name}{" "}
            <span className="text-lg ml-2 mb-[-1rem]">&#129171;</span>
          </button>
          {popup ? (
            <form action={formAction}>
              <button
                className="absolute top-10 right-0 bg-black text-white px-5 py-1 rounded-xl hover:bg-black/80 transition"
                type="submit"
              >
                Logout
              </button>
            </form>
          ) : (
            <></>
          )}
        </>
      </div>
    </nav>
  );
};
