import { serveDir, serveFile } from "@std/http/file-server";
import { createRequestHandler } from "react-router";

const handler = createRequestHandler(
    // @ts-expect-error React Router server build is not typed
    () => import("./build/server/index.js"),
    "production",
);

const port = Number.parseInt(Deno.env.get("PORT") || "3000");

console.log("Starting production server...");
Deno.serve({ port }, async (request: Request): Promise<Response> => {
    const pathname = new URL(request.url).pathname;

    if (pathname === "/favicon.ico") {
        return serveFile(request, "build/client/favicon.ico");
    }

    if (pathname.startsWith("/assets/")) {
        return serveDir(request, {
            fsRoot: "build/client/assets",
            urlRoot: "assets",
            headers: [
                "Cache-Control: public, max-age=31536000, immutable",
            ],
        });
    }

    return await handler(request);
});
console.log(`Server is running on http://localhost:${port}`);
