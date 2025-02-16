import { defineConfig } from "vite";

import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";

import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [cloudflareDevProxy(), reactRouter(), tailwindcss(), tsconfigPaths()],
    build: {
        rollupOptions: isSsrBuild ? { input: "./workers/app.ts" } : undefined,
    },
}));
