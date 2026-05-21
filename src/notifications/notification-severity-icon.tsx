import {
    faCheckCircle,
    faCircleExclamation,
    faTriangleExclamation,
} from "@fortawesome/sharp-regular-svg-icons";
import { Badge } from "@singlestore/fusion/components/badge";
import { FaIcon } from "@singlestore/fusion/components/icon";
import { Spinner } from "@singlestore/fusion/components/spinner";
import type { NotificationSeverity } from "@/notifications/types";
import * as React from "react";

const SEVERITY_CONFIG: Record<
    NotificationSeverity,
    {
        variant: "critical" | "warning" | "positive" | "info";
        icon?: typeof faTriangleExclamation;
    }
> = {
    critical: { variant: "critical", icon: faTriangleExclamation },
    warning: { variant: "warning", icon: faCircleExclamation },
    positive: { variant: "positive", icon: faCheckCircle },
    brand: { variant: "info" },
};

type NotificationSeverityIconProps = {
    severity: NotificationSeverity;
};

export function NotificationSeverityIcon({
    severity,
}: NotificationSeverityIconProps) {
    const { variant, icon } = SEVERITY_CONFIG[severity];

    return (
        <Badge
            variant={variant}
            className="notifications-page__severity-badge"
            aria-hidden
        >
            {severity === "brand" ? (
                <Spinner className="notifications-page__severity-spinner" />
            ) : icon ? (
                <FaIcon icon={icon} size="xs" />
            ) : null}
        </Badge>
    );
}
