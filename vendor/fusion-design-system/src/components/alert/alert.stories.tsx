import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";

import {
    Alert,
    AlertBody,
    AlertTitle,
    AlertDescription,
    AlertRoot,
    AlertIcon,
} from "@singlestore/fusion/components/alert";
import { Paragraph } from "@singlestore/fusion/components/typography";
import { faBug } from "@fortawesome/sharp-solid-svg-icons";

const meta: Meta<typeof Alert> = {
    title: "Components / Alert",
    tags: ["autodocs"],
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
    component: Alert,
};

export default meta;

export const VariantInfo = () => (
    <Alert
        variant="info"
        title="This is a Title"
        description="This is a Description"
    />
);

export const VariantPositive = () => (
    <Alert
        variant="positive"
        title="This is a Title"
        description="This is a Description"
    />
);

export const VariantWarning = () => (
    <Alert
        variant="warning"
        title="This is a Title"
        description="This is a Description"
    />
);

export const VariantCritical = () => (
    <Alert
        variant="critical"
        title="This is a Title"
        description="This is a Description"
    />
);

export const Loading = () => (
    <Alert
        loading
        title="This is a Title"
        description="This is a Description"
    />
);

export const SquareCorners = () => (
    <Alert
        squareCorners
        title="This is a Title"
        description="This is a Description"
    />
);

export const WithoutTitle = () => <Alert description="This is a Description" />;

export const WithoutIcon = () => (
    <Alert
        title="This is a Title"
        description="This is a Description"
        icon={null}
    />
);

export const WithCustomIcon = () => (
    <Alert
        title="This is a Title"
        description="This is a Description"
        icon={faBug}
    />
);

export const OnCloseHandler = () => (
    <Alert
        title="This is a Title"
        description="This is a Description"
        onClose={action("onClose")}
    />
);

export const WithAlertRoot = () => {
    return (
        <AlertRoot variant="info">
            <AlertIcon />
            <AlertBody>
                <AlertTitle>This is a Title</AlertTitle>
                <AlertDescription>This is a Description</AlertDescription>
                <Paragraph variant="body-1">
                    This is an extra element passed to AlertBody
                </Paragraph>
            </AlertBody>
        </AlertRoot>
    );
};
