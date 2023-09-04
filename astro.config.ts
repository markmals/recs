import { defineConfig } from "astro/config"

import solid from "@astrojs/solid-js"
import vercel from "astro-vercel-edge"
// import node from "@astrojs/node"
import unocss from "unocss/astro"

export default defineConfig({
    output: "server",
    // adapter: node({
    //     mode: "standalone",
    // }),
    adapter: vercel(),
    integrations: [
        solid(),
        unocss({
            injectReset: "@unocss/reset/tailwind.css",
            transformCSS: true,
        }),
    ],
    vite: {
        ssr: {
            noExternal: ["@kobalte/core"],
        },
        css: {
            transformer: "lightningcss",
            lightningcss: {
                drafts: {
                    nesting: true,
                },
            },
        },
        // FIXME: Using this causes `-webkit-mask-image` to be stripped from the prod build
        // build: {
        //     cssMinify: "lightningcss",
        // },
    },
})
