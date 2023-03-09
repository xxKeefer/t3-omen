import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPageSlugs, getPage } from "~/sanity/requests";
import { type Chapter, type PageResponse } from "~/types";
import { Head } from "~/components/Layout";
import { FiLink } from "react-icons/fi";
import { Anchor } from "~/components/Buttons";

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
  { data: PageResponse },
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

const RuleBookPage: NextPage<{ data: PageResponse }> = ({ data: page }) => {
  const { seo } = page;
  return (
    <>
      <Head title={seo.title} meta={seo.meta} />
      <article
        key={page._id}
        className="items-left flex flex-col gap-4 bg-base-300/60 px-48 py-8"
      >
        {page.sections.map((section, index) => (
          <section
            key={section._key}
            className="items-left flex flex-col gap-4 py-8"
          >
            {index > 0 ? (
              <h2
                id={section.slug}
                className="relative text-5xl font-black text-white"
              >
                <Anchor href={`#${section.slug}`} />
                {section.title}
              </h2>
            ) : (
              <h1
                id={page.slug}
                className="relative text-6xl font-black text-white"
              >
                <Anchor href={`#${page.slug}`} />
                {page.sections[0]?.title}
              </h1>
            )}
            <PortableText
              components={portableComponentsMap}
              value={section.content}
            />
          </section>
        ))}
      </article>
    </>
  );
};

export default RuleBookPage;
