import * as Accordion from "@radix-ui/react-accordion"
import * as Stars from "./Stars"

export function Filters() {
    return (
        <Accordion.Root
            className="sticky top-0 mx-20 hidden h-screen pt-10 lg:block"
            collapsible
            type="single"
        >
            {/* TODO: Search */}
            {/* TODO: Tags */}
            <Stars.Filter />
            {/* TODO: Date? */}
        </Accordion.Root>
    )
}
