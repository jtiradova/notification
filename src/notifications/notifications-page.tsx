import { Box, Flex } from "@singlestore/fusion/components/layout";
import { H1, Span } from "@singlestore/fusion/components/typography";
import { NotificationActivityTable } from "@/notifications/notification-activity-table";
import { NotificationListItem } from "@/notifications/notification-item";
import {
    NotificationFilters,
    NotificationPageHeaderActions,
} from "@/notifications/notification-filters";
import {
    MOCK_ACTIVITY_TABLE_ROWS,
    MOCK_ALERT_NOTIFICATIONS,
    type ActivityTableRow,
    type DateRangeFilter,
    type NotificationItem,
    type NotificationResourceFilter,
    type NotificationTab,
    type NotificationTypeFilter,
} from "@/notifications/types";
import * as React from "react";

import "./notification-activity-table.scss";
import "./notifications-page.scss";

const TABS: Array<{ id: NotificationTab; label: string }> = [
    { id: "alert", label: "Alert" },
    { id: "activity", label: "Activity" },
];

function filterNotifications({
    items,
    search,
    typeFilter,
    resourceFilter,
}: {
    items: Array<NotificationItem>;
    search: string;
    typeFilter: NotificationTypeFilter;
    resourceFilter: NotificationResourceFilter;
}) {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
        if (typeFilter !== "all" && item.type !== typeFilter) {
            return false;
        }

        if (resourceFilter !== "all" && item.resourceType !== resourceFilter) {
            return false;
        }

        if (!normalizedSearch) {
            return true;
        }

        const haystack = [
            item.title,
            item.resource,
            item.description ?? "",
            item.timestamp,
        ]
            .join(" ")
            .toLowerCase();

        return haystack.includes(normalizedSearch);
    });
}

function filterActivityRows({
    rows,
    search,
    resourceFilter,
}: {
    rows: Array<ActivityTableRow>;
    search: string;
    resourceFilter: NotificationResourceFilter;
}) {
    const normalizedSearch = search.trim().toLowerCase();

    return rows.filter((row) => {
        if (
            resourceFilter !== "all" &&
            row.resourceType !== resourceFilter
        ) {
            return false;
        }

        if (!normalizedSearch) {
            return true;
        }

        const createdByLabel =
            row.createdBy.type === "automated"
                ? "Automated"
                : row.createdBy.label;

        const haystack = [
            row.operation,
            row.resource,
            row.description,
            createdByLabel,
            row.timestamp,
        ]
            .join(" ")
            .toLowerCase();

        return haystack.includes(normalizedSearch);
    });
}

export function NotificationsPageView() {
    const [activeTab, setActiveTab] = React.useState<NotificationTab>("alert");
    const [search, setSearch] = React.useState("");
    const [typeFilter, setTypeFilter] =
        React.useState<NotificationTypeFilter>("all");
    const [resourceFilter, setResourceFilter] =
        React.useState<NotificationResourceFilter>("all");
    const [dateRange, setDateRange] = React.useState<DateRangeFilter>("30");
    const alertNotifications = MOCK_ALERT_NOTIFICATIONS;

    const filteredNotifications = React.useMemo(
        () =>
            filterNotifications({
                items: alertNotifications,
                search,
                typeFilter,
                resourceFilter,
            }),
        [alertNotifications, search, typeFilter, resourceFilter]
    );

    const filteredActivityRows = React.useMemo(
        () =>
            filterActivityRows({
                rows: MOCK_ACTIVITY_TABLE_ROWS,
                search,
                resourceFilter,
            }),
        [search, resourceFilter]
    );

    return (
        <Box className="notifications-page">
            <Box className="notifications-page__header-section">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="2x"
                    className="notifications-page__header"
                >
                    <H1
                        variant="heading-3"
                        className="notifications-page__page-title"
                    >
                        Notification
                    </H1>
                    <NotificationPageHeaderActions
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                    />
                </Flex>

                <Box className="notifications-page__tabs">
                    <Flex gap="2x" role="tablist" aria-label="Notification views">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className="notifications-page__tab"
                                    data-active={isActive || undefined}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <Span
                                        variant="label-1"
                                        className="notifications-page__tab-label"
                                    >
                                        {tab.label}
                                    </Span>
                                </button>
                            );
                        })}
                    </Flex>
                </Box>
            </Box>

            <Box className="notifications-page__body">
                <NotificationFilters
                    search={search}
                    onSearchChange={setSearch}
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    resourceFilter={resourceFilter}
                    onResourceFilterChange={setResourceFilter}
                    showTypeFilter={activeTab === "alert"}
                />

                {activeTab === "alert" ? (
                    <Box className="notifications-page__list" role="list">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((item) => (
                                <NotificationListItem key={item.id} item={item} />
                            ))
                        ) : (
                            <Box py="4x" className="notifications-page__empty">
                                <Span variant="body-2">
                                    No notifications match your filters.
                                </Span>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <NotificationActivityTable rows={filteredActivityRows} />
                )}
            </Box>
        </Box>
    );
}

export default NotificationsPageView;
