import * as v from "valibot";

const recommendations = v.object({
    title: v.string(),
    link: v.string(),
    image: v.string(),
    stars: v.number(),
    tags: v.optional(
        v.array(
            v.object({
                name: v.string(),
                link: v.optional(v.pipe(v.string(), v.url())),
                icon: v.optional(v.string()),
            }),
        ),
    ),
    createdOn: v.date(),
});

export const collections = {
    recommendations,
    drafts: recommendations,
};
