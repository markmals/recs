import { createAssets } from "@vinxi/react"
import { hydrateRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "vinxi/client"
import { routes } from "./app"
import { AssetsContext } from "./root"

hydrate()

async function hydrate() {
    const Assets = createAssets(
        import.meta.env.MANIFEST["client"].handler,
        import.meta.env.MANIFEST["client"],
    )

    let router = createBrowserRouter(routes)

    hydrateRoot(
        document,
        <AssetsContext.Provider value={<Assets />}>
            <RouterProvider fallbackElement={null} router={router} />
        </AssetsContext.Provider>,
    )
}
