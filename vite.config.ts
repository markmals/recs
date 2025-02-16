import { defineConfig } from "vite";

import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";

import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild, command }) => ({
    plugins: [cloudflareDevProxy(), reactRouter(), tailwindcss(), tsconfigPaths()],
    build: {
        rollupOptions: isSsrBuild ? { input: "./workers/app.ts" } : undefined,
    },
    // FIXME: Why do I need this alias when the default CF template does not?
    resolve:
        command === "build"
            ? { alias: { "react-dom/server": "react-dom/server.edge" } }
            : undefined,
}));
