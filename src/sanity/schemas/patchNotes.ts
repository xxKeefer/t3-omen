import { defineType, defineField } from "sanity";
import { contentBlock } from "./partials";
import { isUnique } from "~/utils/sanity.uniqueSlug";

export const patchNotesSchema = defineType({
  title: "Patch Notes",
  name: "patchNotes",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Version",
      name: "versionNumber",
      type: "string",
      validation: (Rule) => Rule.regex(/^\d+\.\d+\.\d+$/),
      description: `Format: 'MAJOR.MINOR.PATCH' 
        ||| 🤯 MAJOR: Breaking changes - Players have to relearn core rules, ie: reworks, 
        ||| ✨ MINOR: New content - New content, or modifications that extend the rules, 
        ||| 🧼 PATCH: Bug fixes - Fixes to existing content, or minor changes to existing content`,
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "versionNumber",
        maxLength: 96,
        isUnique,
        slugify: (input) => `v${input.toString().replace(/\./g, "-")}`,
      },
    }),
    contentBlock,
  ],
});
