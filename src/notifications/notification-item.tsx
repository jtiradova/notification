import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@singlestore/fusion/components/button";
import { Box, Flex } from "@singlestore/fusion/components/layout";
import { Span } from "@singlestore/fusion/components/typography";
import { NotificationSeverityIcon } from "@/notifications/notification-severity-icon";
import type { NotificationItem } from "@/notifications/types";
import * as React from "react";

type NotificationListItemProps = {
    item: NotificationItem;
    onMarkAsRead?: (id: string) => void;
};

export function NotificationListItem({
    item,
    onMarkAsRead,
}: NotificationListItemProps) {
    const resourceVariant =
        item.resourceVariant === "link" ? "link" : "neutral";

    const handleActionClick = React.useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            if (onMarkAsRead && item.unread) {
                onMarkAsRead(item.id);
            }
        },
        [item.id, item.unread, onMarkAsRead]
    );

    return (
        <Box className="notifications-page__list-item" role="listitem">
            <Flex gap="1x" alignItems="start">
                <NotificationSeverityIcon severity={item.severity} />
                <Flex
                    flexDirection="column"
                    gap="1x"
                    flex="1"
                    minWidth="0"
                    className="notifications-page__item-content"
                >
                    <Flex
                        alignItems="start"
                        justifyContent="space-between"
                        gap="2x"
                    >
                        <Flex
                            alignItems="center"
                            gap="1x"
                            flexWrap="wrap"
                            minWidth="0"
                            className="notifications-page__item-heading"
                        >
                            <Span
                                variant="heading-1"
                                className="notifications-page__title"
                                data-unread={item.unread || undefined}
                            >
                                {item.title}
                            </Span>
                            <Span
                                variant="body-1"
                                className="notifications-page__timestamp"
                            >
                                {item.timestamp}
                            </Span>
                        </Flex>
                        {item.action ? (
                            <Box className="notifications-page__item-action">
                                <NotificationAction
                                    action={item.action}
                                    onClick={handleActionClick}
                                />
                            </Box>
                        ) : null}
                    </Flex>
                    <Span
                        variant="body-1"
                        className="notifications-page__resource"
                        data-variant={resourceVariant}
                    >
                        {item.resource}
                    </Span>
                    {item.descriptionParts ? (
                        <Span
                            variant="body-1"
                            className="notifications-page__description"
                        >
                            {item.descriptionParts.before}
                            <a
                                href={`mailto:${item.descriptionParts.link}`}
                                className="notifications-page__description-link"
                            >
                                {item.descriptionParts.link}
                            </a>
                            {item.descriptionParts.after}
                        </Span>
                    ) : item.description ? (
                        <Span
                            variant="body-1"
                            className="notifications-page__description"
                        >
                            {item.description}
                        </Span>
                    ) : null}
                    {item.progress !== undefined ? (
                        <Flex
                            alignItems="center"
                            gap="1-25x"
                            className="notifications-page__progress-row"
                        >
                            <Box className="notifications-page__progress-track">
                                <Box
                                    className="notifications-page__progress-fill"
                                    style={{
                                        width: `${item.progress}%`,
                                    }}
                                />
                            </Box>
                            <Span
                                variant="body-2"
                                className="notifications-page__progress-label"
                            >
                                {item.progress}%
                            </Span>
                        </Flex>
                    ) : null}
                </Flex>
            </Flex>
        </Box>
    );
}

function NotificationAction({
    action,
    onClick,
}: {
    action: NonNullable<NotificationItem["action"]>;
    onClick: (event: React.MouseEvent) => void;
}) {
    if (action.kind === "link") {
        return (
            <Button
                variant="ghost-brand"
                size="small"
                leftIcon={
                    action.icon === "resize" ? faArrowsUpDown : undefined
                }
                className="notifications-page__action-link"
                onClick={onClick}
            >
                {action.label}
            </Button>
        );
    }

    return (
        <Button
            variant={action.variant ?? "outline-neutral"}
            size="small"
            className="notifications-page__action-button"
            onClick={onClick}
        >
            {action.label}
        </Button>
    );
}
