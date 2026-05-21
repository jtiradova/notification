import React from "react";
import { Slider } from "@singlestore/fusion/components/slider";
import { Paragraph } from "@singlestore/fusion/components/typography";
import { Box } from "@singlestore/fusion/components/layout";
import { Button } from "@singlestore/fusion/components/button";

export default {
    title: "Components / Slider",
};

export const WithDefaultValue = () => {
    return (
        <Box width="100x">
            <Slider defaultValue={[50]} />
        </Box>
    );
};

export const DisabledSlider = () => {
    return (
        <div>
            <Slider defaultValue={[30]} disabled />
        </div>
    );
};

export const ControlledSlider = () => {
    const [value, setValue] = React.useState([40]);

    const handleChange = (newValue: Array<number>) => {
        setValue(newValue);
    };

    return (
        <Box width="100x">
            <Slider
                value={value}
                onValueChange={handleChange}
                min={0}
                max={100}
                step={1}
            />
            <Paragraph>Value: {value}</Paragraph>
        </Box>
    );
};

export const SliderWithInput = () => {
    const [value, setValue] = React.useState([40]);

    const handleChange = (newValue: Array<number>) => {
        setValue(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        // Clamp value between 0 and 100
        const clamped = Math.max(0, Math.min(100, inputValue));
        setValue([clamped]);
    };

    return (
        <Box width="100x">
            <Slider
                value={value}
                onValueChange={handleChange}
                min={0}
                max={100}
                step={1}
            />
            <input
                type="number"
                min={0}
                max={100}
                value={value[0]}
                onChange={handleInputChange}
                style={{ width: 60 }}
            />
        </Box>
    );
};

export const WithLabels = () => {
    const [value, setValue] = React.useState([1500]);
    const [disabled, setDisabled] = React.useState(false);
    const sliderLabels = [
        { label: "0", value: 0 },
        { label: "10", value: 10 },
        { label: "50", value: 50 },
        { label: "100", value: 100 },
    ];
    return (
        <Box width="100x">
            <Slider
                value={value}
                onValueChange={setValue}
                min={0}
                max={100}
                step={1}
                sliderLabels={sliderLabels}
                disabled={disabled}
                variant="outline-brand"
            />
            <Paragraph>Value: {value}</Paragraph>
            <Button type="button" onClick={() => setDisabled((d) => !d)}>
                {disabled ? "Enable" : "Disable"} slider
            </Button>
        </Box>
    );
};
