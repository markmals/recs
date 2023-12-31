import { renderAsset } from "@vinxi/react"
import { StrictMode, Suspense } from "react"
import { renderToPipeableStream } from "react-dom/server"
import {
    StaticRouterProvider,
    createStaticHandler,
    createStaticRouter,
} from "react-router-dom/server"
import { eventHandler, toWebRequest } from "vinxi/server"
import { routes } from "./app"
import { AssetsContext } from "./root"

export default eventHandler(async event => {
    const clientManifest = import.meta.env.MANIFEST["client"]
    const assets = await clientManifest.inputs[clientManifest.handler].assets()

    let request = toWebRequest(event) as Request
    let { query, dataRoutes } = createStaticHandler(routes)
    let context = await query(request)

    if (context instanceof Response) {
        throw context
    }

    let router = createStaticRouter(dataRoutes, context)

    event.node.res.setHeader("Content-Type", "text/html")
    event.node.res.setHeader(
        "Cache-Control",
        "public, max-age=30, s-maxage=86400, stale-while-revalidate=86400",
    )

    return renderToPipeableStream(
        <StrictMode>
            <AssetsContext.Provider value={<Suspense>{assets.map(m => renderAsset(m))}</Suspense>}>
                <StaticRouterProvider context={context} router={router} />
            </AssetsContext.Provider>
        </StrictMode>,
        {
            bootstrapModules: [clientManifest.inputs[clientManifest.handler].output.path],
            bootstrapScriptContent: `window.manifest = ${JSON.stringify(
                await clientManifest.json(),
            )};`,
        },
    )
})
