import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@vercel/remix"
import { json } from "@vercel/remix"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import { site } from "./lib/site"
import "./styles/index.css"

export const config = { runtime: "edge" }

export async function loader({ request }: LoaderFunctionArgs) {
    return json({ url: request.url })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
    { charSet: "utf-8" },
    { title: site.title },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: site.description },
    { name: "og:title", content: site.title },
    { name: "og:type", content: "website" },
    { name: "og:image", content: site.socialMediaImage.dark },
    { name: "og:description", content: site.description },
    { name: "og:url", content: data!.url },
]

export const links: LinksFunction = () => [
    { rel: "icon", type: "image/svg+xml", href: site.favicon },
]

export default function Root() {
    return (
        <html
            className="h-full w-full bg-[#f9ecdf] text-black dark:bg-[#17191e] dark:text-white"
            lang="en"
        >
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}
