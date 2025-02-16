import { createRequestHandler } from "react-router";

declare module "react-router" {
    export interface AppLoadContext {
        cloudflare: {
            ctx: ExecutionContext;
        };
    }
}

const requestHandler = createRequestHandler(
    // @ts-expect-error - virtual module provided by React Router at build time
    // eslint-disable-next-line import/no-unresolved
    () => import("virtual:react-router/server-build"),
    import.meta.env.MODE,
);

export default {
    fetch(request, _env, ctx) {
        return requestHandler(request, {
            cloudflare: { ctx },
        });
    },
} satisfies ExportedHandler;
