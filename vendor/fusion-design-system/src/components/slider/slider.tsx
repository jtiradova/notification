import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Box } from "@singlestore/fusion/components/layout";
import { Label } from "@singlestore/fusion/components/typography";
import "./slider.scss";
import type { VariantProps } from "cva";
import { cva } from "cva";

export const slider = cva({
    base: "sui-c-slider__root",
    variants: {
        variant: {
            "solid-brand": "sui-c-slider--variant-solid-brand",
            "outline-brand": "sui-c-slider--variant-outline-brand",
        },
    },
    defaultVariants: {
        variant: "solid-brand",
    },
});

export type SliderLabel = {
    label?: string;
    value: number;
};

type SliderMarkLabel = {
    label?: string;
    value: number;
    position: number;
    onClick?: (value: number) => void;
    disabled?: boolean;
};

function SliderMarkLabel({
    label,
    value,
    position,
    onClick,
    disabled,
}: SliderMarkLabel) {
    if (!label) {
        return null;
    }

    return (
        <Label
            className="sui-c-slider__label"
            variant="label-2"
            style={{
                left: `${position}%`,
                transform: `translateX(-${position}%)`,
            }}
            onClick={() => onClick?.(value)}
            data-disabled={disabled}
        >
            {label}
        </Label>
    );
}

export const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentProps<typeof SliderPrimitive.Root> &
        VariantProps<typeof slider> & {
            sliderLabels?: Array<SliderLabel>;
        }
>(function Slider(props, forwardedRef) {
    const { disabled, min = 0, max = 100 } = props;
    const {
        value,
        defaultValue,
        className,
        sliderLabels = [],
        onValueChange,
        onValueCommit,
        ...rest
    } = props;

    // Controlled/uncontrolled value logic
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(() => {
        const initialValue = defaultValue ?? [min];
        // Cap initial value to max
        return initialValue.map((val) => Math.min(val, max));
    });
    // Cap controlled value to max
    const sliderValue = isControlled
        ? value?.map((val) => Math.min(val, max))
        : internalValue;

    const handleValueChange = React.useCallback(
        (val: Array<number>) => {
            // Cap values to the max limit
            const cappedValues = val.map((value) => Math.min(value, max));

            if (!isControlled) {
                setInternalValue(cappedValues);
            }
            onValueChange?.(cappedValues);
        },
        [isControlled, max, onValueChange]
    );

    const handleValueCommit = React.useCallback(
        (val: Array<number>) => {
            // Cap values to the max limit
            const cappedValues = val.map((value) => Math.min(value, max));
            onValueCommit?.(cappedValues);
        },
        [onValueCommit, max]
    );

    let controlledProps = {
        value: sliderValue,
        onValueChange: handleValueChange,
        onValueCommit: handleValueCommit,
    };

    if (isControlled) {
        controlledProps = {
            value,
            onValueChange: handleValueChange,
            onValueCommit: handleValueCommit,
        };
    }

    // Calculate positions for markers/labels
    const markerLabelOffsets = React.useMemo(() => {
        return sliderLabels.map(
            ({ value }) => ((value - min) / (max - min)) * 100
        );
    }, [sliderLabels, min, max]);

    const thumbs = React.useMemo(() => {
        return sliderValue?.map((val: number, i: number) => {
            // Calculate normalized percent from -1 to 1
            const percent = ((val - min) / (max - min)) * 2 - 1;
            // Shift by an amount to make sure the thumb covers the track
            const transform = `translateX(${percent}px)`;
            return (
                <SliderPrimitive.Thumb
                    className="sui-c-slider__thumb"
                    style={{ transform }}
                    key={i}
                />
            );
        });
    }, [max, min, sliderValue]);

    const handleLabelClick = React.useCallback(
        (val: number) => {
            if (disabled) {
                return;
            }

            // Cap value to the max limit
            const cappedValue = Math.min(val, max);

            if (isControlled && typeof props.onValueChange === "function") {
                props.onValueChange([cappedValue]);
            } else if (!isControlled && typeof onValueChange === "function") {
                onValueChange?.([cappedValue]);
            }
        },
        [disabled, max, isControlled, props, onValueChange]
    );

    const labels = React.useMemo(() => {
        if (sliderLabels.length === 0) {
            return null;
        }

        return (
            <Box className="sui-c-slider__labels">
                {sliderLabels.map(({ label, value }, i) => (
                    <SliderMarkLabel
                        key={value}
                        label={label}
                        value={value}
                        position={markerLabelOffsets[i]}
                        onClick={handleLabelClick}
                        disabled={disabled}
                    />
                ))}
            </Box>
        );
    }, [disabled, handleLabelClick, markerLabelOffsets, sliderLabels]);

    const markers = React.useMemo(() => {
        if (!sliderLabels?.length) {
            return null;
        }

        return sliderLabels.map((mark, i) => (
            <Box
                key={mark.value}
                style={{
                    left: `${markerLabelOffsets[i]}%`,
                    // Move the marker to the left by a percentage of its size
                    // Like this if the item is at position 0 it will be flush
                    // to the start of the container because it will not move
                    // left (0% of anything will be 0).
                    // If the item is at the end (100%) it will be pulled back
                    // to the to when the right side of the marker will be at
                    // the end of the marker container.
                    transform: `translateX(-${markerLabelOffsets[i]}%)`,
                }}
                className="sui-c-slider__marker"
                aria-hidden="true"
            />
        ));
    }, [sliderLabels, markerLabelOffsets]);

    return (
        <Box className={className} width="full">
            <SliderPrimitive.Root
                {...rest}
                {...controlledProps}
                ref={forwardedRef}
                className={slider({
                    variant: props.variant,
                })}
                disabled={disabled}
            >
                <SliderPrimitive.Track className="sui-c-slider__track">
                    <Box className="sui-c-slider__markers">{markers}</Box>
                    <SliderPrimitive.Range className="sui-c-slider__range" />
                </SliderPrimitive.Track>
                {thumbs}
            </SliderPrimitive.Root>
            {labels}
        </Box>
    );
});
