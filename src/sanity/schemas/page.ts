import { defineType, defineField } from "sanity";
import { isUnique } from "~/utils/sanity.uniqueSlug";

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
        source: "chapter",
        maxLength: 96,
        isUnique,
      },
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "object",
      fields: [
        defineField({
          title: "Title for SEO & Social Sharing",
          description:
            "This is the title that will appear in the browser tab, and in social sharing cards.",
          name: "title",
          type: "string",
          validation: (Rule) => Rule.max(70).required(),
        }),

        defineField({
          title: "Meta Description - Short Paragraph for SEO",
          description:
            "This is the description that will appear in search results, and in social sharing cards.",
          name: "meta",
          type: "string",
          validation: (Rule) => Rule.max(160),
        }),
      ],
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
