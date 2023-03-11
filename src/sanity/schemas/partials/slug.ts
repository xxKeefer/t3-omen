import { defineField } from "sanity";
import { isUnique } from "~/utils/sanity.uniqueSlug";

export const slugField = (source = "title") =>
  defineField({
    title: "Slug",
    name: "slug",
    type: "slug",
    options: {
      source,
      maxLength: 96,
      isUnique,
    },
  });
