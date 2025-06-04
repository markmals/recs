import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { isRouteErrorResponse, useNavigate } from "react-router";
import { Recommendation } from "../components/Recommendation";
import { getCollection } from "../lib/content";
import { stores } from "../lib/stores.client";
import { site } from "../lib/site";
import type { HydratedRec } from "../lib/data";
import { TokenButton } from "../components/Token";
import type { Route } from "./+types/$slug";

export async function loader({ params, request }: Route.LoaderArgs) {
    let collection = await getCollection("recommendations");
    if (import.meta.env.DEV && new URL(request.url).searchParams.has("drafts")) {
        collection = [...collection, ...(await getCollection("drafts"))] as typeof collection;
    }
    const recs = collection.map((rec) => ({
        ...rec.data,
        slug: rec.slug as string,
        description: rec.body,
    }));
    const rec = recs.find((r) => r.slug === params.slug);
    if (!rec) {
        throw new Response("Not Found", { status: 404 });
    }
    return { rec, url: request.url };
}

let isInitialRequest = true;
const CACHE_KEY = "recommendations";

export async function clientLoader({ params, serverLoader }: Route.ClientLoaderArgs) {
    async function fetchData() {
        const { rec } = await serverLoader();
        const cached = (await stores.cache.get(CACHE_KEY)) ?? [];
        if (!cached.find((r) => r.slug === rec.slug)) {
            await stores.cache.set(CACHE_KEY, [...cached, rec]);
        }
        return { rec };
    }

    async function fetchCached() {
        const cached = await stores.cache.get(CACHE_KEY);
        const rec = cached?.find((r) => r.slug === params.slug);
        return rec ? { rec } : null;
    }

    if (isInitialRequest) {
        isInitialRequest = false;
        return await fetchData();
    }

    return (await fetchCached()) ?? (await fetchData());
}

export const meta: Route.MetaFunction = ({ data }) => {
    if (!data) return [];
    const { rec, url } = data as { rec: HydratedRec; url: string };
    const title = `${rec.title} | ${site.title}`;
    const description = rec.description.replace(/<[^>]*>/g, "").slice(0, 160);
    const image = rec.image.startsWith("http") ? rec.image : new URL(rec.image, url).toString();
    return [
        { title },
        { name: "description", content: description },
        { name: "og:title", content: title },
        { name: "og:type", content: "article" },
        { name: "og:image", content: image },
        { name: "og:description", content: description },
        { name: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
    ];
};

export default function Component({ loaderData }: Route.ComponentProps) {
    return (
        <div className="noise-container p-6">
            <div className="noise" />
            <div className="noise-underlay" />
            <Recommendation recommendation={loaderData.rec} />
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const navigate = useNavigate();
    let message = "Oops!";
    let details = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
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
                    <div className="flex flex-row items-center">Refresh</div>
                </TokenButton>
            </div>
        </div>
    );
}
