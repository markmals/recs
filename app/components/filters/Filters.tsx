import { DisclosureGroup } from "react-aria-components";
import * as Stars from "./Stars";
import { Search } from "./Search";

export function Filters() {
    return (
        <DisclosureGroup className="sticky top-0 mx-20 hidden h-screen pt-10 lg:block">
            <Search />
            {/* TODO: Tags */}
            <Stars.Filter />
            {/* TODO: Date? */}
        </DisclosureGroup>
    );
}
