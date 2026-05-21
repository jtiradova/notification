import { faCheckCircle } from "@fortawesome/sharp-regular-svg-icons";
import {
    faChevronDown,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/sharp-regular-svg-icons";
import { Badge } from "@singlestore/fusion/components/badge";
import { Button, IconButton } from "@singlestore/fusion/components/button";
import { FaIcon } from "@singlestore/fusion/components/icon";
import { Box, Flex } from "@singlestore/fusion/components/layout";
import { Span } from "@singlestore/fusion/components/typography";
import {
    ACTIVITY_PAGE_SIZE,
    type ActivityCreatedBy,
    type ActivityTableRow,
} from "@/notifications/types";
import * as React from "react";

import "./notification-activity-table.scss";

type NotificationActivityTableProps = {
    rows: Array<ActivityTableRow>;
    compact?: boolean;
    showFooter?: boolean;
};

const COLUMNS = [
    { id: "operation", label: "Operation", width: "20%" },
    { id: "resource", label: "Resource", width: "12%" },
    { id: "description", label: "Description", width: "30%" },
    { id: "createdBy", label: "Created by", width: "18%" },
    { id: "timestamp", label: "Timestamp", width: "20%" },
];

function formatCreatedBy(createdBy: ActivityCreatedBy): string {
    return createdBy.type === "automated" ? "Automated" : createdBy.label;
}

export function NotificationActivityTable({
    rows,
    compact = false,
    showFooter = true,
}: NotificationActivityTableProps) {
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / ACTIVITY_PAGE_SIZE));
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setPage(1);
    }, [total]);

    React.useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const pageRows = React.useMemo(() => {
        const start = (page - 1) * ACTIVITY_PAGE_SIZE;
        return rows.slice(start, start + ACTIVITY_PAGE_SIZE);
    }, [page, rows]);

    const rangeStart = total === 0 ? 0 : (page - 1) * ACTIVITY_PAGE_SIZE + 1;
    const rangeEnd = Math.min(page * ACTIVITY_PAGE_SIZE, total);

    return (
        <Box
            className="notification-activity-table"
            data-compact={compact || undefined}
        >
            <Box className="notification-activity-table__scroll">
                <table className="notification-activity-table__table">
                    <colgroup>
                        {COLUMNS.map((column) => (
                            <col
                                key={column.id}
                                style={{ width: column.width }}
                            />
                        ))}
                    </colgroup>
                    <thead className="notification-activity-table__thead">
                        <tr>
                            {COLUMNS.map((column) => (
                                <th
                                    key={column.id}
                                    className="notification-activity-table__header-cell"
                                    data-align={column.align}
                                >
                                    <Span variant="heading-1">{column.label}</Span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map((row) => (
                            <tr
                                key={row.id}
                                className="notification-activity-table__row"
                            >
                                <td className="notification-activity-table__cell">
                                    <Flex
                                        alignItems="center"
                                        gap="1x"
                                        className="notification-activity-table__operation"
                                    >
                                        <Badge
                                            variant="positive"
                                            className="notification-activity-table__operation-badge"
                                        >
                                            <FaIcon
                                                icon={faCheckCircle}
                                                size="xs"
                                            />
                                        </Badge>
                                        <Span
                                            variant="body-2"
                                            className="notification-activity-table__operation-label"
                                        >
                                            {row.operation}
                                        </Span>
                                    </Flex>
                                </td>
                                <td className="notification-activity-table__cell">
                                    <Span
                                        variant="body-2"
                                        className="notification-activity-table__resource"
                                    >
                                        {row.resource}
                                    </Span>
                                </td>
                                <td className="notification-activity-table__cell">
                                    <Span
                                        variant="body-2"
                                        className="notification-activity-table__description"
                                    >
                                        {row.description}
                                    </Span>
                                </td>
                                <td className="notification-activity-table__cell">
                                    <Span
                                        variant="body-2"
                                        className="notification-activity-table__created-by"
                                        data-automated={
                                            row.createdBy.type === "automated"
                                                ? true
                                                : undefined
                                        }
                                    >
                                        {formatCreatedBy(row.createdBy)}
                                    </Span>
                                </td>
                                <td className="notification-activity-table__cell">
                                    <Span
                                        variant="body-2"
                                        className="notification-activity-table__timestamp"
                                    >
                                        {row.timestamp}
                                    </Span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
            {showFooter ? (
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    className="notification-activity-table__footer"
                >
                    <Flex alignItems="center" gap="2x">
                        <Flex alignItems="center" gap="0-5x">
                            <Span
                                variant="body-1"
                                className="notification-activity-table__footer-label"
                            >
                                Items per page:
                            </Span>
                            <Button
                                variant="outline-neutral"
                                size="small"
                                rightIcon={faChevronDown}
                            >
                                {ACTIVITY_PAGE_SIZE}
                            </Button>
                        </Flex>
                        <Span
                            variant="body-1"
                            className="notification-activity-table__footer-label"
                        >
                            {rangeStart}-{rangeEnd} of {total}
                        </Span>
                    </Flex>
                    <Flex alignItems="center" gap="1x">
                        <Flex alignItems="center" gap="0-5x">
                            <Button
                                variant="outline-neutral"
                                size="small"
                                rightIcon={faChevronDown}
                            >
                                {page}
                            </Button>
                            <Span
                                variant="body-1"
                                className="notification-activity-table__footer-label"
                            >
                                of {totalPages} pages
                            </Span>
                        </Flex>
                        <IconButton
                            variant="ghost-neutral"
                            size="small"
                            square
                            icon={faChevronLeft}
                            aria-label="Previous page"
                            disabled={page <= 1}
                            onClick={() =>
                                setPage((current) => Math.max(1, current - 1))
                            }
                        />
                        <IconButton
                            variant="ghost-neutral"
                            size="small"
                            square
                            icon={faChevronRight}
                            aria-label="Next page"
                            disabled={page >= totalPages}
                            onClick={() =>
                                setPage((current) =>
                                    Math.min(totalPages, current + 1)
                                )
                            }
                        />
                    </Flex>
                </Flex>
            ) : null}
        </Box>
    );
}
