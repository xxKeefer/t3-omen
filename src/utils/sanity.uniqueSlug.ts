import type { SlugIsUniqueValidator } from "@sanity/types";

export const isUnique: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2022-12-07" });
  if (!document) throw new Error("No Documents");
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  const result: boolean | undefined =
    (await client.fetch(query, params)) ?? false;
  return result;
};
