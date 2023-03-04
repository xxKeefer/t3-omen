import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
  closeMenu: () => void;
};

export const SideMenu = ({ closeMenu }: Props) => {
  const { data: sessionData } = useSession();

  const role = sessionData?.user.role;

  return (
    <ul className="menu w-80 bg-base-100 p-4 text-base-content">
      {role === "admin" && (
        <>
          <li className="menu-title">
            <span>Admins Only</span>
          </li>
          <li>
            <Link href={"/admin-dashboard"}>
              <button onClick={closeMenu}>Admin Dashboard</button>
            </Link>
          </li>
          <li>
            <Link href={"/studio"}>
              <button onClick={closeMenu}>Content Studio</button>
            </Link>
          </li>
        </>
      )}
      <li className="menu-title">
        <span>Omen</span>
      </li>
      <li>
        <a>User Option</a>
      </li>
      <li className="menu-title">
        <span>Tools</span>
      </li>
      <li>
        <a>User Option</a>
      </li>
    </ul>
  );
};