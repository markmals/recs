import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext } from "react"
import type { Filter } from "~/routes/_index"

const FilterContext = createContext<[Filter, Dispatch<SetStateAction<Filter>>]>([
    { stars: null },
    () => {},
])

export const FilterProvider = FilterContext.Provider
export const useFilter = () => useContext(FilterContext)
