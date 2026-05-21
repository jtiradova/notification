import { NotificationsPageView } from "@/notifications/notifications-page";
import { Box } from "@singlestore/fusion/components/layout";
import * as React from "react";

import { PreviewTopNav } from "./preview-top-nav";

import "./preview-top-nav.scss";
import "./app.scss";

export function NotificationsPreviewApp() {
    const [showFullPage, setShowFullPage] = React.useState(false);

    return (
        <Box
            className={
                showFullPage
                    ? "notifications-preview-app notifications-preview-app--with-page"
                    : "notifications-preview-app"
            }
        >
            <PreviewTopNav
                onViewAllNotifications={() => setShowFullPage(true)}
            />
            {showFullPage ? (
                <NotificationsPageView />
            ) : (
                <Box className="notifications-preview-app__canvas" />
            )}
        </Box>
    );
}
