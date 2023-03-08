import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PortableText } from "@portabletext/react";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPageSlugs, getPage } from "~/sanity/requests";
import { type Chapter, type PageResponse } from "~/types";

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
  Pick<Chapter, "slug">
> = async (context) => {
  if (!context.params) throw new Error("No params provided");
  const data = await getPage(context.params.slug);
  return {
    props: {
      data,
    },
  };
};

const RuleBookPage: NextPage<{ data: PageResponse }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Omen | Rules</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.map((page) => (
        <article
          key={page._id}
          className="items-left flex flex-col gap-4 bg-base-300/60 px-48 py-8"
        >
          <h1 className="text-6xl font-black text-white">
            {page.sections[0]?.title}
          </h1>
          {page.sections.map((section, index) => (
            <section
              key={section._key}
              className="items-left flex flex-col gap-4 py-8"
            >
              {index > 0 && (
                <h2 className="text-5xl font-black text-white">
                  {section.title}
                </h2>
              )}
              <PortableText
                components={portableComponentsMap}
                value={section.content}
              />
            </section>
          ))}
        </article>
      ))}
    </>
  );
};

export default RuleBookPage;
