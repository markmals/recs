import reactRefresh from "@vitejs/plugin-react"
import { createApp } from "vinxi"
import tsconfigPaths from "vite-tsconfig-paths"

export default createApp({
    routers: [
        {
            name: "public",
            mode: "static",
            dir: "./public",
            base: "/",
        },
        {
            name: "client",
            mode: "build",
            handler: "./src/entry.client.tsx",
            target: "browser",
            plugins: () => [tsconfigPaths(), reactRefresh()],
            base: "/_build",
        },
        {
            name: "ssr",
            mode: "handler",
            handler: "./src/entry.server.tsx",
            target: "server",
            plugins: () => [tsconfigPaths(), reactRefresh()],
        },
    ],
})
