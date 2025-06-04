import { createStore, get, set, type UseStore } from "idb-keyval";
import * as devalue from "devalue";
import type { HydratedRec } from "./data";

class Store<Value> {
    #store: UseStore;

    constructor(name: string) {
        this.#store = createStore(name, "store");
    }

    async get(key: string): Promise<Value | null> {
        const result = await get<string>(key, this.#store);
        return result ? devalue.parse(result) : null;
    }

    async set(key: string, value: Value) {
        const serialized = devalue.stringify(value);
        await set(key, serialized, this.#store);
    }
}

export const stores = {
    cache: new Store<HydratedRec[]>("cache"),
};
