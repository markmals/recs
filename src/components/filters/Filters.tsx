import { type ComponentProps, type JSX } from "solid-js"
import { Accordion } from "@kobalte/core"

export interface FilterProps {
    starHeader?: JSX.Element
    starOptions?: JSX.Element
}

export function Filters(props: FilterProps) {
    return (
        // as={Form}
        <Accordion.Root class="sticky top-0 mx-20 hidden h-screen pt-10 lg:block" collapsible>
            {/* TODO: Search */}
            {/* TODO: Tags */}
            {/* Stars */}
            <Accordion.Item
                class="border-t-2 border-black px-4 py-6 dark:border-white/50"
                value="stars"
            >
                <Accordion.Header as={H3} class="flow-root -mx-2 -my-3">
                    <Accordion.Trigger class="accordion-trigger w-full flex items-center gap-6 px-2 py-3 text-black/50 dark:text-white/50">
                        {props.starHeader}
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content class="accordion-content padding-animation">
                    {props.starOptions}
                </Accordion.Content>
            </Accordion.Item>
            {/* TODO: Date? */}
        </Accordion.Root>
    )
}

// function Form(props: ComponentProps<"form">) {
//     return <form {...props} />
// }

function H3(props: ComponentProps<"h3">) {
    return <h3 {...props} />
}
