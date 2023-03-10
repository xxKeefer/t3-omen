import Link from "next/link";
import React from "react";
import { FiLink } from "react-icons/fi";

type Props = {
  href: `#${string}`;
};

export const Anchor = ({ href }: Props) => {
  return (
    <Link
      href={href}
      className=" ml-2 inline-block align-middle text-2xl [&>svg]:stroke-neutral [&>svg]:hover:stroke-primary"
    >
      <FiLink />
    </Link>
  );
};
