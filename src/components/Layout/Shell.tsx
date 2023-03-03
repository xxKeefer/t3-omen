import Link from "next/link";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const Shell = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return (
    <div className="drawer max-h-screen">
      <input
        id="side-menu-drawer"
        title="side menu toggle"
        checked={show}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content max-h-min">
        <header className="navbar bg-base-100">
          <div className="flex-none">
            <label
              role="button"
              htmlFor="side-menu-drawer"
              onClick={toggle}
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
          <div className="flex-1">
            <Link href={"/"}>
              <button className="btn-ghost btn text-xl normal-case">
                Omen
              </button>
            </Link>
          </div>
        </header>
        <main className="flex h-[calc(100dvh_-_4rem)] flex-col items-center justify-center bg-gradient-to-tl from-neutral via-accent to-secondary">
          {children}
        </main>
      </div>
      <div className="drawer-side">
        <div onClick={toggle} className="drawer-overlay" />
        <ul className="menu w-80 bg-base-100 p-4 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
