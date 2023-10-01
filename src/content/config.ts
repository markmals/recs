// import { v } from "~/lib/content.server"
import * as v from "valibot"

const recommendationsCollection = v.object({
    title: v.string(),
    link: v.string(),
    image: v.string([v.url()]),
    stars: v.number(),
    tags: v.array(
        v.object({
            name: v.string(),
            link: v.optional(v.string([v.url()])),
            // icon?: JSX.Element
        }),
    ),
    createdOn: v.date(),
})

export const collections = {
    recommendations: recommendationsCollection,
}
