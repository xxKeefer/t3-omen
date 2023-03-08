import { defineType, defineField } from "sanity";

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
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
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
