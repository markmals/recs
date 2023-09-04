import { defineCollection, z } from "astro:content"

const recommendationsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        link: z.string(),
        image: z.string().url(),
        stars: z.number(),
        tags: z.array(
            z.object({
                name: z.string(),
                link: z.string().url().optional(),
                // icon?: JSX.Element
            }),
        ),
        createdOn: z.date(),
    }),
})

export const collections = {
    recommendations: recommendationsCollection,
}
