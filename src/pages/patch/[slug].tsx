import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPatchNotes, getPatchNotes } from "~/sanity/requests";
import { type PatchNotes } from "~/types";
import { Head } from "~/components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const patches = await getAllPatchNotes();
  const paths = patches.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { data: PatchNotes },
  Pick<PatchNotes, "slug">
> = async (context) => {
  if (!context.params) throw new Error("No params provided");
  const patch = await getPatchNotes(context.params.slug);
  return {
    props: {
      data: patch,
    },
  };
};

const PatchNotesPage: NextPage<{ data: PatchNotes }> = ({ data: patch }) => {
  return (
    <>
      <Head
        title={`Omen | v${patch.versionNumber} Notes`}
        meta={`A description of the changes to the rules of Omen in version ${patch.versionNumber}`}
      />
      <article className="items-left flex flex-col gap-2 bg-base-300/60 px-8 sm:gap-4 sm:px-16 sm:py-4 md:px-48 lg:px-64 lg:py-8">
        <h1 className="mb-8 text-7xl font-black text-white">
          {patch.versionNumber} {patch.title}
        </h1>
        {/* TODO: Add a componentMap per page type, don't need anchors for this one */}
        <PortableText
          components={portableComponentsMap()}
          value={patch.content}
          onMissingComponent={false}
        />
      </article>
    </>
  );
};

export default PatchNotesPage;
