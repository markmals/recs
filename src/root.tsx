import { createContext, useContext } from "react"
import type { LoaderFunctionArgs } from "react-router-dom"
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom"
import { site } from "~/lib/site"

export const AssetsContext = createContext<any>({})

export async function loader({ request }: LoaderFunctionArgs) {
    return { url: request.url }
}

export default function Root() {
    const assets = useContext(AssetsContext)
    const { url } = useLoaderData() as Awaited<ReturnType<typeof loader>>

    return (
        <html
            className="h-full w-full bg-[#f9ecdf] text-black dark:bg-[#17191e] dark:text-white"
            lang="en"
        >
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <title>{site.title}</title>
                <meta content={site.description} name="description" />
                <meta content={site.title} property="og:title" />
                <meta content="website" property="og:type" />
                <meta content={site.socialMediaImage.dark} property="og:image" />
                <meta content={site.description} property="og:description" />
                <meta content={url} property="og:url" />
                <link href={site.favicon} rel="icon" type="image/svg+xml" />
                {assets}
            </head>
            <body className="h-full">
                <Outlet />
                <ScrollRestoration />
            </body>
        </html>
    )
}
