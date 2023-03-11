import { defineField } from "sanity";

export const seoFields = defineField({
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
});
