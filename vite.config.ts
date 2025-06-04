import deno from "@deno/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        deno(),
        reactRouter(),
        tailwindcss(),
    ],
    environments: {
        ssr: {
            build: {
                target: "ESNext",
            },
            resolve: {
                conditions: ["deno"],
                externalConditions: ["deno"],
            },
        },
    },
});
