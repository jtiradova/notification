import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { isObject } from "@singlestore/fusion/utils/assertion";
import React from "react";

/**
 * A Font Awesome icon definition or a React node.
 * Used for components that accept an `icon` prop (button, dropdown menu items, etc.)
 * @see FaIcon
 */
export type IconDefinitionOrNode = IconDefinition | React.ReactNode;

/**
 * Asserts whether the given icon is a Font Awesome icon definition.
 * @see IconDefinition
 */
export const isFaIconDefinition = (
    icon: IconDefinition | React.ReactNode
): icon is IconDefinition => {
    const asIcon = icon as IconDefinition;

    return (
        isObject(icon) &&
        "iconName" in asIcon &&
        asIcon.iconName !== undefined &&
        "prefix" in asIcon &&
        asIcon.prefix !== undefined &&
        "icon" in asIcon &&
        Array.isArray(asIcon.icon)
    );
};

export type FaIconDefinitionOrNodeProps = {
    icon: IconDefinitionOrNode;
};

/**
 * Renders a `FaIcon` or a React node, depending on the given `icon` prop.
 * Used for components that accept an `icon` prop (button, dropdown menu items, etc.)
 * @see FaIcon
 */
export const FaIconDefinitionOrNode = (props: FaIconDefinitionOrNodeProps) => {
    const { icon } = props;

    if (isFaIconDefinition(icon)) {
        return <FaIcon icon={icon} />;
    }

    return <>{icon}</>;
};
