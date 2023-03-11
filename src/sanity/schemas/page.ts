import { defineType, defineField } from "sanity";
import { slugField, seoFields } from "./partials";

export const pageSchema = defineType({
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    defineField({
      title: "Chapter",
      name: "chapter",
      type: "string",
    }),
    slugField("chapter"),
    seoFields,

    defineField({
      title: "Sections",
      name: "sections",
      type: "array",
      of: [
        {
          type: "reference",
          name: "sections",
          to: [{ type: "section" }],
        },
      ],
    }),
  ],
});
