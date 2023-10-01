import type { RouteObject } from "react-router-dom"
import Root, { loader as rootLoader } from "./root"
import Index, { loader as indexLoader } from "./routes/_index"
import "./styles/index.css"

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
            {
                index: true,
                loader: indexLoader,
                element: <Index />,
            },
        ],
    },
]
