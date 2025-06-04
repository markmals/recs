import { DisclosureGroup } from "react-aria-components";
import * as Stars from "./Stars";
import * as Tags from "./Tags";

export function Filters() {
    return (
        <DisclosureGroup className="sticky top-0 mx-20 hidden h-screen pt-10 lg:block">
            {/* TODO: Search */}
            <Tags.Filter />
            <Stars.Filter />
            {/* TODO: Date? */}
        </DisclosureGroup>
    );
}
