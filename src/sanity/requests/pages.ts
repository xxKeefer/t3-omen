import { groq } from "next-sanity";
import type {
  AllPageSlugsResponse,
  AllPagesResponse,
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

export const getAllPages = () => {
  const response = cms.fetch(groq`
  *[_type=='page']{
    _id,
    slug,
    chapter,
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
  }
  `);
  return response as Promise<AllPagesResponse>;
};

export const getPage = (slug?: string) => {
  const response = cms.fetch(groq`
  *[_type=='page' && slug.current == "${slug}"]{
    _id,
    chapter,
    slug,
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
  }
  `);
  return response as Promise<[PageResponse]>;
};
