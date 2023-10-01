import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { AnimatePresence } from "framer-motion"
import { useMemo } from "react"
import type { LoaderFunctionArgs } from "react-router-dom"
import { useLoaderData, useNavigate, useRouteError } from "react-router-dom"
import { Recommendation } from "~/components/Recommendation"
import { Filters } from "~/components/filters/Filters"
import { getCollection } from "~/lib/content.server"
import { TokenButton } from "../components/Token"

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

export function ErrorBoundary() {
    let navigate = useNavigate()

    let error = useRouteError() as any
    let message = error.statusText || error.message
    console.error(error)

    return (
        <div className="flex h-screen flex-col justify-center px-4 py-6 text-center sm:px-64 sm:py-8">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-amber-500" />
            <h3 className="mt-2 font-sans text-4xl font-semibold text-amber-950">Error!</h3>
            <p className="mt-1 font-serif-text text-amber-950">
                <i>{message}</i>
            </p>
            <div className="mt-6">
                <TokenButton onClick={() => navigate(0)} type="button">
                    <div className="flex flex-row items-center">
                        <ArrowPathIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Refresh
                    </div>
                </TokenButton>
            </div>
        </div>
    )
}
