import { faker } from "@faker-js/faker";
import type { Meta } from "@storybook/react";
import { Paragraph } from ".";
import { Code } from "./code";

const words = faker.lorem.words(2);
const code = faker.lorem.word();

const meta: Meta<typeof Code> = {
    title: "Components / Code",
    component: Code,
    tags: ["autodocs"],
};

export default meta;

export const Showcase = () => <Code>{code}</Code>;

export const VariantCode1 = () => <Code variant="code-1">{code}</Code>;

export const VariantCode2 = () => <Code variant="code-2">{code}</Code>;

export const AppearanceSurface = () => <Code appearance="surface">{code}</Code>;

/**
 * If `variant` isn't specified, it inherits the `font-size` from the parent.
 */
export const Inline = () => (
    <>
        <Paragraph variant="body-2">
            {words} <Code>{code}</Code> {words}
        </Paragraph>
        <Paragraph variant="body-4">
            {words} <Code>{code}</Code> {words}
        </Paragraph>
        <Paragraph variant="heading-5">
            {words} <Code>{code}</Code> {words}
        </Paragraph>
    </>
);

export const InlineWithVariant = () => (
    <Paragraph variant="heading-6">
        {words} <Code variant="code-1">{code}</Code> {words}
    </Paragraph>
);

/**
 * If `variant` isn't specified, it inherits the `font-size` from the parent.
 */
export const InlineWithAppearanceSurface = () => (
    <>
        <Paragraph variant="body-2">
            {words} <Code appearance="surface">{code}</Code> {words}
        </Paragraph>
        <Paragraph variant="body-4">
            {words} <Code appearance="surface">{code}</Code> {words}
        </Paragraph>
        <Paragraph variant="heading-5">
            {words} <Code appearance="surface">{code}</Code> {words}
        </Paragraph>
    </>
);

export const InlineWithAppearanceSurfaceAndVariant = () => (
    <Paragraph variant="heading-6">
        {words}{" "}
        <Code appearance="surface" variant="code-1">
            {code}
        </Code>{" "}
        {words}
    </Paragraph>
);
