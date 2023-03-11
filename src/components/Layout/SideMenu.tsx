import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

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
        <Link href={"/book"}>
          <button onClick={closeMenu}>Guide Book</button>
        </Link>
      </li>
      <li>
        <Link href={"/patch"}>
          <button onClick={closeMenu}>Patch Notes</button>
        </Link>
      </li>

      <li className="menu-title">
        <span>Tools</span>
      </li>
      <li>
        <a
          href="https://bulkimagecrop.com/"
          target="_blank"
          rel="noopener"
          className="gap-4"
        >
          Bulk Image Crop
          <FiExternalLink />
        </a>
      </li>
      <li>
        <a
          href="https://rolladvantage.com/tokenstamp/"
          target="_blank"
          rel="noopener"
          className="gap-4"
        >
          Token Stamper
          <FiExternalLink />
        </a>
      </li>
    </ul>
  );
};
