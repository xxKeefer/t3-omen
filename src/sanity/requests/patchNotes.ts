import { groq } from "next-sanity";
import { type AllPatchNotesResponse, type PatchNotes } from "~/types";
import { client as cms } from "~/utils/sanity.client";
import { GroqContent } from "./partials";

const GroqPatchNotes = `{
    title,
    "slug":slug.current,
    versionNumber,
    _createdAt,
    ${GroqContent}
}`;

export const getAllPatchNotes = () =>
  cms.fetch<AllPatchNotesResponse>(groq`
*[_type=='patchNotes'] | order(versionNumber desc)${GroqPatchNotes}
`);
export const getLatestPatchNotes = () =>
  cms.fetch<PatchNotes>(groq`
*[_type=='patchNotes'] | order(versionNumber desc)[0]${GroqPatchNotes}
`);

export const getPatchNotes = (slug?: string) =>
  cms.fetch<PatchNotes>(groq`
  *[_type=='patchNotes' && slug.current == "${slug}"][0]${GroqPatchNotes}`);
