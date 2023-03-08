import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getAllPageSlugs } from "~/sanity/requests";
import { type AllPageSlugsResponse } from "~/types";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPageSlugs();
  return {
    props: {
      data,
    },
  };
};

const RuleBookHome: NextPage<{ data: AllPageSlugsResponse }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Omen | Rules</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.map(({ slug, chapter }) => (
        <p key={slug}>{chapter}</p>
      ))}
    </>
  );
};

export default RuleBookHome;
