import { createAssets } from "@vinxi/react"
import { StrictMode, Suspense } from "react"
import { hydrateRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "vinxi/client"
import { routes } from "./app"
import { AssetsContext } from "./root"

const Assets = createAssets(
    import.meta.env.MANIFEST["client"].handler,
    import.meta.env.MANIFEST["client"],
)

let router = createBrowserRouter(routes)

hydrateRoot(
    document,
    <StrictMode>
        <AssetsContext.Provider
            value={
                <Suspense>
                    <Assets />
                </Suspense>
            }
        >
            <RouterProvider router={router} />
        </AssetsContext.Provider>
    </StrictMode>,
)
