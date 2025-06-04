import { serveDir, serveFile } from "@std/http/file-server";
import { join } from "@std/path";
import { createRequestHandler } from "react-router";

const handler = createRequestHandler(
    // @ts-expect-error React Router server build is not typed
    () => import("./build/server/index.js"),
    "production",
);

const port = Number.parseInt(Deno.env.get("PORT") || "8080");

console.log("Starting production server...");
Deno.serve({ port }, async (request: Request): Promise<Response> => {
    const pathname = new URL(request.url).pathname;

    try {
        const filePath = join("./build/client", pathname);
        const fileInfo = await Deno.stat(filePath);

        if (fileInfo.isDirectory) {
            throw new Deno.errors.NotFound();
        }

        // The request is for a static file that exists

        const response = await serveFile(request, filePath, { fileInfo });
        response.headers.set("cache-control", "public, max-age=600");

        if (pathname.startsWith("/assets/")) {
            return serveDir(request, {
                fsRoot: "build/client/assets",
                urlRoot: "assets",
                headers: [
                    "Cache-Control: public, max-age=31536000, immutable",
                ],
            });
        }

        return response;
    } catch (error) {
        if (!(error instanceof Deno.errors.NotFound)) {
            throw error;
        }
    }

    return await handler(request);
});
console.log(`Server is running on http://localhost:${port}`);
