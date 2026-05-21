import * as React from "react";
import classNames from "classnames";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type {
    ComponentPropsWithout,
    RemovedProps,
} from "@singlestore/fusion/helpers";
import { extractProps } from "@singlestore/fusion/helpers/extract-props";
import type { MarginProps, GetPropDefTypes } from "@singlestore/fusion/props";
import { marginPropDefs } from "@singlestore/fusion/props";
import { avatarPropDefs } from "./avatar.props";
import { getSubtree } from "@singlestore/fusion/helpers/get-subtree";
import "./avatar.scss";
import { isString } from "@singlestore/fusion/utils/assertion";

type AvatarProps = MarginProps & AvatarImplProps;

/**
 * An image element with a fallback for representing an entity.
 *
 * It is used to represent an entity, such as a user, author or organization, with an image or initials. If an image fails to load or isn't available, a fallback with initials is displayed.
 */
export const Avatar = React.forwardRef<AvatarImplElement, AvatarProps>(
    (props, forwardedRef) => {
        const { asChild, children, className, style, ...imageProps } =
            extractProps(props, avatarPropDefs, marginPropDefs);

        return (
            <AvatarPrimitive.Root
                className={classNames("sui-reset", "sui-AvatarRoot", className)}
                style={style}
                asChild={asChild}
            >
                {getSubtree(
                    { asChild, children },
                    <AvatarImpl ref={forwardedRef} {...imageProps} />
                )}
            </AvatarPrimitive.Root>
        );
    }
);

Avatar.displayName = "Avatar";

type AvatarImplElement = React.ElementRef<typeof AvatarPrimitive.Image>;
type AvatarOwnProps = GetPropDefTypes<typeof avatarPropDefs>;

type AvatarImplProps = ComponentPropsWithout<
    typeof AvatarPrimitive.Image,
    RemovedProps
> &
    AvatarOwnProps & {
        fallback: NonNullable<AvatarOwnProps["fallback"]>;
    };

const AvatarImpl = React.forwardRef<AvatarImplElement, AvatarImplProps>(
    ({ fallback, ...imageProps }, forwardedRef) => {
        const [status, setStatus] = React.useState<"idle" | "loaded" | "error">(
            "idle"
        );

        const imgProvided = Boolean(imageProps.src);
        const showFallback = status === "error" || !imgProvided;

        let image = null;
        if (imgProvided) {
            image = (
                <img
                    ref={forwardedRef}
                    className="sui-AvatarImage"
                    {...imageProps}
                    onLoad={() => {
                        imageProps.onLoadingStatusChange?.("loaded");
                        setStatus("loaded");
                    }}
                    onError={() => {
                        imageProps.onLoadingStatusChange?.("error");
                        setStatus("error");
                    }}
                />
            );
        }

        let imageFallback = null;
        if (showFallback) {
            imageFallback = (
                <AvatarPrimitive.Fallback
                    className={classNames("sui-AvatarFallback", {
                        "sui-one-letter":
                            isString(fallback) && fallback.length === 1,
                        "sui-two-letters":
                            isString(fallback) && fallback.length === 2,
                    })}
                    delayMs={0}
                >
                    {fallback}
                </AvatarPrimitive.Fallback>
            );
        }

        return (
            <>
                {image}
                {imageFallback}
            </>
        );
    }
);

AvatarImpl.displayName = "AvatarImpl";
