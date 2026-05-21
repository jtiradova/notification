import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Badge } from "@singlestore/fusion/components/badge";
import { Button } from "@singlestore/fusion/components/button";
import { FaIcon } from "@singlestore/fusion/components/icon";
import { Box, Flex } from "@singlestore/fusion/components/layout";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@singlestore/fusion/components/popover/popover";
import { H2, Span } from "@singlestore/fusion/components/typography";
import { NotificationListItem } from "@/notifications/notification-item";
import type { NotificationItem } from "@/notifications/types";
import * as React from "react";

import "@singlestore/fusion/components/popover/popover.scss";
import "./notifications-page.scss";
import "./notification-popover.scss";

type NotificationPopoverPanelProps = {
    alerts: Array<NotificationItem>;
    onAlertsChange: (alerts: Array<NotificationItem>) => void;
    onViewAll?: () => void;
};

function NotificationPopoverEmptyState() {
    return (
        <Box className="notification-popover__empty-state">
            <Box className="notification-popover__empty-icon" aria-hidden>
                <FaIcon icon={faBell} size="lg" />
            </Box>
            <Span
                variant="heading-2"
                className="notification-popover__empty-title"
            >
                You&apos;re all caught up
            </Span>
            <Span variant="body-2" className="notification-popover__empty-message">
                You have no unread notifications.
            </Span>
        </Box>
    );
}

export function NotificationPopoverPanel({
    alerts,
    onAlertsChange,
    onViewAll,
}: NotificationPopoverPanelProps) {
    const unreadAlerts = React.useMemo(
        () => alerts.filter((item) => item.unread),
        [alerts]
    );

    const handleMarkAsRead = React.useCallback(
        (id: string) => {
            onAlertsChange(
                alerts.map((item) =>
                    item.id === id ? { ...item, unread: false } : item
                )
            );
        },
        [alerts, onAlertsChange]
    );

    const isEmpty = unreadAlerts.length === 0;

    return (
        <Box
            className="notification-popover"
            data-empty={isEmpty || undefined}
        >
            <Box className="notification-popover__header">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="2x"
                    className="notification-popover__header-row"
                >
                    <H2
                        variant="heading-2"
                        className="notification-popover__title"
                    >
                        Notifications
                    </H2>
                    <Button
                        variant="outline-neutral"
                        size="medium"
                        onClick={onViewAll}
                    >
                        View All
                    </Button>
                </Flex>
                {unreadAlerts.length > 0 ? (
                    <Flex
                        alignItems="center"
                        gap="1x"
                        className="notification-popover__subtitle"
                    >
                        <Span
                            variant="body-2"
                            className="notification-popover__subtitle-label"
                        >
                            Unread alert
                        </Span>
                        <Badge
                            variant="primary"
                            className="notification-popover__count-pill"
                        >
                            {unreadAlerts.length}
                        </Badge>
                    </Flex>
                ) : null}
            </Box>

            <Box className="notification-popover__scroll">
                {unreadAlerts.length > 0 ? (
                    <Box className="notification-popover__list" role="list">
                        {unreadAlerts.map((item) => (
                            <NotificationListItem
                                key={item.id}
                                item={item}
                                onMarkAsRead={handleMarkAsRead}
                            />
                        ))}
                    </Box>
                ) : (
                    <NotificationPopoverEmptyState />
                )}
            </Box>
        </Box>
    );
}

type NotificationBellPopoverProps = {
    trigger: React.ReactNode;
    alerts: Array<NotificationItem>;
    onAlertsChange: (alerts: Array<NotificationItem>) => void;
    onViewAll?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export function NotificationBellPopover({
    trigger,
    alerts,
    onAlertsChange,
    onViewAll,
    open,
    onOpenChange,
}: NotificationBellPopoverProps) {
    const hasUnreadAlerts = alerts.some((item) => item.unread);

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                sideOffset={8}
                className={
                    hasUnreadAlerts
                        ? "notification-popover__content sui-c-popover__content"
                        : "notification-popover__content notification-popover__content--empty sui-c-popover__content"
                }
            >
                <NotificationPopoverPanel
                    alerts={alerts}
                    onAlertsChange={onAlertsChange}
                    onViewAll={() => {
                        onOpenChange?.(false);
                        onViewAll?.();
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
