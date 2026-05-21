import { Box, Flex } from "@singlestore/fusion/components/layout";
import {
    Code,
    H2,
    Label,
    Paragraph,
} from "@singlestore/fusion/components/typography";
import React, { useState } from "react";

import {
    MultiSelect,
    MultiSelectTriggerButton,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectAll,
    MultiSelectSeparator,
} from "./multi-select";
import {
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItemContent,
    DropdownMenuItemDescription,
} from "@singlestore/fusion/components/dropdown-menu";

export default {
    title: "Components / MultiSelect",
    component: MultiSelect,
    tags: ["autodocs"],
};

export const VariantComparison = () => {
    const [selectValue, setSelectValue] = useState<string[]>([]);
    const [filterValue, setFilterValue] = useState<string[]>([]);
    const fruitOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "strawberry", label: "Strawberry" },
    ];

    return (
        <Box p="4x">
            <H2 mb="2x">Variant Comparison</H2>
            <Paragraph mb="4x">
                The <Code>variant</Code> prop controls both the visual style and
                the &quot;All&quot; behavior of the multi-select.
            </Paragraph>

            <Flex gap="8x" mb="4x">
                <Box>
                    <H2 mb="1x" fontSize="body-2">
                        variant=&quot;select&quot; (default)
                    </H2>
                    <Paragraph mb="2x" maxWidth="40x">
                        Use for <strong>form fields</strong> where the user is
                        choosing values as input (e.g., assigning roles to a
                        user, picking categories for a resource). Empty state
                        shows a placeholder. &quot;All&quot; is a{" "}
                        <strong>tri-state checkbox</strong> (unchecked /
                        indeterminate / checked) that toggles every item on or
                        off. The trigger does not visually highlight on
                        selection.
                    </Paragraph>
                    <MultiSelect
                        value={selectValue}
                        onValueChange={setSelectValue}
                        allItems={fruitOptions}
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue placeholder="Select fruit" />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent>
                            <MultiSelectAll />
                            {fruitOptions.map((opt) => (
                                <MultiSelectItem
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </Box>

                <Box>
                    <H2 mb="1x" fontSize="body-2">
                        variant=&quot;filter&quot;
                    </H2>
                    <Paragraph mb="2x" maxWidth="40x">
                        Use for <strong>filtering lists or tables</strong>{" "}
                        (e.g., narrowing rows by status, region, or type).
                        Typically paired with <Code>prefixLabel</Code> to label
                        the filter dimension. &quot;All&quot; is a{" "}
                        <strong>radio-style clear button</strong> that clears
                        selections (<Code>value=[]</Code> means no filter). The
                        trigger shows &quot;[prefix]: All&quot; by default and
                        gets a tinted highlight when a filter is active.
                    </Paragraph>
                    <MultiSelect
                        value={filterValue}
                        onValueChange={setFilterValue}
                        allItems={fruitOptions}
                        variant="filter"
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue prefixLabel="Fruit" />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent>
                            <MultiSelectAll />
                            {fruitOptions.map((opt) => (
                                <MultiSelectItem
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </Box>
            </Flex>
        </Box>
    );
};

export const BasicUsage = () => {
    const [value, setValue] = useState<string[]>([]);
    const fruitOptions = [
        { value: "Apple" },
        { value: "Banana" },
        { value: "Orange" },
        { value: "Strawberry" },
        { value: "Blueberry" },
    ];

    return (
        <Box p="4x">
            <H2 mb="2x">Basic Usage</H2>
            <Paragraph mb="4x">
                A simple multi-select component with a basic structure. This
                example shows how to create a multi-select with simple string
                options.
            </Paragraph>

            <Box width="30x" mb="4x">
                <Label mb="1x" display="block">
                    Select fruit
                </Label>
                <MultiSelect
                    value={value}
                    onValueChange={setValue}
                    allItems={fruitOptions}
                >
                    <MultiSelectTriggerButton>
                        <MultiSelectValue />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll />
                        {fruitOptions.map(({ value }) => (
                            <MultiSelectItem key={value} value={value}>
                                {value}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
            </Box>

            <Box>
                <Label mb="1x">Selected values:</Label>
                <Paragraph>
                    {value.length > 0 ? value.join(", ") : "None selected"}
                </Paragraph>
            </Box>
        </Box>
    );
};

export const AsFilter = () => {
    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
        { value: "archived", label: "Archived" },
    ];

    const [value, setValue] = useState<string[]>([]);

    const items = [
        { id: 1, name: "Alice", status: "active" },
        { id: 2, name: "Bob", status: "inactive" },
        { id: 3, name: "Carol", status: "pending" },
        { id: 4, name: "Dave", status: "archived" },
        { id: 5, name: "Eve", status: "active" },
    ];

    // value=[] means "All" (no filter applied) → show everything
    const filteredItems =
        value.length === 0
            ? items
            : items.filter((item) => value.includes(item.status));

    return (
        <Box p="4x">
            <H2 mb="2x">As Filter</H2>
            <Paragraph mb="4x">
                &quot;All&quot; acts as a radio-style clear button. Clicking
                &quot;All&quot; clears all checkbox selections (value becomes
                []), and &quot;All&quot; appears selected when no items are
                individually checked. The trigger shows &quot;[prefix]:
                All&quot; when no filter is active.
            </Paragraph>

            <Box>
                <MultiSelect
                    value={value}
                    onValueChange={setValue}
                    allItems={statusOptions}
                    variant="filter"
                >
                    <MultiSelectTriggerButton>
                        <MultiSelectValue prefixLabel="Status" />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll />
                        {statusOptions.map((status) => (
                            <MultiSelectItem
                                key={status.value}
                                value={status.value}
                            >
                                {status.label}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
                <Label mt="2x" display="block">
                    <strong>Results:</strong>
                </Label>
                <ul>
                    {filteredItems.map((item) => (
                        <li key={item.id}>
                            {item.name} <em>({item.status})</em>
                        </li>
                    ))}
                </ul>
                <Label mt="2x" display="block">
                    <strong>Raw value:</strong>{" "}
                    <Code>
                        {value.length === 0
                            ? "[] (All)"
                            : JSON.stringify(value)}
                    </Code>
                </Label>
            </Box>
        </Box>
    );
};

export const FilterWithMultipleSelects = () => {
    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
    ];

    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor" },
        { value: "viewer", label: "Viewer" },
    ];

    const [statusValue, setStatusValue] = useState<string[]>([]);
    const [roleValue, setRoleValue] = useState<string[]>([]);

    return (
        <Box p="4x">
            <H2 mb="2x">Filter with Multiple Selects</H2>
            <Paragraph mb="4x">
                Multiple filter MultiSelects side by side. Each starts with
                &quot;All&quot; selected (no filter). Checking items activates
                the filter and highlights the trigger. Clicking &quot;All&quot;
                clears back to the default state.
            </Paragraph>

            <Flex gap="2x" mb="4x">
                <MultiSelect
                    value={statusValue}
                    onValueChange={setStatusValue}
                    allItems={statusOptions}
                    variant="filter"
                >
                    <MultiSelectTriggerButton>
                        <MultiSelectValue prefixLabel="Status" />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll />
                        {statusOptions.map((status) => (
                            <MultiSelectItem
                                key={status.value}
                                value={status.value}
                            >
                                {status.label}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>

                <MultiSelect
                    value={roleValue}
                    onValueChange={setRoleValue}
                    allItems={roleOptions}
                    variant="filter"
                >
                    <MultiSelectTriggerButton>
                        <MultiSelectValue prefixLabel="Role" />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll />
                        {roleOptions.map((role) => (
                            <MultiSelectItem
                                key={role.value}
                                value={role.value}
                            >
                                {role.label}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
            </Flex>
            <Box>
                <Label display="block">
                    <strong>Status:</strong>{" "}
                    <Code>
                        {statusValue.length === 0
                            ? "All"
                            : statusValue.join(", ")}
                    </Code>
                </Label>
                <Label display="block">
                    <strong>Role:</strong>{" "}
                    <Code>
                        {roleValue.length === 0 ? "All" : roleValue.join(", ")}
                    </Code>
                </Label>
            </Box>
        </Box>
    );
};

export const WithGroupedOptions = () => {
    const [value, setValue] = useState<string[]>([]);

    const foodOptions = [
        // Fruits
        { value: "apple", label: "Apple", category: "Fruits" },
        { value: "banana", label: "Banana", category: "Fruits" },
        { value: "orange", label: "Orange", category: "Fruits" },
        // Vegetables
        { value: "carrot", label: "Carrot", category: "Vegetables" },
        { value: "broccoli", label: "Broccoli", category: "Vegetables" },
        { value: "spinach", label: "Spinach", category: "Vegetables" },
        // Proteins
        { value: "chicken", label: "Chicken", category: "Proteins" },
        { value: "beef", label: "Beef", category: "Proteins" },
        { value: "tofu", label: "Tofu", category: "Proteins" },
    ];

    // Group food options by category
    const groupedFoodOptions = foodOptions.reduce<
        Record<string, typeof foodOptions>
    >((groups, item) => {
        const category = item.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});

    // Get all categories in the order we want to display them
    const categories = ["Fruits", "Vegetables", "Proteins"];

    return (
        <Box p="4x">
            <H2 mb="2x">Grouped Options</H2>
            <Paragraph mb="4x">
                MultiSelect with options organized into groups. This pattern is
                useful when you need to categorize options for better user
                experience.
            </Paragraph>

            <Box width="30x" mb="4x">
                <Label mb="1x" display="block">
                    Select food
                </Label>
                <MultiSelect
                    value={value}
                    onValueChange={setValue}
                    allItems={foodOptions}
                >
                    <MultiSelectTriggerButton>
                        <MultiSelectValue placeholder="Select food items" />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll>All Food</MultiSelectAll>
                        <MultiSelectSeparator />

                        {categories.map((category, categoryIndex) => (
                            <React.Fragment key={category}>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        {category}
                                    </DropdownMenuLabel>
                                    {groupedFoodOptions[category].map(
                                        (item) => (
                                            <MultiSelectItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MultiSelectItem>
                                        )
                                    )}
                                </DropdownMenuGroup>

                                {categoryIndex < categories.length - 1 && (
                                    <MultiSelectSeparator />
                                )}
                            </React.Fragment>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
            </Box>

            <Box>
                <Label mb="1x">Selected foods:</Label>
                <Paragraph>
                    {value.length > 0 ? value.join(", ") : "None selected"}
                </Paragraph>
            </Box>
        </Box>
    );
};

export const States = () => {
    const [value, setValue] = useState<string[]>(["apple"]);
    const fruitOptions = [
        { value: "Apple" },
        { value: "Banana" },
        { value: "Orange" },
        { value: "Strawberry" },
        { value: "Blueberry" },
    ];

    return (
        <Box p="4x">
            <H2 mb="2x">States</H2>

            {/* Select variant row */}
            <Label mb="2x" display="block">
                <Code>variant="select"</Code>
            </Label>
            <Flex gap="4x" mb="4x">
                <Box mb="4x">
                    <Label mb="1x" display="block">
                        Disabled
                    </Label>
                    <MultiSelect
                        value={value}
                        onValueChange={setValue}
                        disabled
                        allItems={fruitOptions}
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent>
                            <MultiSelectSeparator />
                            {fruitOptions.map(({ value }) => (
                                <MultiSelectItem key={value} value={value}>
                                    {value}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </Box>

                <Box mb="4x">
                    <Label mb="1x" display="block">
                        Loading
                    </Label>
                    <MultiSelect
                        value={value}
                        onValueChange={setValue}
                        loading
                        allItems={fruitOptions}
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent>
                            <MultiSelectSeparator />
                            {fruitOptions.map(({ value }) => (
                                <MultiSelectItem key={value} value={value}>
                                    {value}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </Box>

                <Box mb="4x">
                    <Label mb="1x" display="block">
                        No options
                    </Label>
                    <MultiSelect
                        value={[]}
                        onValueChange={() => {}}
                        allItems={[]}
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent></MultiSelectContent>
                    </MultiSelect>
                </Box>
            </Flex>

            {/* Filter variant row */}
            <Label mb="2x" display="block">
                <Code>variant="filter"</Code>
            </Label>
            <Flex gap="4x">
                <Box mb="4x">
                    <Label mb="1x" display="block">
                        Disabled
                    </Label>
                    <MultiSelect
                        value={value}
                        onValueChange={setValue}
                        disabled
                        allItems={fruitOptions}
                        variant="filter"
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue prefixLabel="Fruit" />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent>
                            <MultiSelectAll />
                            {fruitOptions.map(({ value }) => (
                                <MultiSelectItem key={value} value={value}>
                                    {value}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </Box>

                <Box mb="4x">
                    <Label mb="1x" display="block">
                        Loading
                    </Label>
                    <MultiSelect
                        value={value}
                        onValueChange={setValue}
                        loading
                        allItems={fruitOptions}
                        variant="filter"
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue prefixLabel="Fruit" />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent>
                            <MultiSelectAll />
                            {fruitOptions.map(({ value }) => (
                                <MultiSelectItem key={value} value={value}>
                                    {value}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                </Box>

                <Box mb="4x">
                    <Label mb="1x" display="block">
                        No options
                    </Label>
                    <MultiSelect
                        value={[]}
                        onValueChange={() => {}}
                        allItems={[]}
                        variant="filter"
                    >
                        <MultiSelectTriggerButton>
                            <MultiSelectValue prefixLabel="Fruit" />
                        </MultiSelectTriggerButton>
                        <MultiSelectContent></MultiSelectContent>
                    </MultiSelect>
                </Box>
            </Flex>
        </Box>
    );
};

export const WithMaxWidthAndOverflow = () => {
    const [value, setValue] = useState<string[]>([
        "apple",
        "banana",
        "orange",
        "strawberry",
        "blueberry",
    ]);
    const fruitOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "strawberry", label: "Strawberry" },
        { value: "blueberry", label: "Blueberry" },
        { value: "grape", label: "Grape" },
        { value: "mango", label: "Mango" },
        { value: "pineapple", label: "Pineapple" },
    ];

    return (
        <Box p="4x">
            <H2 mb="2x">Max Width and Overflow</H2>
            <Paragraph mb="4x">
                This story demonstrates how the MultiSelectValue ellipsifies
                when the content exceeds the maxWidth of the trigger button.
            </Paragraph>

            <Box width="30x" mb="4x">
                <Label mb="1x" display="block">
                    Select fruit (maxWidth on trigger, maxVisible 4):
                </Label>
                <MultiSelect
                    value={value}
                    onValueChange={setValue}
                    allItems={fruitOptions}
                >
                    <MultiSelectTriggerButton maxWidth="30x">
                        <MultiSelectValue maxVisible={4} />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll />
                        {fruitOptions.map((fruit) => (
                            <MultiSelectItem
                                key={fruit.value}
                                value={fruit.value}
                            >
                                {fruit.label}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
            </Box>
            <Box width="30x" mb="4x">
                <Label mb="1x" display="block">
                    Select fruit (prefixLabel, maxWidth on trigger, maxVisible
                    4):
                </Label>
                <MultiSelect
                    value={value}
                    onValueChange={setValue}
                    allItems={fruitOptions}
                    variant="filter"
                >
                    <MultiSelectTriggerButton maxWidth="30x">
                        <MultiSelectValue prefixLabel="Fruits" maxVisible={4} />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll />
                        {fruitOptions.map((fruit) => (
                            <MultiSelectItem
                                key={fruit.value}
                                value={fruit.value}
                            >
                                {fruit.label}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
            </Box>
        </Box>
    );
};

export const WithDescriptions = () => {
    const [value, setValue] = useState<string[]>([]);
    const languageOptions = [
        {
            value: "js",
            label: "JavaScript",
            description:
                "A versatile language primarily used for web development.",
        },
        {
            value: "py",
            label: "Python",
            description:
                "Great for scripting, data science, and backend services.",
        },
        {
            value: "go",
            label: "Go",
            description:
                "A statically typed language designed for simplicity and concurrency.",
        },
        {
            value: "rs",
            label: "Rust",
            description:
                "A systems programming language focused on safety and performance.",
        },
        {
            value: "ts",
            label: "TypeScript",
            description: "A superset of JavaScript that adds static typing.",
        },
    ];

    return (
        <Box p="4x">
            <H2 mb="2x">With Descriptions</H2>
            <Paragraph mb="4x">
                This example shows a multi-select with rich descriptions using{" "}
                <code>DropdownMenuItemDescription</code>.
            </Paragraph>
            <Box width="30x" mb="4x">
                <Label mb="1x" display="block">
                    Select programming languages:
                </Label>
                <MultiSelect
                    value={value}
                    onValueChange={setValue}
                    allItems={languageOptions}
                >
                    <MultiSelectTriggerButton>
                        <MultiSelectValue placeholder="Select languages" />
                    </MultiSelectTriggerButton>
                    <MultiSelectContent>
                        <MultiSelectAll>All Languages</MultiSelectAll>
                        {languageOptions.map((lang) => (
                            <MultiSelectItem
                                key={lang.value}
                                value={lang.value}
                            >
                                <DropdownMenuItemContent>
                                    {lang.label}
                                    <DropdownMenuItemDescription>
                                        {lang.description}
                                    </DropdownMenuItemDescription>
                                </DropdownMenuItemContent>
                            </MultiSelectItem>
                        ))}
                    </MultiSelectContent>
                </MultiSelect>
            </Box>
            <Box>
                <Label mb="1x">Selected languages:</Label>
                <Paragraph>
                    {value.length > 0 ? value.join(", ") : "None selected"}
                </Paragraph>
            </Box>
        </Box>
    );
};
