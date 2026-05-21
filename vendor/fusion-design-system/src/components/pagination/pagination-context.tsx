import { createContext } from "@singlestore/fusion/react-utils/context";
import type { usePagination } from "./use-pagination";

type PaginationContext = ReturnType<typeof usePagination>;

export const [PaginationContextProvider, usePaginationContext] =
    createContext<PaginationContext>({ name: "PaginationContext" });
