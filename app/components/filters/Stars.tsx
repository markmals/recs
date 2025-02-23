import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cx } from "cva";
import { Form, useLoaderData } from "react-router";
import { Star } from "../Star";
import { TokenButton } from "../Token";
import type { Route } from "../../routes/_index/+types/route";
import { Button, Disclosure, DisclosurePanel, Heading } from "react-aria-components";

export function Header() {
    return (
        <>
            <span className="flex items-center">
                <ChevronRightIcon className="h-5 w-5" />
            </span>
            <span className="font-serif-text text-xl font-medium text-gray-900 dark:text-gray-50">
                Stars
            </span>
        </>
    );
}

const RANGE = [1, 2, 3];

export function Options() {
    const { stars } = useLoaderData() as Route.ComponentProps["loaderData"];

    return (
        <DisclosurePanel>
            <div className="flex flex-col gap-6 pt-4">
                <button
                    aria-label="Show recommendations with no stars"
                    className={cx([
                        "pl-11 text-left font-serif-text text-xl hover:opacity-100",
                        stars === 0 ? "opacity-100" : "opacity-50",
                    ])}
                    name="stars"
                    type="submit"
                    value="0"
                >
                    No Stars
                </button>

                {RANGE.map(num => (
                    <button
                        aria-label={`Show ${num} star recommendations`}
                        className={cx([
                            "flex items-center gap-2 pl-11 hover:opacity-100",
                            stars === num ? "opacity-100" : "opacity-50",
                        ])}
                        key={num}
                        name="stars"
                        type="submit"
                        value={num}
                    >
                        {Array(num)
                            .fill(num)
                            .map((_, index) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: Nodes are identical
                                <Star filled={stars === num} key={index} />
                            ))}
                    </button>
                ))}
                <div className="pl-11">
                    <TokenButton
                        aria-label="Clear stars filter and show all reccomendations"
                        label="Clear"
                    />
                </div>
            </div>
        </DisclosurePanel>
    );
}

export function Filter() {
    return (
        <Disclosure
            className={values =>
                `${values.defaultClassName} border-t-2 border-black px-4 py-6 dark:border-white/50`
            }
        >
            <Form>
                <Heading>
                    <Button
                        className={values =>
                            `${values.defaultClassName} flex w-full items-center gap-6 px-2 py-3 text-black/50 focus-visible:outline-0 dark:text-white/50`
                        }
                        slot="trigger"
                    >
                        <Header />
                    </Button>
                </Heading>
                <Options />
            </Form>
        </Disclosure>
    );
}
