import Fuse from "fuse.js";
import type { HydratedRec } from "~/lib/data";

export class Stars {
    readonly count: number | null;

    constructor(request: Request) {
        const count = new URL(request.url).searchParams.get("stars");
        this.count = count ? Number.parseInt(count) : null;
    }
}

export class Query {
    readonly value: string | null;

    constructor(request: Request) {
        const query = new URL(request.url).searchParams.get("q");
        this.value = query && query.trim().length > 0 ? query : null;
    }
}

export function filterRecs(
    {
        recs,
        stars,
        query,
    }: { recs: HydratedRec[]; stars: number | null; query: string | null },
): HydratedRec[] {
    let filtered = recs;

    if (query) {
        const fuse = new Fuse(recs, {
            keys: ["title", "description", "tags.name"],
            threshold: 0.4,
        });
        filtered = fuse.search(query).map((r) => r.item);
    }

    filtered = filtered.filter((rec) =>
        stars !== null ? rec.stars === stars : true
    );

    return filtered.sort((lhs, rhs) =>
        rhs.createdOn.getTime() - lhs.createdOn.getTime()
    );
}
