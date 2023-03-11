import { PortableText } from "@portabletext/react";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { FiLink } from "react-icons/fi";
import { Head } from "~/components/Layout";
import { portableComponentsMap } from "~/components/sanity/PortableText";
import { getAllPatchNotes } from "~/sanity/requests";
import { type AllPatchNotesResponse } from "~/types";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPatchNotes();
  return {
    props: {
      data,
    },
  };
};

const PatchNotesHome: NextPage<{ data: AllPatchNotesResponse }> = ({
  data,
}) => {
  const [latest, ...previous] = data;
  return (
    <>
      <Head title="Patch Notes" meta="Latest changes to the Omen RPG Ruleset" />
      <div className="flex flex-wrap gap-2 p-4 sm:p-8">
        {latest && (
          <div
            tabIndex={0}
            className="collapse-arrow rounded-box collapse border border-base-300 bg-base-100"
          >
            <h2 className="collapse-title flex flex-wrap items-center justify-between gap-2 text-2xl font-bold">
              {latest.title}
              <span className="flex items-center justify-end gap-2">
                <span className="badge badge-lg ">
                  version {latest.versionNumber}
                </span>
                <Link href={`/patch/${latest.slug}`}>
                  <button className="btn-square btn-xs btn">
                    <FiLink />
                  </button>
                </Link>
              </span>
            </h2>
            <div className="collapse-content flex flex-col gap-4">
              <PortableText
                components={portableComponentsMap()}
                value={latest.content}
              />
            </div>
          </div>
        )}
        {previous.map((patch) => (
          <div
            key={patch.slug}
            className="rounded-box w-full border border-base-300 bg-base-100 p-4"
          >
            <h2 className="flex flex-wrap items-center justify-between gap-2 text-2xl font-bold">
              {patch.title}
              <div className="flex items-center gap-2 pr-8">
                <span className="badge badge-lg ">
                  version {patch.versionNumber}
                </span>
                <Link href={`/patch/${patch.slug}`}>
                  <button className="btn-square btn-xs btn">
                    <FiLink />
                  </button>
                </Link>
              </div>
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default PatchNotesHome;
