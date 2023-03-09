import { defineType, defineField } from "sanity";
import { isUnique } from "~/utils/sanity.uniqueSlug";

export const sectionSchema = defineType({
  title: "Section",
  name: "section",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique,
      },
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
