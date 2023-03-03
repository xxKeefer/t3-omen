import { createClient } from "next-sanity";
import { env } from "~/env.mjs";

export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID; // "pv8y60vp"
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET; // "production"
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION; // "2022-11-16"

export const client = createClient({ projectId, dataset, apiVersion });
