"use client";

import { usePreview } from "~/utils/sanity.preview";
import { query, DocumentsCount } from "~/components/sanity/DocumentsCount";

export default function PreviewDocumentsCount() {
  const data = usePreview(null, query) as number;
  return <DocumentsCount data={data} />;
}
