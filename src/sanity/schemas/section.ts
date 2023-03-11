import { defineType, defineField } from "sanity";
import { contentBlock, slugField } from "./partials";

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
    slugField(),
    contentBlock,
  ],
});
