import {
    faChevronDown,
    faGear,
    faMagnifyingGlass,
} from "@fortawesome/sharp-regular-svg-icons";
import { Button, IconButton } from "@singlestore/fusion/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@singlestore/fusion/components/dropdown-menu";
import { FaIcon } from "@singlestore/fusion/components/icon";
import { Box, Flex } from "@singlestore/fusion/components/layout";
import { Span } from "@singlestore/fusion/components/typography";
import { NotificationUnreadToggle } from "@/notifications/notification-unread-toggle";
import type {
    DateRangeFilter,
    NotificationResourceFilter,
    NotificationTypeFilter,
} from "@/notifications/types";
import * as React from "react";

const TYPE_OPTIONS: Array<{ value: NotificationTypeFilter; label: string }> = [
    { value: "all", label: "All" },
    { value: "critical", label: "Critical" },
    { value: "warning", label: "Warning" },
    { value: "update", label: "Update" },
    { value: "progress", label: "In progress" },
];

const RESOURCE_OPTIONS: Array<{
    value: NotificationResourceFilter;
    label: string;
}> = [
    { value: "all", label: "All" },
    { value: "workspace", label: "Workspace" },
    { value: "organization", label: "Organization" },
];

type NotificationFiltersProps = {
    search: string;
    onSearchChange: (value: string) => void;
    typeFilter: NotificationTypeFilter;
    onTypeFilterChange: (value: NotificationTypeFilter) => void;
    resourceFilter: NotificationResourceFilter;
    onResourceFilterChange: (value: NotificationResourceFilter) => void;
    onlyUnread?: boolean;
    onOnlyUnreadChange?: (value: boolean) => void;
    unreadCount?: number;
    showUnreadToggle?: boolean;
    showTypeFilter?: boolean;
};

export function NotificationFilters({
    search,
    onSearchChange,
    typeFilter,
    onTypeFilterChange,
    resourceFilter,
    onResourceFilterChange,
    onlyUnread = false,
    onOnlyUnreadChange,
    unreadCount = 0,
    showUnreadToggle = false,
    showTypeFilter = true,
}: NotificationFiltersProps) {
    const typeLabel =
        TYPE_OPTIONS.find((option) => option.value === typeFilter)?.label ??
        "All";
    const resourceLabel =
        RESOURCE_OPTIONS.find((option) => option.value === resourceFilter)
            ?.label ?? "All";

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            gap="2x"
            flexWrap="wrap"
            className="notifications-page__filters"
        >
            <Flex alignItems="center" gap="1x" flexWrap="wrap">
                <Box className="notifications-page__search">
                    <FaIcon
                        icon={faMagnifyingGlass}
                        size="sm"
                        className="notifications-page__search-icon"
                    />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search..."
                        className="notifications-page__search-input"
                        aria-label="Search notifications"
                    />
                </Box>
                {showTypeFilter ? (
                    <FilterDropdown
                        label="Type"
                        displayValue={typeLabel}
                        value={typeFilter}
                        options={TYPE_OPTIONS}
                        onValueChange={onTypeFilterChange}
                    />
                ) : null}
                <FilterDropdown
                    label="Resource"
                    displayValue={resourceLabel}
                    value={resourceFilter}
                    options={RESOURCE_OPTIONS}
                    onValueChange={onResourceFilterChange}
                />
            </Flex>
            {showUnreadToggle && onOnlyUnreadChange ? (
                <Flex
                    alignItems="center"
                    gap="1x"
                    className="notifications-page__unread-toggle"
                >
                    <Span
                        variant="body-2"
                        className="notifications-page__unread-label"
                    >
                        Only show unread ({unreadCount})
                    </Span>
                    <NotificationUnreadToggle
                        checked={onlyUnread}
                        onCheckedChange={onOnlyUnreadChange}
                    />
                </Flex>
            ) : null}
        </Flex>
    );
}

type FilterDropdownProps<T extends string> = {
    label: string;
    displayValue: string;
    value: T;
    options: Array<{ value: T; label: string }>;
    onValueChange: (value: T) => void;
};

function FilterDropdown<T extends string>({
    label,
    displayValue,
    value,
    options,
    onValueChange,
}: FilterDropdownProps<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    variant="outline-neutral"
                    size="medium"
                    rightIcon={faChevronDown}
                    className="notifications-page__filter-trigger"
                >
                    <Span
                        variant="body-2"
                        className="notifications-page__filter-prefix"
                    >
                        {label}:
                    </Span>
                    <Span
                        variant="body-2"
                        className="notifications-page__filter-value"
                    >
                        {displayValue}
                    </Span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                    value={value}
                    onValueChange={(nextValue) =>
                        onValueChange(nextValue as T)
                    }
                >
                    {options.map((option) => (
                        <DropdownMenuRadioItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export type NotificationPageHeaderActionsProps = {
    dateRange: DateRangeFilter;
    onDateRangeChange: (value: DateRangeFilter) => void;
    onSettingsClick?: () => void;
};

const DATE_RANGE_OPTIONS: Array<{
    value: DateRangeFilter;
    label: string;
}> = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
];

export function NotificationPageHeaderActions({
    dateRange,
    onDateRangeChange,
    onSettingsClick,
}: NotificationPageHeaderActionsProps) {
    const dateLabel =
        DATE_RANGE_OPTIONS.find((option) => option.value === dateRange)
            ?.label ?? "Last 30 days";

    return (
        <Flex alignItems="center" gap="1x">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="outline-neutral"
                        size="medium"
                        rightIcon={faChevronDown}
                    >
                        <Span variant="body-2">{dateLabel}</Span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                        value={dateRange}
                        onValueChange={(nextValue) =>
                            onDateRangeChange(nextValue as DateRangeFilter)
                        }
                    >
                        {DATE_RANGE_OPTIONS.map((option) => (
                            <DropdownMenuRadioItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <IconButton
                variant="outline-neutral"
                size="medium"
                square
                icon={faGear}
                aria-label="Notification settings"
                onClick={onSettingsClick}
            />
        </Flex>
    );
}
