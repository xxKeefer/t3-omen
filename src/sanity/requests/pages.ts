import { groq } from "next-sanity";
import type {
  AllChapterLinksResponse,
  AllPageSlugsResponse,
  AllPagesResponse,
  ChapterLinks,
  Chapter,
} from "~/types";
import { client as cms } from "~/utils/sanity.client";
import { GroqContent } from "./partials";

export const getAllPageSlugs = () =>
  cms.fetch<AllPageSlugsResponse>(groq`
  *[_type=='page']{
    'slug':slug.current,
    chapter
  }
  `);

const GroqChapterLinks = `{
    _id,
    chapter,
    "slug":slug.current,
    sections[]{
      _type != 'reference' => @->{
        _type,
        "slug":slug.current,
        title,
      },
    }
  }`;

export const getAllChapterLinks = () =>
  cms.fetch<AllChapterLinksResponse>(groq`
  *[_type=='page']${GroqChapterLinks}
  `);
export const getChapterLinks = (chapter: string) =>
  cms.fetch<ChapterLinks>(groq`
  *[_type=='page' && chapter == "${chapter}"][0]]${GroqChapterLinks}
  `);

const GroqPage = `{
    _id,
    chapter,
    "slug":slug.current,
    seo,
    sections[]{
      _type != 'reference' => @,
      _type != 'reference' => @->{
        _type,
        "slug":slug.current,
        title,
        ${GroqContent}
      },
    }
  }`;

export const getAllPages = () =>
  cms.fetch<AllPagesResponse>(groq`
  *[_type=='page']${GroqPage}
  `);

export const getPage = (slug?: string) =>
  cms.fetch<Chapter>(groq`
  *[_type=='page' && slug.current == "${slug}"][0]${GroqPage}`);
