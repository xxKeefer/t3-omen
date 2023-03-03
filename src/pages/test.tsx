import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { DocumentsCount, query } from "~/components/sanity/DocumentsCount";
import { client } from "~/utils/sanity.client";

const PreviewDocumentsCount = lazy(
  () => import("~/components/sanity/PreviewDocumentsCount")
);

export const getStaticProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  const data: unknown = await client.fetch(query);

  return { props: { preview, data } };
};

export default function IndexPage({
  preview,
  data,
}: {
  preview: boolean;
  data: number;
}) {
  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewDocumentsCount />
      </PreviewSuspense>
    );
  }

  return <DocumentsCount data={data} />;
}
