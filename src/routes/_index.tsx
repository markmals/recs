import { AnimatePresence } from "framer-motion"
import { useMemo } from "react"
import type { LoaderFunctionArgs } from "react-router-dom"
import { useLoaderData } from "react-router-dom"
import { Recommendation } from "~/components/Recommendation"
import { Filters } from "~/components/filters/Filters"
import { getCollection } from "~/lib/content.server"

// export const headers: HeadersFunction = () => ({
//     "Cache-Control": "public, max-age=30, s-maxage=86400, stale-while-revalidate=86400",
// })

export async function loader({ request }: LoaderFunctionArgs) {
    let query = new URL(request.url).searchParams
    let starsQuery = new URLSearchParams(query).get("stars")
    let stars = starsQuery ? parseInt(starsQuery!) : null

    let collection = await getCollection("recommendations")
    let recs = collection
        .map(rec => ({
            ...rec.data,
            slug: rec.slug as string,
            description: rec.body,
        }))
        .filter(rec => (stars !== null ? rec.stars === stars : true))
        .sort((lhs, rhs) => (rhs.createdOn as any) - (lhs.createdOn as any))

    return { starsQuery, recs }
}

export default function Index() {
    let { recs } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    let recsWithDates = useMemo(
        () => recs.map(rec => ({ ...rec, createdOn: new Date(rec.createdOn) })),
        [recs],
    )

    return (
        <div className="noise-container p-6">
            <div className="noise" />
            <div className="noise-underlay" />
            <h1 className="font-serif-display text-5xl font-bold sm:text-6xl">Recommendations</h1>
            <div className="block sm:grid-cols-[3fr_2fr] lg:grid">
                <div className="flex flex-col items-start gap-7 py-10">
                    <AnimatePresence>
                        {recsWithDates.map(rec => (
                            <Recommendation key={rec.slug} recommendation={rec as any} />
                        ))}
                    </AnimatePresence>
                </div>
                <Filters />
            </div>
        </div>
    )
}
