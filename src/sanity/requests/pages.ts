import { groq } from "next-sanity";
import type {
  AllChapterLinksResponse,
  AllPageSlugsResponse,
  AllPagesResponse,
  ChapterLinksResponse,
  PageResponse,
} from "~/types";
import { client as cms } from "~/utils/sanity.client";

export const getAllPageSlugs = () => {
  const response = cms.fetch(groq`
  *[_type=='page']{
    'slug':slug.current,
    chapter
  }
  `);
  return response as Promise<AllPageSlugsResponse>;
};

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

export const getAllChapterLinks = () => {
  const response = cms.fetch(groq`
  *[_type=='page']${GroqChapterLinks}
  `);
  return response as Promise<AllChapterLinksResponse>;
};
export const getChapterLinks = (chapter: string) => {
  const response = cms.fetch(groq`
  *[_type=='page' && chapter == "${chapter}"][0]]${GroqChapterLinks}
  `);
  return response as Promise<ChapterLinksResponse>;
};

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
        content[]{
      _type == 'image' => {
        _key,
        _type,
        alt,
        'url': asset->url,
        'dimensions': asset->metadata.dimensions{
          width, height, aspectRatio
        }
      },
      _type != 'image' => @,
    }
      },
    }
  }`;

export const getAllPages = () => {
  const response = cms.fetch(groq`
  *[_type=='page']${GroqPage}
  `);
  return response as Promise<AllPagesResponse>;
};

export const getPage = (slug?: string) => {
  const response = cms.fetch(groq`
  *[_type=='page' && slug.current == "${slug}"][0]${GroqPage}`);
  return response as Promise<PageResponse>;
};
