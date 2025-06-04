import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";
import { Filters } from "./Filters";

export function MobileFilters() {
    return (
        <DialogTrigger>
            <Button
                className="font-serif-text rounded-lg border-2 border-black bg-amber-500 px-3 py-2 shadow-hard dark:bg-purple-600 lg:hidden"
                slot="trigger"
            >
                Filters
            </Button>
            <Modal className="lg:hidden">
                <Dialog className="fixed left-0 right-0 top-0 z-30 flex max-h-screen flex-col overflow-y-auto border-b-2 border-black bg-[#f9ecdf] p-6 shadow-hard-lg dark:bg-[#17191e] dark:border-white/50">
                    <Filters className="pt-0" />
                </Dialog>
            </Modal>
        </DialogTrigger>
    );
}
