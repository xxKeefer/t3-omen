import React, { useState } from "react";
import { Header } from "./Header";
import { SideMenu } from "./SideMenu";

type Props = {
  children: React.ReactNode;
};

export const Shell = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return (
    <div className="drawer max-h-screen scroll-smooth">
      <input
        id="side-menu-drawer"
        title="side menu toggle"
        checked={show}
        type="checkbox"
        className="drawer-toggle"
        readOnly
      />
      <div className="drawer-content max-h-min">
        <Header toggleSideMenu={toggle} />
        <main className="h-[calc(100dvh_-_4rem)] overflow-y-auto bg-gradient-to-tl from-indigo-900 via-accent to-secondary ">
          {children}
        </main>
      </div>
      <div className="drawer-side">
        <div onClick={toggle} className="drawer-overlay" />
        <SideMenu closeMenu={() => setShow(false)} />
      </div>
    </div>
  );
};
