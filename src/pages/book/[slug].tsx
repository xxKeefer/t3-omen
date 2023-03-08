import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PortableText } from "@portabletext/react";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPageSlugs, getPage } from "~/sanity/requests";
import { type PageResponse } from "~/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const chapters = await getAllPageSlugs();
  const paths = chapters.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { data: [PageResponse] },
  Pick<PageResponse, "slug">
> = async (context) => {
  if (!context.params) throw new Error("No params provided");
  const data = await getPage(context.params.slug);
  return {
    props: {
      data,
    },
  };
};

const RuleBookHome: NextPage<{ data: [PageResponse] }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Omen | Rules</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.map((page) => (
        <div
          key={page._id}
          className="flex flex-col items-center gap-4 bg-base-300/60 px-48 py-8"
        >
          <h1 className="text-6xl font-black text-white">{page.chapter}</h1>
          <PortableText
            components={portableComponentsMap}
            value={page.content}
          />
        </div>
      ))}
    </>
  );
};

export default RuleBookHome;
