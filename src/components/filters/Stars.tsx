import { ChevronRightIcon } from "@heroicons/react/24/outline"
import * as Accordion from "@radix-ui/react-accordion"
import { cx } from "cva"
import { Form, useLoaderData } from "react-router-dom"
import type { loader } from "~/routes/_index"
import { Star } from "../Star"
import { TokenButton } from "../Token"

export function Header() {
    return (
        <>
            <span className="accordion-icon flex items-center">
                <ChevronRightIcon className="h-5 w-5" />
            </span>
            <span className="font-serif-text text-xl font-medium text-gray-900 dark:text-gray-50">
                Stars
            </span>
        </>
    )
}

const starRange = [1, 2, 3]

export function Options() {
    let { starsQuery } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    let stars = starsQuery ? parseInt(starsQuery!) : null

    return (
        <div className="flex flex-col gap-6">
            <button
                className={cx([
                    "pl-11 text-left font-serif-text text-xl hover:opacity-100",
                    stars === 0 ? "opacity-100" : "opacity-50",
                ])}
                name="stars"
                value="0"
                aria-label={`Show recommendations with no stars`}
            >
                No Stars
            </button>

            {starRange.map(num => (
                <button
                    className={cx([
                        "flex items-center gap-2 pl-11 hover:opacity-100",
                        stars === num ? "opacity-100" : "opacity-50",
                    ])}
                    key={num}
                    name="stars"
                    value={num}
                    aria-label={`Show ${num} star recommendations`}
                >
                    {Array(num)
                        .fill(num)
                        .map((_, index) => (
                            <Star filled={stars === num} key={index} />
                        ))}
                </button>
            ))}
            <div className="pl-11">
                <TokenButton
                    label="Clear"
                    aria-label="Clear stars filter and show all reccomendations"
                />
            </div>
        </div>
    )
}

export function Filter() {
    return (
        <Accordion.Item
            className="border-t-2 border-black px-4 py-6 dark:border-white/50"
            value="stars"
            asChild
        >
            <Form>
                <Accordion.Header className="-mx-2 -my-3 flow-root">
                    <Accordion.Trigger className="accordion-trigger flex w-full items-center gap-6 px-2 py-3 text-black/50 dark:text-white/50">
                        <Header />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="accordion-content padding-animation">
                    <Options />
                </Accordion.Content>
            </Form>
        </Accordion.Item>
    )
}
