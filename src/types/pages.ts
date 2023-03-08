import { type PortableTextBlock } from "@portabletext/types";

export type AllPagesResponse = Array<PageResponse>;

export type PageResponse = {
  _id: string;
  chapter: string;
  content: PortableTextBlock;
  slug: string;
};

export type AllPageSlugsResponse = Array<{ slug: string; chapter: string }>;
