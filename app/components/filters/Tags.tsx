import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cx } from "cva";
import { Form, useLoaderData } from "react-router";
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
                Tags
            </span>
        </>
    );
}

export function Options() {
    const { tags, tag } = useLoaderData() as Route.ComponentProps["loaderData"];

    return (
        <DisclosurePanel>
            <div className="flex flex-wrap gap-3 pl-11 pt-4">
                {tags.map((name: string) => (
                    <TokenButton
                        aria-label={`Show ${name} recommendations`}
                        className={cx(tag === name ? undefined : "opacity-50")}
                        key={name}
                        name="tag"
                        type="submit"
                        value={name}
                    >
                        {name}
                    </TokenButton>
                ))}
                <TokenButton
                    aria-label="Clear tag filter and show all recommendations"
                    label="Clear"
                />
            </div>
        </DisclosurePanel>
    );
}

export function Filter() {
    return (
        <Disclosure
            className={(values) =>
                `${values.defaultClassName} border-t-2 border-black px-4 py-6 dark:border-white/50`}
        >
            <Form>
                <Heading>
                    <Button
                        className={(values) =>
                            `${values.defaultClassName} flex w-full items-center gap-6 px-2 py-3 text-black/50 focus-visible:outline-0 dark:text-white/50`}
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
