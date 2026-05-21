export type NotificationTab = "alert" | "activity";

export type NotificationSeverity =
    | "critical"
    | "warning"
    | "positive"
    | "brand";

export type NotificationTypeFilter =
    | "all"
    | "critical"
    | "warning"
    | "update"
    | "progress";

export type NotificationTypeOption = Exclude<NotificationTypeFilter, "all">;

export type NotificationResourceFilter =
    | "all"
    | "workspace"
    | "organization";

export type DateRangeFilter = "7" | "30" | "90";

export type NotificationAction =
    | {
          kind: "button";
          label: string;
          variant?: "outline-neutral" | "outline-danger" | "ghost-brand";
      }
    | { kind: "link"; label: string; icon?: "resize" };

export type NotificationItem = {
    id: string;
    severity: NotificationSeverity;
    title: string;
    timestamp: string;
    resource: string;
    resourceVariant?: "link" | "neutral";
    description?: string;
    descriptionParts?: {
        before: string;
        link: string;
        after: string;
    };
    unread?: boolean;
    progress?: number;
    action?: NotificationAction;
    type: Exclude<NotificationTypeFilter, "all">;
    resourceType: Exclude<NotificationResourceFilter, "all">;
};

export type ActivityResourceType = "workspace" | "organization" | "database";

export type ActivityCreatedBy =
    | { type: "user"; label: string }
    | { type: "automated" };

export type ActivityTableRow = {
    id: string;
    operation: string;
    resource: string;
    resourceType: ActivityResourceType;
    description: string;
    createdBy: ActivityCreatedBy;
    timestamp: string;
};

export const ACTIVITY_PAGE_SIZE = 10;

export const MOCK_ALERT_NOTIFICATIONS: Array<NotificationItem> = [
    {
        id: "1",
        severity: "critical",
        title: "Query on Database to Fail",
        timestamp: "a min ago",
        resource: "Workspace 02",
        resourceVariant: "link",
        unread: true,
        type: "critical",
        resourceType: "workspace",
        action: {
            kind: "button",
            label: "View Query History",
            variant: "outline-neutral",
        },
    },
    {
        id: "5",
        severity: "critical",
        title: "Cluster connection lost",
        timestamp: "5 min ago",
        resource: "Workspace 02",
        resourceVariant: "link",
        unread: true,
        type: "critical",
        resourceType: "workspace",
        action: {
            kind: "button",
            label: "View Details",
            variant: "outline-neutral",
        },
    },
    {
        id: "2",
        severity: "warning",
        title: "Resource Usage has exceeded 80% for over 5 minutes",
        timestamp: "2 hours ago",
        resource: "Workspace 01",
        resourceVariant: "link",
        unread: true,
        type: "warning",
        resourceType: "workspace",
        action: {
            kind: "link",
            label: "Resize workspace to S-8",
            icon: "resize",
        },
    },
    {
        id: "6",
        severity: "warning",
        title: "Backup job failed",
        timestamp: "3 hours ago",
        resource: "prod-analytics",
        resourceVariant: "link",
        unread: true,
        type: "warning",
        resourceType: "workspace",
        action: {
            kind: "button",
            label: "View Logs",
            variant: "outline-neutral",
        },
    },
    {
        id: "7",
        severity: "critical",
        title: "Disk usage above 90%",
        timestamp: "4 hours ago",
        resource: "dev-etl",
        resourceVariant: "link",
        unread: true,
        type: "critical",
        resourceType: "workspace",
        action: {
            kind: "button",
            label: "View Details",
            variant: "outline-neutral",
        },
    },
    {
        id: "9",
        severity: "warning",
        title: "SSL certificate expiring soon",
        timestamp: "8 hours ago",
        resource: "Workspace 01",
        resourceVariant: "link",
        unread: true,
        type: "warning",
        resourceType: "workspace",
        action: {
            kind: "button",
            label: "Renew Certificate",
            variant: "outline-neutral",
        },
    },
    {
        id: "3",
        severity: "positive",
        title: "Update",
        timestamp: "Yesterday",
        resource: "Organization",
        resourceVariant: "neutral",
        description:
            "Changelog: FP Enabled, Distributed Plancache, Continuous Backups Enabled",
        unread: false,
        type: "update",
        resourceType: "organization",
    },
    {
        id: "4",
        severity: "brand",
        title: "Workspaces deployment in progress",
        timestamp: "May 12",
        resource: "Workspace 03",
        resourceVariant: "link",
        progress: 40,
        unread: true,
        type: "progress",
        resourceType: "workspace",
        action: {
            kind: "button",
            label: "Terminate",
            variant: "outline-danger",
        },
    },
];

export const MOCK_ACTIVITY_TABLE_ROWS: Array<ActivityTableRow> = [
    {
        id: "act-1",
        operation: "Audit Log",
        resource: "Organization",
        resourceType: "organization",
        description:
            "User alex.chen@singlestore.com signed in to SingleStore Cloud (SSO)",
        createdBy: { type: "user", label: "alex.chen@singlestore.com" },
        timestamp: "Jun 18, 09:12 AM",
    },
    {
        id: "act-2",
        operation: "Create",
        resource: "prod-analytics",
        resourceType: "workspace",
        description:
            "Workspace prod-analytics created in SingleStore database company org",
        createdBy: { type: "user", label: "sarah@singlestore.com" },
        timestamp: "Jun 18, 08:45 AM",
    },
    {
        id: "act-3",
        operation: "Update",
        resource: "prod-analytics",
        resourceType: "workspace",
        description:
            "Changelog: FP Enabled, Distributed Plancache, Continuous Backups Enabled",
        createdBy: { type: "automated" },
        timestamp: "Jun 17, 06:20 PM",
    },
    {
        id: "act-4",
        operation: "Audit Log",
        resource: "Organization",
        resourceType: "organization",
        description:
            "User sarah@singlestore.com added to organization, assigned to org owner team",
        createdBy: { type: "user", label: "sarah@singlestore.com" },
        timestamp: "Jun 17, 04:30 PM",
    },
    {
        id: "act-5",
        operation: "Grant",
        resource: "dev-etl",
        resourceType: "workspace",
        description:
            "Role workspace-admin granted to jordan.lee@singlestore.com on dev-etl",
        createdBy: { type: "user", label: "alex.chen@singlestore.com" },
        timestamp: "Jun 17, 02:15 PM",
    },
    {
        id: "act-6",
        operation: "Delete",
        resource: "staging-ml",
        resourceType: "workspace",
        description: "Workspace staging-ml deleted by morgan.kim@singlestore.com",
        createdBy: { type: "user", label: "morgan.kim@singlestore.com" },
        timestamp: "Jun 16, 11:40 AM",
    },
    {
        id: "act-7",
        operation: "Export",
        resource: "customer_360",
        resourceType: "database",
        description:
            "Audit export initiated for database customer_360 (prod-analytics)",
        createdBy: { type: "automated" },
        timestamp: "Jun 16, 10:05 AM",
    },
    {
        id: "act-8",
        operation: "Audit Log",
        resource: "prod-analytics",
        resourceType: "workspace",
        description:
            "API key helios-prod-read rotated; previous key invalidated",
        createdBy: { type: "automated" },
        timestamp: "Jun 15, 05:55 PM",
    },
    {
        id: "act-9",
        operation: "Update",
        resource: "dev-etl",
        resourceType: "workspace",
        description: "Compute size changed from S-4 to S-8 for workspace dev-etl",
        createdBy: { type: "user", label: "jordan.lee@singlestore.com" },
        timestamp: "Jun 15, 03:22 PM",
    },
    {
        id: "act-10",
        operation: "Create",
        resource: "events_ingest",
        resourceType: "database",
        description:
            "Database events_ingest created in workspace prod-analytics",
        createdBy: { type: "user", label: "jordan.lee@singlestore.com" },
        timestamp: "Jun 14, 01:18 PM",
    },
    {
        id: "act-11",
        operation: "Audit Log",
        resource: "Organization",
        resourceType: "organization",
        description:
            "Billing contact updated to finance@singlestore.com for SingleStore database company",
        createdBy: { type: "automated" },
        timestamp: "Jun 14, 09:00 AM",
    },
    {
        id: "act-12",
        operation: "Revoke",
        resource: "prod-analytics",
        resourceType: "workspace",
        description:
            "Role workspace-viewer revoked from contractor@partner.io on prod-analytics",
        createdBy: { type: "user", label: "alex.chen@singlestore.com" },
        timestamp: "Jun 13, 07:48 PM",
    },
    {
        id: "act-13",
        operation: "Update",
        resource: "prod-analytics",
        resourceType: "workspace",
        description:
            "Changelog: FP Enabled Distributed | Plancache Continuous Backups Enabled",
        createdBy: { type: "automated" },
        timestamp: "Jun 13, 04:30 PM",
    },
    {
        id: "act-14",
        operation: "Login",
        resource: "Organization",
        resourceType: "organization",
        description:
            "User priya.nair@singlestore.com signed in from IP 203.0.113.42",
        createdBy: { type: "user", label: "priya.nair@singlestore.com" },
        timestamp: "Jun 13, 02:11 PM",
    },
    {
        id: "act-15",
        operation: "Deploy",
        resource: "dev-etl",
        resourceType: "workspace",
        description: "Deployment v2026.06.1 started for workspace dev-etl",
        createdBy: { type: "automated" },
        timestamp: "Jun 12, 06:35 PM",
    },
    {
        id: "act-16",
        operation: "Audit Log",
        resource: "customer_360",
        resourceType: "database",
        description:
            "SELECT audit: user analytics-svc ran query on customer_360 (42 rows)",
        createdBy: { type: "automated" },
        timestamp: "Jun 12, 04:02 PM",
    },
    {
        id: "act-17",
        operation: "Create",
        resource: "staging-ml",
        resourceType: "workspace",
        description:
            "Workspace staging-ml created for ML experimentation (SingleStore database company)",
        createdBy: { type: "user", label: "morgan.kim@singlestore.com" },
        timestamp: "Jun 11, 03:50 PM",
    },
    {
        id: "act-18",
        operation: "Update",
        resource: "Organization",
        resourceType: "organization",
        description: "Organization display name set to SingleStore database company",
        createdBy: { type: "user", label: "sarah@singlestore.com" },
        timestamp: "Jun 11, 11:15 AM",
    },
    {
        id: "act-19",
        operation: "Scale",
        resource: "prod-analytics",
        resourceType: "workspace",
        description: "Autoscale policy updated: min 2, max 8 nodes for prod-analytics",
        createdBy: { type: "automated" },
        timestamp: "Jun 10, 08:30 AM",
    },
    {
        id: "act-20",
        operation: "Audit Log",
        resource: "dev-etl",
        resourceType: "workspace",
        description:
            "Integration webhook configured for Slack #data-platform-alerts",
        createdBy: { type: "user", label: "jordan.lee@singlestore.com" },
        timestamp: "Jun 9, 05:12 PM",
    },
];

/** @deprecated Popover activity tab uses MOCK_ACTIVITY_TABLE_ROWS */
export const MOCK_ACTIVITY_POPOVER_ITEMS: Array<NotificationItem> = [];

/** @deprecated Use MOCK_ACTIVITY_TABLE_ROWS */
export const MOCK_ACTIVITY_NOTIFICATIONS: Array<NotificationItem> = [];

/** @deprecated Use MOCK_ALERT_NOTIFICATIONS */
export const MOCK_NOTIFICATIONS = MOCK_ALERT_NOTIFICATIONS;
