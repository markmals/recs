import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import type { HeadersFunction, LinksFunction, LoaderArgs, V2_MetaFunction } from "@vercel/remix"
import { json } from "@vercel/remix"
import styles from "./styles/index.css"

export function loader({ request }: LoaderArgs) {
    return json({ url: request.url })
}

const description = "Mark's Recommendations for TV Shows, Movies, Podcasts, Restaurants, and More"

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
    { title: "Recommendations" },
    { name: "description", content: description },
    { property: "og:title", content: "Recommendations" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/social-media-dark.png" },
    { property: "og:description", content: description },
    data ? { property: "og:url", content: data!.url } : {},
]

export const links: LinksFunction = () => [
    { rel: "icon", type: "image/svg+xml", href: "favicon.svg" },
    { rel: "stylesheet", href: styles },
]

export const headers: HeadersFunction = () => ({
    // "Access-Control-Allow-Origin": "*",
    // "Cross-Origin-Resource-Policy": "cross-origin",
    "Cache-Control": "public, max-age=30, s-maxage=86400, stale-while-revalidate=86400",
})

export default function App() {
    return (
        <html
            className="h-full w-full bg-[#f9ecdf] dark:bg-[#17191e] text-black dark:text-white"
            lang="en"
        >
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width,initial-scale=1" name="viewport" />
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
