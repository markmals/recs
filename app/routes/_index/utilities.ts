import type { HydratedRec } from "~/lib/data";

export class Stars {
    readonly count: number | null;

    constructor(request: Request) {
        const count = new URL(request.url).searchParams.get("stars");
        this.count = count ? Number.parseInt(count) : null;
    }
}

export class TagFilter {
    readonly name: string | null;

    constructor(request: Request) {
        this.name = new URL(request.url).searchParams.get("tag");
    }
}

export function filterRecs(
    { recs, stars, tag }: { recs: HydratedRec[]; stars: Stars; tag: TagFilter },
): HydratedRec[] {
    return recs
        .filter((rec) => (stars.count !== null ? rec.stars === stars.count : true))
        .filter((rec) =>
            tag.name !== null
                ? (rec.tags ?? []).some((t) => t.name.toLowerCase() === tag.name!.toLowerCase())
                : true
        )
        .sort((lhs, rhs) => rhs.createdOn.getTime() - lhs.createdOn.getTime());
}
