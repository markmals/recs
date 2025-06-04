import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "motion/react";
import { isRouteErrorResponse, useNavigate } from "react-router";
import { Recommendation } from "~/components/Recommendation";
import { Filters } from "~/components/filters/Filters";
import { MobileFilters } from "~/components/filters/MobileFilters";
import { getCollection } from "~/lib/content";
import { stores } from "~/lib/stores.client";
import { filterRecs, Stars } from "./utilities";
import type { Route } from "./+types/route";
import { TokenButton } from "../../components/Token";

export async function loader({ request }: Route.LoaderArgs) {
    let collection = await getCollection("recommendations");

    if (import.meta.env.DEV && new URL(request.url).searchParams.has("drafts")) {
        collection = [...collection, ...(await getCollection("drafts"))] as typeof collection;
    }

    const stars = new Stars(request);
    const recs = collection.map((recommendation) => ({
        ...recommendation.data,
        slug: recommendation.slug as string,
        description: recommendation.body,
    }));

    return {
        stars: stars.count,
        recs,
        filteredRecs: filterRecs({
            recs,
            stars,
        }),
    };
}

let isInitialRequest = true;
const CACHE_KEY = "recommendations";

export async function clientLoader({ request, serverLoader }: Route.ClientLoaderArgs) {
    const stars = new Stars(request);

    async function fetchData() {
        const { recs } = await serverLoader();
        await stores.cache.set(CACHE_KEY, recs);
        return {
            stars: stars.count,
            filteredRecs: filterRecs({ recs, stars }),
        };
    }

    async function fetchCachedData() {
        const cachedRecs = await stores.cache.get(CACHE_KEY);
        return cachedRecs
            ? {
                stars: stars.count,
                filteredRecs: filterRecs({ recs: cachedRecs, stars }),
            }
            : null;
    }

    if (isInitialRequest) {
        isInitialRequest = false;
        return await fetchData();
    }

    return (await fetchCachedData()) ?? (await fetchData());
}

export default function Component({ loaderData }: Route.ComponentProps) {
    return (
        <div className="noise-container p-6">
            <div className="noise" />
            <div className="noise-underlay" />
            <h1 className="font-serif-display text-5xl font-bold sm:text-6xl">Recommendations</h1>
            <div className="py-4 lg:hidden">
                <MobileFilters />
            </div>
            <div className="block sm:grid-cols-[3fr_2fr] lg:grid">
                <div className="flex flex-col items-start gap-7 py-10">
                    <AnimatePresence>
                        {loaderData.filteredRecs.map((rec) => (
                            <motion.div className="w-full" key={rec.slug} layout>
                                <Recommendation recommendation={rec} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <Filters />
            </div>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const navigate = useNavigate();

    let message = "Oops!";
    let details = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        message = "Error";
        details = error.statusText || details;
        console.error(error);
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        console.error(error);
    }

    return (
        <div className="flex h-screen flex-col justify-center px-4 py-6 text-center sm:px-64 sm:py-8">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-amber-500 dark:text-purple-500" />
            <h3 className="mt-2 font-sans text-4xl font-semibold text-amber-950 dark:text-purple-200">
                {message}
            </h3>
            <p className="mt-1 font-serif-text text-amber-950 dark:text-purple-200">
                <i>{details}</i>
            </p>
            <div className="mt-6">
                <TokenButton onClick={() => navigate(0)} type="button">
                    <div className="flex flex-row items-center">
                        <ArrowPathIcon aria-hidden="true" className="mr-1.5 -ml-0.5 h-5 w-5" />
                        Refresh
                    </div>
                </TokenButton>
            </div>
        </div>
    );
}
