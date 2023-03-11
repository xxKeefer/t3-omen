import { default as NextHead } from "next/head";
import React from "react";
import type { SEO } from "~/types";

type Props = {
  robots?: "index" | "noindex" | "follow" | "nofollow";
} & Partial<SEO>;

export const Head = ({
  meta = "Omen: A story driven table top RPG",
  title = "Omen",
  robots,
}: Props) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={meta} />
      {robots && <meta name="robots" content={robots} />}
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
