import { useMemo } from "react";
import { useControllableState } from "@singlestore/fusion/react-utils/use-controllable";

function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
}

export const DOTS = "dots";

export type PaginationOptions = {
    /** Page selected on initial render, defaults to 1 */
    defaultPage?: number;

    /** Controlled active page number */
    page?: number;

    /** Total amount of pages */
    total: number;

    /** Siblings amount on left/right side of selected page, defaults to 1 */
    siblings?: number;

    /** Amount of elements visible on left/right edges, defaults to 1  */
    boundaries?: number;

    /** Callback fired after change of each page */
    onPageChange?: (page: number) => void;
};

export function usePagination({
    total,
    siblings = 1,
    boundaries = 1,
    page: _page,
    defaultPage = 1,
    onPageChange: _onPageChange,
}: PaginationOptions) {
    const _total = Math.max(Math.trunc(total), 0);

    const [page, setCurrentPage] = useControllableState({
        value: _page,
        onValueChange: _onPageChange,
        defaultValue: defaultPage,
    });

    const onPageChange = (pageNumber: number) => {
        if (pageNumber <= 0) {
            setCurrentPage(1);
        } else if (pageNumber > _total) {
            setCurrentPage(_total);
        } else {
            setCurrentPage(pageNumber);
        }
    };

    const next = () => onPageChange(page + 1);
    const previous = () => onPageChange(page - 1);
    const first = () => onPageChange(1);
    const last = () => onPageChange(_total);

    const paginationRange = useMemo((): Array<number | "dots"> => {
        const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
        if (totalPageNumbers >= _total) {
            return range(1, _total);
        }

        const leftSiblingIndex = Math.max(page - siblings, boundaries);
        const rightSiblingIndex = Math.min(
            page + siblings,
            _total - boundaries
        );

        const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
        const shouldShowRightDots =
            rightSiblingIndex < _total - (boundaries + 1);

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = siblings * 2 + boundaries + 2;
            return [
                ...range(1, leftItemCount),
                DOTS,
                ...range(_total - (boundaries - 1), _total),
            ];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = boundaries + 1 + 2 * siblings;
            return [
                ...range(1, boundaries),
                DOTS,
                ...range(_total - rightItemCount, _total),
            ];
        }

        return [
            ...range(1, boundaries),
            DOTS,
            ...range(leftSiblingIndex, rightSiblingIndex),
            DOTS,
            ...range(_total - boundaries + 1, _total),
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_total, siblings, page]);

    return {
        range: paginationRange,
        page,
        onPageChange,
        next,
        previous,
        first,
        last,
    };
}
