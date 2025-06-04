import { DisclosureGroup } from "react-aria-components";
import * as Stars from "./Stars";

import type { ClassProps } from "~/lib/props";

export function Filters(
    { className = "sticky top-0 mx-20 hidden h-screen pt-10 lg:block" }: ClassProps = {},
) {
    return (
        <DisclosureGroup className={className}>
            {/* TODO: Search */}
            {/* TODO: Tags */}
            <Stars.Filter />
            {/* TODO: Date? */}
        </DisclosureGroup>
    );
}
