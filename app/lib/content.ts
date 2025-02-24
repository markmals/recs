import frontmatter from "front-matter";
import { marked } from "marked";
import * as path from "@std/path";
import type { InferOutput } from "valibot";
import { parse as validate } from "valibot";
import { collections } from "~/content/config";

export type Content<Data, Collection> = {
    collection: Collection;
    slug: string;
    body: string;
    data: Data;
};

export type Collecitons = typeof collections;
export type CollectionKey = keyof Collecitons;

const collectionFiles = import.meta.glob<true, string, { default: string }>(
    "/app/content/**/*.md",
    { eager: true, query: "?raw" },
);

export async function getCollection<Collection extends CollectionKey>(
    collection: Collection,
): Promise<
    {
        collection: Collection;
        slug: string;
        body: string;
        data: InferOutput<Collecitons[Collection]>;
    }[]
> {
    return await Promise.all(
        Object.entries(collectionFiles)
            .filter(([filePath]) => {
                const contentDir = path.parse(path.parse(filePath).dir).name;
                return contentDir === collection;
            })
            .map(async ([filePath, file]) => {
                let { attributes, body } = frontmatter(file.default);
                body = await marked(body);
                const data = validate(collections[collection], attributes);
                data.createdOn = new Date(data.createdOn);
                return { slug: path.parse(filePath).name, body, data, collection };
            }),
    );
}
