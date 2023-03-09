import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getAllChapterLinks } from "~/sanity/requests";
import { type AllChapterLinksResponse } from "~/types";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllChapterLinks();
  return {
    props: {
      data,
    },
  };
};

const RuleBookHome: NextPage<{ data: AllChapterLinksResponse }> = ({
  data,
}) => {
  return (
    <>
      <Head>
        <title>Omen | Rules</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap gap-2 p-8">
        {data.map(({ slug, chapter, sections, _id }) => (
          <div
            key={_id}
            className="rounded-box flex w-1/3 flex-col gap-4 bg-base-100 px-8 py-4"
          >
            <Link
              href={`/book/${slug}`}
              className="text-neutral hover:text-primary"
            >
              <h2 className="text-4xl font-bold">{chapter}</h2>
            </Link>
            <ul className="menu pl-4">
              {sections.map(({ title, slug: anchor }) => (
                <li key={anchor}>
                  <Link
                    href={`/book/${slug}#${anchor}`}
                    className="text-neutral hover:text-secondary"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default RuleBookHome;
