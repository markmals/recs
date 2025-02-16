import { type RouteConfig, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
    // Render /rec pages from /app/content/recommendations with the /app/content/root.tsx container
    // route("rec", "./content/root.tsx", [
    //     ...(await flatRoutes({ rootDirectory: "./content/recommendations" })),
    // ]),

    // Everything else from the /app/routes directory
    ...(await flatRoutes()),
] satisfies RouteConfig;
