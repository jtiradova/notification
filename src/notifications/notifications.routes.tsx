import * as React from "react";
import { Route } from "react-router-dom";
import type { RouteType } from "routes";
import OrganizationRoute from "view/common/organizations/organization-route";

const NotificationsPage = React.lazy(
    () =>
        import(
            /* webpackPrefetch: true */ "@/notifications/notifications-page"
        )
);

export const ROUTES_DEFINITIONS = [
    {
        path: "/organizations/:orgID/notifications",
        layout: "main",
        sidebarLinkID: "Notifications",
        searchable: true,
        pageName: "Notifications" as const,
    },
] satisfies Array<RouteType>;

export type ROUTES_PATHS = "/organizations/:orgID/notifications";

export const ROUTES_COMPONENTS = (
    <Route
        path="notifications"
        element={
            <OrganizationRoute>
                {() => <NotificationsPage />}
            </OrganizationRoute>
        }
    />
);
