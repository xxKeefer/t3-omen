import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";

import config from "../../../sanity.config";

export default function StudioPage() {
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <div className="w-full overflow-y-hidden [&>*]:w-full">
        <NextStudio config={config} />
      </div>
    </>
  );
}
