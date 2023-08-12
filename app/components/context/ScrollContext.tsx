import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext } from "react"

export const ScrollContext = createContext<Dispatch<SetStateAction<number>>>(() => {})

export const ScrollProvider = ScrollContext.Provider
export const useSetScrollPosition = () => useContext(ScrollContext)
