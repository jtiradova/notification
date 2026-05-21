import {
    faBell,
    faCircleQuestion,
    faMagnifyingGlass,
    faSparkles,
    faUserPlus,
} from "@fortawesome/sharp-regular-svg-icons";
import { Header } from "@single-js/common/components/header/header";
import { Button, IconButton } from "@singlestore/fusion/components/button";
import { FaIcon } from "@singlestore/fusion/components/icon";
import { Flex, flex } from "@singlestore/fusion/components/layout";
import { Separator } from "@singlestore/fusion/components/separator";
import { Span } from "@singlestore/fusion/components/typography";
import { NotificationBellPopover } from "@/notifications/notification-popover";
import {
    MOCK_ALERT_NOTIFICATIONS,
    type NotificationItem,
} from "@/notifications/types";
import * as React from "react";

const logoUrl = "/singlestore-logo-black.svg";

import "@single-js/common/components/header/header.scss";
import "./preview-top-nav.scss";

type PreviewTopNavProps = {
    onViewAllNotifications: () => void;
};

export function PreviewTopNav({ onViewAllNotifications }: PreviewTopNavProps) {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [alerts, setAlerts] = React.useState<Array<NotificationItem>>(() =>
        MOCK_ALERT_NOTIFICATIONS.map((item) => ({ ...item }))
    );

    const hasUnreadAlerts = React.useMemo(
        () => alerts.some((item) => item.unread),
        [alerts]
    );

    return (
        <Flex width="full" className="notifications-preview-top-nav">
            <Header
                className="notifications-preview-top-nav__header global-header"
                left={
                    <Flex alignItems="center" className={flex({ alignItems: "center" })}>
                        <img
                            src={logoUrl}
                            alt="SingleStore"
                            className="notifications-preview-top-nav__logo"
                        />
                    </Flex>
                }
                middle={<PreviewSearchBar />}
                right={
                    <Flex alignItems="center" gap="1x">
                        <IconButton
                            aria-label="Invite User"
                            icon={faUserPlus}
                            variant="ghost-neutral"
                        />
                        <Separator
                            orientation="vertical"
                            color="primary"
                            className="notifications-preview-top-nav__separator"
                        />
                        <Button
                            leftIcon={faSparkles}
                            variant="ghost-neutral"
                        >
                            Ask SQrL
                        </Button>
                        <span className="notifications-preview-top-nav__bell-wrap">
                            <NotificationBellPopover
                                open={popoverOpen}
                                onOpenChange={setPopoverOpen}
                                alerts={alerts}
                                onAlertsChange={setAlerts}
                                onViewAll={onViewAllNotifications}
                                trigger={
                                    <IconButton
                                        aria-label="Notifications"
                                        icon={faBell}
                                        variant="ghost-neutral"
                                        highlighted={popoverOpen}
                                    />
                                }
                            />
                            {hasUnreadAlerts ? (
                                <span
                                    className="notifications-preview-top-nav__bell-badge"
                                    aria-hidden
                                />
                            ) : null}
                        </span>
                        <IconButton
                            aria-label="Help"
                            icon={faCircleQuestion}
                            variant="ghost-neutral"
                        />
                    </Flex>
                }
            />
        </Flex>
    );
}

function PreviewSearchBar() {
    return (
        <div className="notifications-preview-top-nav__search" role="search">
            <FaIcon
                icon={faMagnifyingGlass}
                size="sm"
                className="notifications-preview-top-nav__search-icon"
            />
            <Span variant="body-2" className="notifications-preview-top-nav__search-placeholder">
                Search
            </Span>
            <kbd className="notifications-preview-top-nav__search-shortcut">
                <span>⌘</span>
                <span>+</span>
                <span>k</span>
            </kbd>
        </div>
    );
}
