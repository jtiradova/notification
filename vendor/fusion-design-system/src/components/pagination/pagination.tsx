import React from "react";
import { Box } from "@singlestore/fusion/components/layout";
import type { PaginationOptions } from "@singlestore/fusion/components/pagination/use-pagination";
import {
    usePagination,
    DOTS,
} from "@singlestore/fusion/components/pagination/use-pagination";
import {
    PaginationContextProvider,
    usePaginationContext,
} from "@singlestore/fusion/components/pagination/pagination-context";
import { Button, IconButton } from "@singlestore/fusion/components/button";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import {
    faEllipsis,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/sharp-solid-svg-icons";
import { cx } from "cva";
import "./pagination.scss";

export type PaginationProps = React.ComponentProps<typeof Box> &
    PaginationOptions;

export const Pagination = React.forwardRef<
    React.ElementRef<typeof Box>,
    PaginationProps
>((props, forwardedRef) => {
    const {
        defaultPage,
        page,
        total,
        siblings,
        boundaries,
        onPageChange,
        children,
        className,
        ...rest
    } = props;

    const pagination = usePagination({
        defaultPage,
        page,
        total,
        siblings,
        boundaries,
        onPageChange,
    });

    return (
        <Box
            className={cx("sui-c-pagination", className)}
            ref={forwardedRef}
            {...rest}
        >
            <PaginationContextProvider value={pagination}>
                {children}
            </PaginationContextProvider>
        </Box>
    );
});

export const PaginationItems = React.forwardRef<
    React.ElementRef<typeof Box>,
    { className?: string }
>((props, forwardedRef) => {
    const { className } = props;
    const { page, range, onPageChange } = usePaginationContext();

    return (
        <Box
            className={cx("sui-c-pagination__items", className)}
            ref={forwardedRef}
        >
            {range?.map((item, index) => {
                let fragment;
                if (item === DOTS) {
                    fragment = <FaIcon icon={faEllipsis} />;
                } else {
                    fragment = (
                        <Button
                            variant={
                                item === page ? "outline-brand" : undefined
                            }
                            background={
                                item === page ? "surface-selected" : undefined
                            }
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </Button>
                    );
                }
                return <React.Fragment key={index}>{fragment}</React.Fragment>;
            })}
        </Box>
    );
});

export const PaginationPreviousButton = React.forwardRef<
    React.ElementRef<typeof IconButton>
>((_, forwardedRef) => {
    const { page, onPageChange } = usePaginationContext();

    return (
        <IconButton
            ref={forwardedRef}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            icon={faChevronLeft}
            aria-label="Previous"
        />
    );
});

export const PaginationNextButton = React.forwardRef<
    React.ElementRef<typeof IconButton>
>((_, forwardedRef) => {
    const { page, range, onPageChange } = usePaginationContext();

    return (
        <IconButton
            ref={forwardedRef}
            onClick={() => onPageChange(page + 1)}
            disabled={page === range?.[range.length - 1]}
            icon={faChevronRight}
            aria-label="Next"
        />
    );
});
