import { defineField } from "sanity";

export const contentBlock = defineField({
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
});
