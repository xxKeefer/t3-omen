import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { env } from "~/env.mjs";
import { pageSchema, sectionSchema } from "~/sanity/schemas";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  basePath: "/studio", // <-- important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`

  projectId,
  dataset,

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [deskTool(), visionTool()],

  // https://www.sanity.io/docs/create-a-schema-and-configure-sanity-studio

  schema: {
    types: [pageSchema, sectionSchema],
  },
});
