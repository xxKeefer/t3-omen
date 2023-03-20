import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { SpacemanHead } from "../Svgs";

type Props = {
  toggleSideMenu: () => void;
};

export const Header = ({ toggleSideMenu }: Props) => {
  const { data: sessionData } = useSession();

  return (
    <header className="navbar bg-base-100">
      <div className="flex-none">
        <label
          role="button"
          htmlFor="side-menu-drawer"
          onClick={toggleSideMenu}
          className="btn-ghost btn-square btn"
        >
          <span className="sr-only">Side menu toggle</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      <div className=" flex-1">
        <Link href={"/"}>
          <button className="btn-ghost btn flex max-h-full gap-2 text-3xl font-black normal-case">
            <SpacemanHead className="w-12" />
            Omen
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <button
          className="btn-primary btn"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
};
