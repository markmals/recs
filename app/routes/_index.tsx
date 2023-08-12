import { useAutoAnimate } from "@formkit/auto-animate/react"
import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Filters } from "~/components/Filters"
import { RecommendationCard } from "~/components/RecommendationCard"
import { FilterProvider } from "~/components/context/FilterContext"
import { ScrollProvider } from "~/components/context/ScrollContext"
import type { Recommendation } from "~/lib/data"
import notion from "~/lib/notion.server"

export async function loader({ request }: LoaderArgs) {
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

            return {
                image: res.properties["Image"].url ?? undefined,
                name,
                link: res.properties["Info Link"].url,
                stars: res.properties["Stars"].number ?? 0,
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

    return json({ recs, url: request.url })
}

export default function Recommendations() {
    let { recs: allRecs, url } = useLoaderData<typeof loader>()
    let queryParams = new URL(url).searchParams

    let [filter, setFilter] = useState<Filter>({
        stars: queryParams.get("stars") ? parseInt(queryParams.get("stars")!) : null,
    })
    let [scroll, setScroll] = useState(0)
    let [recs, setRecs] = useState(
        allRecs.filter(rec => {
            if (filter.stars !== null) {
                return rec.stars === filter.stars
            }

            return true
        }),
    )

    let location = useLocation()

    let [parentAnimation] = useAutoAnimate()

    // This should only rerun when `recs` updates, not `scroll`
    // Despite what ESLint says
    useEffect(() => window.scrollTo(0, scroll), [recs])

    useEffect(() => {
        let searchParams = new URLSearchParams(location.search)
        setFilter({
            stars: searchParams.get("stars") ? parseInt(searchParams.get("stars")!) : null,
        })
    }, [location])

    useEffect(() => {
        console.log(location.search)
        setRecs(
            allRecs.filter(rec => {
                if (filter.stars !== null) {
                    return rec.stars === filter.stars
                }

                return true
            }),
        )
    }, [location, filter, allRecs])

    return (
        <div className="noise-container p-6">
            <div className="noise" />
            <div style={{ zIndex: "-30" }} />
            <h1 className="font-serif-display font-bold text-5xl sm:text-6xl">Recommendations</h1>
            <div className="sm:grid-cols-[3fr_2fr] sm:grid block">
                <div className="flex flex-col items-start gap-7 py-10" ref={parentAnimation}>
                    {recs.map(rec => (
                        <RecommendationCard key={rec.name} recommendation={rec} />
                    ))}
                </div>
                <FilterProvider value={[filter, setFilter]}>
                    <ScrollProvider value={setScroll}>
                        <Filters />
                    </ScrollProvider>
                </FilterProvider>
            </div>
        </div>
    )
}

export interface Filter {
    stars: number | null
}
