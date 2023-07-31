import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Card } from "~/components/Card"
import type { Recommendation } from "~/lib/data"
import notion from "~/lib/notion.server"

export async function loader() {
    let data = await notion.databases.query({
        database_id: process.env.NOTION_DB_ID!,
        sorts: [
            {
                property: "Created",
                direction: "ascending",
            },
        ],
    })

    let recs: Recommendation[] = data.results
        .map((res: any) => {
            let date = new Date(res.properties["Created"].date.start)

            let createdAt = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(date)

            let name = res.properties["Name"].title[0]?.text.content
            let slug = name
                .replaceAll(" - ", "-")
                .replaceAll(" ", "-")
                .replaceAll("*", "-")
                .replaceAll(",", "")
                .replaceAll(":", "")
                .replaceAll("'", "")
                .toLowerCase()

            let type = res.properties["Type"].select.name
            let linkName =
                type === "TV Show" || type === "Movie"
                    ? "Watch Now"
                    : type === "Restaurant"
                    ? "Menu"
                    : type === "Podcast" || type === "Album" || type === "Song"
                    ? "Listen Now"
                    : type === "Video Game"
                    ? "Download"
                    : "Link"

            let d = res.properties["Distributor"].select ?? undefined
            if (type === "Album" || type === "Video Game") d = undefined
            let distributor = d ? [{ name: d.name }] : []
            console.log(distributor)

            return {
                image: res.properties["Image"].url ?? undefined,
                name,
                link: res.properties["Info Link"].url,
                stars: res.properties["Stars"].number,
                description: res.properties["Blurb"].rich_text[0]?.text.content,
                tags: [
                    { name: type },
                    // ...distributor,
                    { name: linkName, link: res.properties["Direct Link"].url },
                ],
                createdAt,
                date,
                slug,
            }
        })
        .sort((lhs, rhs) => (rhs.date as any) - (lhs.date as any))

    return json(recs)
}

export default function Recommendations() {
    let recs = useLoaderData<typeof loader>()

    return (
        <div className="noise-container p-6">
            <div className="noise" />
            <div style={{ zIndex: "-30" }} />
            <h1 className="font-serif-display font-bold text-5xl sm:text-6xl mb-6">
                Recommendations
            </h1>
            <div className="sm:grid-cols-[3fr_2fr] sm:grid block">
                <div className="flex flex-col items-start gap-7 pb-6">
                    {recs.map(rec => (
                        <Card key={rec.name} recommendation={rec} />
                    ))}
                </div>
                {/* TODO: Search & filters */}
            </div>
        </div>
    )
}
