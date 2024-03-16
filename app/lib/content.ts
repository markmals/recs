import frontmatter from "front-matter"
import { marked } from "marked"
import { parse as parsePath } from "path-esm"
import type { Output } from "valibot"
import { parse as validate } from "valibot"
import { collections } from "~/content/config"

export type Content<Data, Collection> = {
    collection: Collection
    slug: string
    body: string
    data: Data
}

export type Collecitons = typeof collections
export type CollectionKey = keyof Collecitons

const collectionFiles = import.meta.glob<true, string, { default: string }>(
    "/app/content/**/*.md",
    { eager: true, query: "?raw" },
)

export async function getCollection<Collection extends CollectionKey>(
    collection: Collection,
): Promise<
    {
        collection: Collection
        slug: string
        body: string
        data: Output<Collecitons[Collection]>
    }[]
> {
    return await Promise.all(
        Object.entries(collectionFiles)
            .filter(([path]) => {
                const contentDir = parsePath(parsePath(path).dir).name
                return contentDir === collection
            })
            .map(async ([path, file]) => {
                const { attributes, body: content } = frontmatter(file.default)
                let body = await marked(content)
                let data = validate(collections[collection], attributes)
                data.createdOn = new Date(data.createdOn)
                return { slug: parsePath(path).name, body, data, collection }
            }),
    )
}
