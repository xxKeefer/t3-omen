import { type PortableTextBlock } from "sanity";

export type PatchNotes = {
  _createdAt: string;
  content: PortableTextBlock;
  slug: string;
  title: string;
  versionNumber: `${number}.${number}.${number}`;
};

export type AllPatchNotesResponse = Array<PatchNotes>;
