import { faCheck } from "@fortawesome/sharp-solid-svg-icons";
import {
    ToggleRoot,
    ToggleThumb,
} from "@single-js/common/components/toggle/toggle";
import { FaIcon } from "@singlestore/fusion/components/icon";
import { cx } from "cva";
import * as React from "react";

import "@single-js/common/components/toggle/toggle.scss";

type NotificationUnreadToggleProps = {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

export function NotificationUnreadToggle({
    checked,
    onCheckedChange,
}: NotificationUnreadToggleProps) {
    return (
        <ToggleRoot
            size="small"
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-label="Only show unread notifications"
            className="notifications-page__unread-toggle-control"
        >
            <ToggleThumb>
                <FaIcon
                    icon={faCheck}
                    size="xs"
                    className={cx(
                        "sui-c-toggle__thumb-icon",
                        "sui-c-toggle__thumb-icon-checked"
                    )}
                />
            </ToggleThumb>
        </ToggleRoot>
    );
}
