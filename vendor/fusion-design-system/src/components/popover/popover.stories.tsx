import { Button } from "@singlestore/fusion/components/button";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@singlestore/fusion/components/popover/popover";
import { Bold, Paragraph } from "@singlestore/fusion/components/typography";

export default {
    title: "Components / Popover",
};

export const BasicUsage = () => {
    return (
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

            <Popover>
                <PopoverTrigger asChild>
                    <Button>Trigger</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverClose />
                    <Paragraph mb="1x">
                        <Bold>No, because:</Bold>
                    </Paragraph>
                    <ul className="feedback-list">
                        <li>
                            <Button>Organization was confusing</Button>
                        </li>
                        <li>
                            <Button>Content was unclear</Button>
                        </li>
                        <li>
                            <Button>Instructions did not work</Button>
                        </li>
                        <li>
                            <Button>Other</Button>
                        </li>
                    </ul>
                </PopoverContent>
            </Popover>
        </>
    );
};
