import { Box, Flex } from "@singlestore/fusion/components/layout";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@singlestore/fusion/components/popover";
import {
    Step,
    StepIndicator,
    StepIndicatorContent,
    StepSeparator,
    StepTitle,
} from "@singlestore/fusion/components/stepper/step";
import { Stepper } from "@singlestore/fusion/components/stepper/stepper";
import { useSteps } from "@singlestore/fusion/components/stepper/use-steps";
import { Bold, Paragraph } from "@singlestore/fusion/components/typography";
import React from "react";

export default {
    title: "Components / Stepper",
};

const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
];

export const Horizontal = () => {
    const stepper = useSteps({
        defaultIndex: 1,
        count: steps.length,
    });

    return (
        <>
            <Stepper index={stepper.index}>
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        clickable
                        onClick={() => stepper.setIndex(index)}
                    >
                        <StepIndicator>
                            <StepIndicatorContent />
                        </StepIndicator>

                        <StepTitle>{step.title}</StepTitle>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>

            <Flex gap="1x" mt="2x">
                <button
                    onClick={stepper.goToPrevious}
                    disabled={stepper.isAtFirst || stepper.isComplete}
                >
                    Prev
                </button>
                <Paragraph>
                    <Bold>{stepper.progressPercentage}%</Bold>
                </Paragraph>
                <button
                    onClick={stepper.goToNext}
                    disabled={stepper.isComplete}
                >
                    {stepper.isAtLast ? "Finish" : "Next"}
                </button>
                {stepper.isComplete && (
                    <button onClick={() => stepper.setIndex(0)}>Reset</button>
                )}
            </Flex>
        </>
    );
};

export const Vertical = () => {
    const stepper = useSteps({
        defaultIndex: 1,
        count: steps.length,
    });

    return (
        <>
            <Stepper index={stepper.index} orientation="vertical">
                {steps.map((step, index) => (
                    <>
                        <Step
                            clickable
                            key={index}
                            onClick={() => stepper.setIndex(index)}
                        >
                            <StepIndicator>
                                <StepIndicatorContent />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                            </Box>
                        </Step>
                        <StepSeparator />
                    </>
                ))}
            </Stepper>

            <Flex gap="1x" mt="2x">
                <button
                    onClick={stepper.goToPrevious}
                    disabled={stepper.isAtFirst || stepper.isComplete}
                >
                    Prev
                </button>
                <Paragraph>
                    <Bold>{stepper.progressPercentage}%</Bold>
                </Paragraph>
                <button
                    onClick={stepper.goToNext}
                    disabled={stepper.isComplete}
                >
                    {stepper.isAtLast ? "Finish" : "Next"}
                </button>
                {stepper.isComplete && (
                    <button onClick={() => stepper.setIndex(0)}>Reset</button>
                )}
            </Flex>
        </>
    );
};

type FeedbackReason = "confusing" | "unclear" | "didnt-work" | "other";

const feedbackSteps = [
    { title: "Select a reason" },
    { title: "Give more details" },
];

export const Minimal = () => {
    const [selectedFeedback, setSelectedFeedback] =
        React.useState<FeedbackReason>();

    const stepper = useSteps({
        defaultIndex: 0,
        count: feedbackSteps.length,
    });

    const resetFeedback = () => {
        setSelectedFeedback(undefined);
        stepper.setIndex(0);
    };

    const canNavigateToStep = (targetIndex: number, currentIndex: number) => {
        if (targetIndex === currentIndex) return false;

        switch (targetIndex) {
            case 0:
                return true;

            case 1:
                return !!selectedFeedback;
        }
    };

    function handleClickFeedbackButton(
        event: React.MouseEvent<HTMLButtonElement>
    ) {
        setSelectedFeedback(event.currentTarget.value as FeedbackReason);
        stepper.goToNext();
    }

    function handleSubmitFeedback() {
        alert("Feedback submitted");
        stepper.goToNext();
    }

    const feedbackStepsContent: Record<number, React.ReactNode> = {
        0: (
            <>
                <style>
                    {`
                    .feedback-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        gap: var(--sui-space-1x);
                    }
                    `}
                </style>
                <Paragraph mb="1x">
                    <Bold>No, because:</Bold>
                </Paragraph>
                <ul className="feedback-list">
                    <li>
                        <button
                            onClick={handleClickFeedbackButton}
                            value="confusing"
                        >
                            Organization was confusing
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleClickFeedbackButton}
                            value="unclear"
                        >
                            Content was unclear
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleClickFeedbackButton}
                            value="didnt-work"
                        >
                            Instructions did not work
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleClickFeedbackButton}
                            value="other"
                        >
                            Other
                        </button>
                    </li>
                </ul>
            </>
        ),
        1: (
            <Flex flexDirection="column" gap="1x">
                <Paragraph mb="1x">
                    <Bold>Can you be more specific?</Bold>
                </Paragraph>
                <textarea />
                <input type="email" placeholder="Email address (optional)" />
                <button onClick={handleSubmitFeedback}>Submit</button>
            </Flex>
        ),
        2: (
            <>
                <Paragraph mb="1x">
                    <Bold>Thank you for your feedback!</Bold>
                </Paragraph>
            </>
        ),
    };

    return (
        <>
            <pre>{JSON.stringify({ selectedFeedback }, null, 2)}</pre>

            <Popover
                onOpenChange={(open) => {
                    if (!open) {
                        resetFeedback();
                    }
                }}
            >
                <PopoverTrigger>Trigger</PopoverTrigger>
                <PopoverContent>
                    <PopoverClose />
                    {feedbackStepsContent[stepper.index]}

                    {!stepper.isComplete && (
                        <Stepper
                            variant="subdued"
                            index={stepper.index}
                            justifyContent="center"
                        >
                            {feedbackSteps.map((step, index) => (
                                <Step
                                    key={index}
                                    title={step.title}
                                    clickable={canNavigateToStep(
                                        index,
                                        stepper.index
                                    )}
                                    onClick={() => {
                                        if (
                                            canNavigateToStep(
                                                index,
                                                stepper.index
                                            )
                                        ) {
                                            stepper.setIndex(index);
                                        }
                                    }}
                                >
                                    <StepIndicator />
                                </Step>
                            ))}
                        </Stepper>
                    )}
                </PopoverContent>
            </Popover>
        </>
    );
};
