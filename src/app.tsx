import type { RouteObject } from "react-router-dom"
import Root, { loader as rootLoader } from "./root"
import Index, { ErrorBoundary, loader as indexLoader } from "./routes/_index"
import "./styles/index.css"

export const routes: RouteObject[] = [
    {
        path: "/",
        Component: Root,
        loader: rootLoader,
        children: [
            {
                index: true,
                loader: indexLoader,
                Component: Index,
                ErrorBoundary: ErrorBoundary,
            },
        ],
    },
]
