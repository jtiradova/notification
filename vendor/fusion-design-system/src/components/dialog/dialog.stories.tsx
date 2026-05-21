import { faClose } from "@fortawesome/sharp-solid-svg-icons";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@singlestore/fusion/components/dialog/primitive";
import { Flex } from "@singlestore/fusion/components/layout";
import { H1, Paragraph } from "@singlestore/fusion/components/typography";
import type { Meta, StoryObj } from "@storybook/react";
import { sourceIconTransform } from "../../utils/storybook";
import { Button, ButtonGroup, IconButton } from "../button";

const meta: Meta<typeof Dialog> = {
    title: "Primitives / Dialog",
    component: Dialog,
    // tags: ["autodocs"],
    parameters: {
        docs: {
            source: {
                transform: (code: string) => {
                    return sourceIconTransform(code);
                },
            },
        },
    },
};

export default meta;

export const Showcase: StoryObj<typeof Dialog> = {
    render: () => {
        return (
            <>
                <style>
                    {`
.sui-c-dialog__content {
	z-index: var(--sui-z-index-dialog);
	position:relative;
	background-color: var(--sui-color-background-surface);
  border-radius: var(--sui-radius-md);
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: var(--sui-space-3x);
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
							
.sui-c-dialog__overlay {
	background-color: rgba(0, 0, 0, 0.5);
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
}

.sui-c-dialog__close {
	position: absolute;
	top: var(--sui-space-2x);
	right: var(--sui-space-2x);
	z-index: 1;
}
`}
                </style>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogOverlay className="sui-c-dialog__overlay"></DialogOverlay>
                        <DialogContent className="sui-c-dialog__content">
                            <DialogClose asChild>
                                <IconButton
                                    variant="ghost-neutral"
                                    className="sui-c-dialog__close"
                                    icon={faClose}
                                    aria-label="Close"
                                />
                            </DialogClose>
                            <DialogTitle asChild>
                                <H1 variant="heading-3">Dialog Title</H1>
                            </DialogTitle>
                            <DialogDescription>
                                <Paragraph>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nulla quis lorem ut libero
                                    malesuada feugiat. Nulla quis lorem ut
                                    libero malesuada feugiat.
                                </Paragraph>
                            </DialogDescription>
                            <Flex justifyContent="end">
                                <ButtonGroup>
                                    <DialogClose asChild>
                                        <Button>Cancel</Button>
                                    </DialogClose>
                                    <Button variant="solid-brand">Save</Button>
                                </ButtonGroup>
                            </Flex>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </>
        );
    },
};
