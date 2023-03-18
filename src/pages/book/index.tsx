import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Head } from "~/components/Layout";
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
      <Head title="Omen | Rules" meta="Omen: A story driven table top RPG" />
      <div className="flex flex-wrap gap-2 p-4 sm:p-8">
        {data.map(({ slug, chapter, sections, _id }) => (
          <div
            key={_id}
            className="rounded-box flex w-full flex-col gap-4 bg-base-100 px-8 py-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <Link
              href={`/book/${slug}`}
              className="text-neutral hover:text-primary"
            >
              <h2 className="text-4xl font-bold">{chapter}</h2>
            </Link>
            <ul className="menu ">
              {sections.map(({ title, slug: anchor }, index) => {
                if (index > 0)
                  return (
                    <li key={anchor} className="pl-2 sm:pl-4">
                      <Link
                        href={`/book/${slug}#${anchor}`}
                        className="text-neutral hover:text-secondary"
                      >
                        {title}
                      </Link>
                    </li>
                  );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default RuleBookHome;
