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
      className="absolute -left-8 top-1/4 text-xl [&>svg]:stroke-neutral [&>svg]:hover:stroke-primary"
    >
      <FiLink />
    </Link>
  );
};
