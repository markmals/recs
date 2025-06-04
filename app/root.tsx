import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { ReactNode } from "react";
import { site } from "./lib/site.ts";
import styles from "./styles/index.css?url";

import type { Route } from "./+types/root.ts";

export function loader({ request }: Route.LoaderArgs) {
    return { url: request.url };
}

export const meta: Route.MetaFunction = ({ data }) => [
    { charSet: "utf-8" },
    { title: site.title },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: site.description },

    { name: "og:title", content: site.title },
    { name: "og:type", content: "website" },
    { name: "og:image", content: site.socialMediaImage.dark },
    { name: "og:description", content: site.description },
    data?.url ? { name: "og:url", content: data.url } : {},

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: site.title },
    { name: "twitter:description", content: site.description },
    { name: "twitter:image", content: site.socialMediaImage.dark },
];

export const links: Route.LinksFunction = () => [
    { rel: "icon", type: "image/svg+xml", href: site.favicon },
    { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: ReactNode }) {
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
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details = error.status === 404
            ? "The requested page could not be found."
            : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
