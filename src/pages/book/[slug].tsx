import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPageSlugs, getPage } from "~/sanity/requests";
import { type Chapter } from "~/types";
import { Head } from "~/components/Layout";
import Link from "next/link";

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
  { data: Chapter | null },
  Pick<Chapter, "slug">
> = async (context) => {
  if (!context.params) throw new Error("No params provided");
  const page = await getPage(context.params.slug);
  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: page,
    },
  };
};

const RuleBookPage: NextPage<{ data: Chapter }> = ({ data: page }) => {
  const { seo } = page;
  return (
    <>
      <Head title={seo.title} meta={seo.meta} />
      <div className="flex bg-base-300/60">
        <aside className="sticky top-0 hidden flex-grow self-start p-4 md:block md:pr-0 lg:min-w-max">
          <nav className="rounded-box flex flex-col bg-base-100 p-4 landscape:h-[calc(100dvh_-_6rem)]">
            <h3 className="text-xl font-black">On this page:</h3>
            <ul className="menu flex-nowrap overflow-y-auto">
              {page.sections.map(({ slug, title }) => (
                <li key={slug}>
                  <Link
                    href={`#${slug}`}
                    className="text-neutral hover:text-secondary focus:font-bold focus:text-secondary"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article
          key={page._id}
          className="items-left flex flex-shrink flex-col gap-2 px-4 sm:gap-4 md:px-8 lg:px-16"
        >
          {page.sections.map((section) => {
            return (
              <section
                key={section._key}
                id={section.slug}
                className="items-left flex flex-col gap-2 py-4 sm:gap-4"
              >
                <PortableText
                  components={portableComponentsMap(`#${section.slug}`)}
                  value={section.content}
                />
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
};

export default RuleBookPage;
