import { type PortableTextBlock } from "@portabletext/types";

export type AllPagesResponse = Array<Chapter>;

export type AllPageSlugsResponse = Array<{ slug: string; chapter: string }>;

export type AllChapterLinksResponse = Array<ChapterLinks>;

export type Chapter = {
  _id: string;
  chapter: string;
  sections: Section[];
  seo: SEO;
  slug: string;
};

export type Section = {
  _key: string;
  _ref: string;
  _type: string;
  slug: string;
  content: PortableTextBlock;
  title: string;
};

export type SEO = {
  meta: string;
  title: string;
};

export type ChapterLinks = Omit<Chapter, "seo" | "sections"> & {
  sections: Pick<Section, "slug" | "title">[];
};
