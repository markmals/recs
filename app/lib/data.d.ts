import type { getCollection } from "../lib/content";

export type Recommendation = Awaited<ReturnType<typeof getCollection<"recommendations">>>[number];
export type HydratedRec = Recommendation["data"] & { slug: string; description: string };
export type Tag = Exclude<Recommendation["data"]["tags"], undefined>[number];
