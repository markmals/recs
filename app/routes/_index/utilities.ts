import type { HydratedRec } from "~/lib/data";

export class Stars {
    readonly count: number | null;

    constructor(request: Request) {
        const count = new URL(request.url).searchParams.get("stars");
        this.count = count ? Number.parseInt(count) : null;
    }
}

export function filterRecs({ recs, stars }: { recs: HydratedRec[]; stars: Stars }): HydratedRec[] {
    return recs
        .filter((rec) => (stars.count !== null ? rec.stars === stars.count : true))
        .sort((lhs, rhs) => rhs.createdOn.getTime() - lhs.createdOn.getTime());
}
