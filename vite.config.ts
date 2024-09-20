import { vitePlugin as remix } from "@remix-run/dev"
import tailwind from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { vercelPreset } from "@vercel/remix/vite"

export default defineConfig({
    plugins: [
        remix({
            presets: [vercelPreset()],
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                unstable_singleFetch: true,
                unstable_lazyRouteDiscovery: true,
                unstable_optimizeDeps: true,
            },
        }),
        tailwind(),
        tsconfigPaths(),
    ],
})
