import { Button, Disclosure, DisclosurePanel } from "react-aria-components";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Filters } from "./Filters";

export function MobileFilters() {
    return (
        <Disclosure className="relative lg:hidden">
            {({ open }) => (
                <>
                    <Button
                        aria-label={open ? "Hide filters" : "Show filters"}
                        className="rounded-md p-1 text-black focus-visible:outline-0 dark:text-white"
                        slot="trigger"
                    >
                        {open
                            ? <XMarkIcon className="h-8 w-8" />
                            : <Bars3Icon className="h-8 w-8" />}
                    </Button>
                    <DisclosurePanel className="absolute left-0 right-0 top-full z-10 border-b-2 border-black bg-[#f9ecdf] p-6 shadow-hard-lg dark:border-white/50 dark:bg-[#17191e]">
                        <Filters className="pt-0" />
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
