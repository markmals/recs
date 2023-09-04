import { ChevronRightIcon } from "@heroicons/react/24/outline"
import * as Accordion from "@radix-ui/react-accordion"
import { Link } from "@remix-run/react"
import { cx } from "class-variance-authority"
import { Star } from "./Star"
import { useFilter } from "./context/FilterContext"
import { useSetScrollPosition } from "./context/ScrollContext"

const staticFilters = [
    // { title: "Tags", options: [] },
    { title: "Stars", options: [] },
    // { title: "Date", options: [] },
]

export function Filters() {
    let [filter] = useFilter()

    return (
        <Accordion.Root
            className="sticky top-0 mx-20 hidden h-screen pt-10 sm:block"
            collapsible
            defaultValue={filter.stars !== null ? "Stars" : ""}
            type="single"
        >
            {staticFilters.map(f => (
                <Accordion.Item
                    className="border-t-2 border-black px-4 py-6"
                    key={f.title}
                    value={f.title}
                >
                    {/* as="h3" */}
                    <Accordion.Header className="-mx-2 -my-3 flow-root">
                        <Accordion.Trigger className="accordion-trigger flex w-full items-center gap-6 px-2 py-3 text-black/50 dark:text-white/50">
                            <span className="accordion-icon flex items-center">
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                            <span className="font-serif-text text-xl font-medium text-gray-900 dark:text-gray-50">
                                {f.title}
                            </span>
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content padding-animation">
                        <div className="flex flex-col gap-6">
                            {f.title === "Stars" && <StarOptions />}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}

const stars = [1, 2, 3]

function StarOptions() {
    let [filter, setFilter] = useFilter()
    let setScroll = useSetScrollPosition()

    return (
        <>
            <Link
                className={cx(
                    "pl-11 font-serif-text text-xl hover:opacity-100",
                    filter.stars === 0 ? "opacity-100" : "opacity-50",
                )}
                onClick={event => {
                    event.preventDefault()
                    updateURL({ to: event.currentTarget.href })
                    setScroll(window.scrollY)
                    setFilter({ stars: 0 })
                }}
                to="/?stars=0"
            >
                No Stars
            </Link>
            {stars.map(num => (
                <Link
                    className={cx(
                        "flex items-center gap-2 pl-11 hover:opacity-100",
                        filter.stars === num ? "opacity-100" : "opacity-50",
                    )}
                    key={`star-wrapper-${num}`}
                    onClick={event => {
                        event.preventDefault()
                        updateURL({ to: event.currentTarget.href })
                        setScroll(window.scrollY)
                        setFilter({ stars: num })
                    }}
                    to={`/?stars=${num}`}
                >
                    {Array(num)
                        .fill(num)
                        .map((_, idx) => (
                            <Star filled={filter.stars === num} key={`star-${idx}`} />
                        ))}
                </Link>
            ))}
            <Link
                className="pl-11 font-serif-text text-xl opacity-50 hover:opacity-100"
                onClick={event => {
                    event.preventDefault()
                    updateURL({ to: event.currentTarget.href })
                    setScroll(window.scrollY)
                    setFilter({ stars: null })
                }}
                to="/"
            >
                Clear
            </Link>
        </>
    )
}

function updateURL({ to }: { to: string }) {
    history.pushState(null, "", to)
}
