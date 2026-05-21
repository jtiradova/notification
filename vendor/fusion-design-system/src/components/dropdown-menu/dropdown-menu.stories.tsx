import {
    faChevronDown,
    faPause,
    faPlus,
    faTrash,
} from "@fortawesome/sharp-solid-svg-icons";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { Box } from "@singlestore/fusion/components/layout";
import {
    getSelectAllCheckedState,
    getSelectAllHandler,
    useCheckboxGroup,
} from "@singlestore/fusion/react-utils/use-checkbox-group";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxGroup,
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemStyled,
    DropdownMenuItemKeyboardShortcut,
    DropdownMenuItemSuffix,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuItemContent,
    DropdownMenuItemDescription,
    DropdownMenuItemIndicatorCheck,
    DropdownMenuItemIndicatorToggle,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuItemPrefix,
} from "./dropdown-menu";
import { Badge } from "../badge";
import { getCtrlOrCmdKey } from "../keyboard-shortcut/keyboard-shortcut";
import { Code, Paragraph } from "../typography";
import { Button } from "../button";

export default {
    title: "Components / DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
};

export function WithItemVariants() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger style={{ marginBottom: "5rem" }}>
                    <Button justifyContent="start" rightIcon={faChevronDown}>
                        Menu with Item Variants
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Group Label</DropdownMenuLabel>
                        <DropdownMenuItem>Simple Item</DropdownMenuItem>
                        <DropdownMenuItem leftIcon={faPlus}>
                            Item with Icon
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Item Variants</DropdownMenuLabel>
                        <DropdownMenuItem>
                            Rich Item (w/ badge)
                            <Badge variant="primary" ml="1x">
                                Primary
                            </Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem loading>
                            Loading state
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            Disabled state
                        </DropdownMenuItem>
                        <DropdownMenuItem leftIcon={faTrash} variant="danger">
                            Danger variant
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export function PreventMenuClosingAfterSelection() {
    const [checkboxOneEnabled, setCheckboxOneEnabled] = React.useState(true);
    const [checkboxTwoEnabled, setCheckboxTwoEnabled] = React.useState(true);

    return (
        <>
            <Paragraph mb="2x">
                By default, checkboxes and radio selection will close the
                dropdown menu. To override this, you'll have to use the event's{" "}
                <Code>preventDefault</Code> method
            </Paragraph>
            <DropdownMenu>
                <DropdownMenuTrigger style={{ marginBottom: "5rem" }}>
                    <Button justifyContent="start" rightIcon={faChevronDown}>
                        Checkbox Items
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuCheckboxItem
                            checked={checkboxOneEnabled}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={(value) =>
                                setCheckboxOneEnabled(value)
                            }
                            indicatorVariant="check"
                        >
                            Check Variant
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={checkboxTwoEnabled}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={(value) =>
                                setCheckboxTwoEnabled(value)
                            }
                        >
                            Switch Variant
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export function WithCheckboxItems() {
    const [checkboxOneEnabled, setCheckboxOneEnabled] = React.useState(true);
    const [checkboxTwoEnabled, setCheckboxTwoEnabled] = React.useState(true);
    const [checkboxThreeEnabled, setCheckboxThreeEnabled] =
        React.useState(false);
    const [checkboxFourEnabled, setCheckboxFourEnabled] = React.useState(false);

    // Handler for keyboard shortcut "⌘ B" and "⌘ C"
    React.useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "b") {
                    setCheckboxTwoEnabled((enabled) => !enabled);
                } else if (event.key === "c") {
                    setCheckboxFourEnabled((enabled) => !enabled);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [checkboxTwoEnabled, checkboxFourEnabled]);

    const twoLineDescription = (
        <>
            First line description
            <br />
            Second line description
        </>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger style={{ marginBottom: "5rem" }}>
                <Button justifyContent="start" rightIcon={faChevronDown}>
                    Checkbox Items
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={checkboxOneEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxOneEnabled(value)
                        }
                        indicatorVariant="check"
                    >
                        Check Variant
                        <DropdownMenuItemDescription>
                            {twoLineDescription}
                        </DropdownMenuItemDescription>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checkboxTwoEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxTwoEnabled(value)
                        }
                        indicatorVariant="check"
                        shortcut={`${getCtrlOrCmdKey()} B`}
                    >
                        Check Variant
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checkboxThreeEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxThreeEnabled(value)
                        }
                    >
                        Switch variant
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checkboxFourEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxFourEnabled(value)
                        }
                        shortcut={`${getCtrlOrCmdKey()} C`}
                    >
                        Switch with shortcut
                        <DropdownMenuItemDescription>
                            {twoLineDescription}
                        </DropdownMenuItemDescription>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function WithComposableParts() {
    const [checkboxOneEnabled, setCheckboxOneEnabled] = React.useState(true);
    const [checkboxTwoEnabled, setCheckboxTwoEnabled] = React.useState(true);

    // Handler for keyboard shortcut "⌘ C"
    React.useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>
        ) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "c") {
                setCheckboxTwoEnabled((enabled) => !enabled);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [checkboxTwoEnabled]);

    return (
        <>
            <Paragraph mb="2x">
                The normal <Code>DropdownMenuCheckboxItem</Code> takes in its
                content (label, description, etc.) from its props and renders
                the element in a fixed structure.
            </Paragraph>
            <Paragraph mb="4x">
                If you need more control over how the component is rendered, you
                may use the <Code>DropdownMenuCheckboxItemStyled</Code>{" "}
                component, that allows you to define the components' children,
                but requires you to include all necessary sub-components
                (indicators, for example)
            </Paragraph>
            <DropdownMenu>
                <DropdownMenuTrigger style={{ marginBottom: "5rem" }}>
                    <Button variant="solid-brand" rightIcon={faChevronDown}>
                        Checkbox Items
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuCheckboxItemStyled
                            checked={checkboxOneEnabled}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={(value) =>
                                setCheckboxOneEnabled(value)
                            }
                            indicatorVariant="check"
                        >
                            <DropdownMenuItemPrefix>
                                <DropdownMenuItemIndicatorCheck />
                            </DropdownMenuItemPrefix>
                            <DropdownMenuItemContent>
                                Check Variant
                                <Badge ml="1x">New feature!</Badge>
                                <DropdownMenuItemDescription>
                                    Description
                                </DropdownMenuItemDescription>
                            </DropdownMenuItemContent>
                        </DropdownMenuCheckboxItemStyled>
                        <DropdownMenuCheckboxItemStyled
                            checked={checkboxTwoEnabled}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={(value) =>
                                setCheckboxTwoEnabled(value)
                            }
                        >
                            <DropdownMenuItemContent>
                                Switch Variant
                                <DropdownMenuItemDescription>
                                    Description
                                </DropdownMenuItemDescription>
                            </DropdownMenuItemContent>
                            <DropdownMenuItemSuffix>
                                <DropdownMenuItemKeyboardShortcut variant="ghost">
                                    {getCtrlOrCmdKey()} C
                                </DropdownMenuItemKeyboardShortcut>
                                <DropdownMenuItemIndicatorToggle />
                            </DropdownMenuItemSuffix>
                        </DropdownMenuCheckboxItemStyled>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export function WithMixedGroup() {
    const [checkboxOneEnabled, setCheckboxOneEnabled] = React.useState(true);
    const [checkboxTwoEnabled, setCheckboxTwoEnabled] = React.useState(true);
    const [checkboxThreeEnabled, setCheckboxThreeEnabled] =
        React.useState(false);
    const [checkboxFourEnabled, setCheckboxFourEnabled] = React.useState(false);

    // Handler for keyboard shortcut "⌘ B" and "⌘ C"
    React.useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "c") {
                    setCheckboxOneEnabled((enabled) => !enabled);
                } else if (event.key === "b") {
                    setCheckboxFourEnabled((enabled) => !enabled);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [checkboxTwoEnabled]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger style={{ marginBottom: "5rem" }}>
                <Button variant="solid-brand" rightIcon={faChevronDown}>
                    Mixed menu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem leftIcon={faPlus}>
                        Create database
                        <DropdownMenuItemDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                        </DropdownMenuItemDescription>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Attach/detach database</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        View workspace details
                        <Badge variant="primary" ml="1x">
                            Badge
                        </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        Rename workspace (disabled)
                    </DropdownMenuItem>
                    <DropdownMenuItem loading={true}>Loading</DropdownMenuItem>
                    <DropdownMenuItem>Resize workspace</DropdownMenuItem>
                    <DropdownMenuItem>Open SQL Editor</DropdownMenuItem>
                    <DropdownMenuItem leftIcon={faPause}>
                        Suspend workspace
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Controls</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                        checked={checkboxTwoEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxTwoEnabled(value)
                        }
                        indicatorVariant="check"
                    >
                        Check Variant
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checkboxThreeEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxThreeEnabled(value)
                        }
                    >
                        Switch Variant
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checkboxOneEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxOneEnabled(value)
                        }
                        shortcut={`${getCtrlOrCmdKey()} C`}
                    >
                        Checkbox
                        <DropdownMenuItemDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                        </DropdownMenuItemDescription>
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={checkboxFourEnabled}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                            setCheckboxFourEnabled(value)
                        }
                        shortcut={`${getCtrlOrCmdKey()} B`}
                        indicatorVariant="check"
                    >
                        Shortcut and description
                        <DropdownMenuItemDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                        </DropdownMenuItemDescription>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem leftIcon={faTrash} variant="danger">
                        Terminate workspace
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function WithDescription() {
    const [developerToolsEnabled, setDeveloperToolsEnabled] =
        React.useState(true);

    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.`;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger style={{ marginBottom: "5rem" }}>
                <Button variant="solid-brand" rightIcon={faChevronDown}>
                    With Description
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        View workspace details
                        <DropdownMenuItemDescription>
                            Short item description
                        </DropdownMenuItemDescription>
                    </DropdownMenuItem>
                    <DropdownMenuItem leftIcon={faPlus}>
                        Create database
                        <DropdownMenuItemDescription>
                            Short item description
                        </DropdownMenuItemDescription>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={developerToolsEnabled}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={(value) => setDeveloperToolsEnabled(value)}
                    indicatorVariant="check"
                >
                    View workspace details
                    <DropdownMenuItemDescription>
                        {loremIpsum}
                    </DropdownMenuItemDescription>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem leftIcon={faPlus}>
                            Item 1
                            <DropdownMenuItemDescription>
                                Short item description
                            </DropdownMenuItemDescription>
                        </DropdownMenuItem>
                        <DropdownMenuItem leftIcon={faPlus}>
                            Item 2
                            <DropdownMenuItemDescription>
                                {loremIpsum}
                            </DropdownMenuItemDescription>
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem leftIcon={faTrash} variant="danger">
                        Terminate workspace
                        <DropdownMenuItemDescription>
                            {loremIpsum}
                        </DropdownMenuItemDescription>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function WithCheckboxGroup() {
    const filters = {
        queries: {
            label: "Queries",
        },
        systems: {
            label: "Systems",
        },
        databases: {
            label: "Databases",
        },
        teams: {
            label: "Teams",
        },
        members: {
            label: "Members",
        },
    };

    const allFilters = Object.keys(filters);

    const { groupValue: selectedFilters, setGroupValue: setSelectedFilters } =
        useCheckboxGroup({
            defaultValue: ["queries"],
        });

    const allChecked = getSelectAllCheckedState(
        selectedFilters.length,
        allFilters.length
    );

    const triggerTextContent = (() => {
        const selectedFilterLabels = selectedFilters.map(
            (filter) => filters[filter as keyof typeof filters].label
        );
        if (allChecked === true) {
            return "All";
        }

        if (allChecked === "indeterminate") {
            if (selectedFilterLabels.length > 3) {
                return (
                    selectedFilterLabels.slice(0, 3).join(", ") +
                    ` & ${selectedFilterLabels.length - 3} more`
                );
            }

            return new Intl.ListFormat("en-US", {
                style: "short",
                type: "conjunction",
            }).format(selectedFilterLabels);
        }

        return "No filters selected";
    })();

    return (
        <Box>
            <DropdownMenu>
                <DropdownMenuTrigger
                    style={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "350px",
                        textAlign: "left",
                    }}
                >
                    <Button
                        justifyContent="start"
                        rightIcon={<FaIcon icon={faChevronDown} ml="auto" />}
                    >
                        {triggerTextContent}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxGroup
                        value={selectedFilters}
                        onValueChange={setSelectedFilters}
                    >
                        <DropdownMenuLabel>Filters</DropdownMenuLabel>
                        {/* Don't add a value to this because we don't want `all` to be added to the CheckboxGroup state */}
                        <DropdownMenuCheckboxItem
                            indicatorVariant="check"
                            checked={allChecked}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={getSelectAllHandler(
                                setSelectedFilters,
                                allFilters
                            )}
                        >
                            All
                        </DropdownMenuCheckboxItem>
                        {Object.entries(filters).map(([value, { label }]) => (
                            <DropdownMenuCheckboxItem
                                indicatorVariant="check"
                                value={value}
                                onSelect={(e) => e.preventDefault()}
                            >
                                {label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuCheckboxGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </Box>
    );
}

export function WithRadioGroup() {
    const themePreferences = {
        system: {
            label: "Default to system",
        },
        light: {
            label: "Light",
        },
        dark: {
            label: "Dark",
        },
    };

    const [value, setValue] = React.useState("system");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button justifyContent="start" rightIcon={faChevronDown}>
                    employee@singlestore.com
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Sign out</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    {Object.entries(themePreferences).map(
                        ([value, { label }]) => (
                            <DropdownMenuRadioItem value={value}>
                                {label}
                            </DropdownMenuRadioItem>
                        )
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function WithSubMenus() {
    const [value, setValue] = React.useState("system");

    function handleSelectRadioItem(e: Event) {
        e.preventDefault();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button justifyContent="start" rightIcon={faChevronDown}>
                    employee@singlestore.com
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Sign out</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Theme Preference
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                            value={value}
                            onValueChange={setValue}
                        >
                            <DropdownMenuRadioItem
                                value="system"
                                onSelect={handleSelectRadioItem}
                                shortcut={`${getCtrlOrCmdKey()} T`}
                            >
                                Default to system
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                value="light"
                                onSelect={handleSelectRadioItem}
                                shortcut={`${getCtrlOrCmdKey()} L`}
                            >
                                Light
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                value="dark"
                                onSelect={handleSelectRadioItem}
                                shortcut={`${getCtrlOrCmdKey()} D`}
                            >
                                Dark
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function WithoutIcons() {
    const [value, setValue] = React.useState("system");
    const [switchValue, setSwitchValue] = React.useState(false);

    function handleSelectRadioItem(e: Event) {
        e.preventDefault();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button justifyContent="start" rightIcon={faChevronDown}>
                    Menu without icons
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                    checked={switchValue}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={(value) => setSwitchValue(value)}
                >
                    Switch Checkbox
                </DropdownMenuCheckboxItem>
                <DropdownMenuItem>Menu item</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Radio Submenu
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                            value={value}
                            onValueChange={setValue}
                        >
                            <DropdownMenuRadioItem
                                value="system"
                                onSelect={handleSelectRadioItem}
                                shortcut={`${getCtrlOrCmdKey()} T`}
                            >
                                Default to system
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                value="light"
                                onSelect={handleSelectRadioItem}
                                shortcut={`${getCtrlOrCmdKey()} L`}
                            >
                                Light
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                value="dark"
                                onSelect={handleSelectRadioItem}
                                shortcut={`${getCtrlOrCmdKey()} D`}
                            >
                                Dark
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Submenu without icons
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                        <DropdownMenuItem>Item 2</DropdownMenuItem>
                        <DropdownMenuItem>Item 3</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Mixed submenu
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem leftIcon={faPlus}>
                            Item 1
                        </DropdownMenuItem>
                        <DropdownMenuItem>Item 2</DropdownMenuItem>
                        <DropdownMenuItem leftIcon={faPause}>
                            Item 3
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
