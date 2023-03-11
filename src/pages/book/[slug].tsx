import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPageSlugs, getPage } from "~/sanity/requests";
import { type Chapter } from "~/types";
import { Head } from "~/components/Layout";

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
  { data: Chapter },
  Pick<Chapter, "slug">
> = async (context) => {
  if (!context.params) throw new Error("No params provided");
  const page = await getPage(context.params.slug);
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
      <article
        key={page._id}
        className="items-left flex flex-col gap-2 bg-base-300/60 px-8 sm:gap-4 sm:px-16 sm:py-4 md:px-48 lg:px-64 lg:py-8"
      >
        {page.sections.map((section) => {
          return (
            <section
              key={section._key}
              className="items-left flex flex-col gap-2 py-4 sm:gap-4 sm:py-4"
            >
              <PortableText
                components={portableComponentsMap(`#${section.slug}`)}
                value={section.content}
              />
            </section>
          );
        })}
      </article>
    </>
  );
};

export default RuleBookPage;
