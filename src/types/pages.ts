import { type PortableTextBlock } from "@portabletext/types";

export type AllPagesResponse = Array<Chapter>;

export type PageResponse = [Chapter];

export type AllPageSlugsResponse = Array<{ slug: string; chapter: string }>;

export type Chapter = {
  _id: string;
  chapter: string;
  sections: Section[];
  slug: string;
};

export type Section = {
  _key: string;
  _ref: string;
  _type: string;
  anchor: string;
  content: PortableTextBlock;
  title: string;
};
