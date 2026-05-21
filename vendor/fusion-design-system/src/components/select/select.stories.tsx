import { Box, box, Flex } from "@singlestore/fusion/components/layout";
import {
    Select,
    SelectContent,
    SelectDescribedItem,
    SelectDescribedItemDescription,
    SelectDescribedItemTitle,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@singlestore/fusion/components/select/select";
import { Code, Label } from "@singlestore/fusion/components/typography";
import React from "react";
import { Badge } from "../badge";

export default {
    title: "Components / Select",
};

const foodGroups: Array<{
    label?: string;
    foods: Array<{ value: string; label: string; disabled?: boolean }>;
}> = [
    {
        label: "Fruits",
        foods: [
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "blueberry", label: "Blueberry" },
            { value: "grapes", label: "Grapes" },
            { value: "pineapple", label: "Pineapple" },
        ],
    },
    {
        label: "Vegetables",
        foods: [
            { value: "aubergine", label: "Aubergine" },
            { value: "broccoli", label: "Broccoli" },
            { value: "carrot", label: "Carrot", disabled: true },
            { value: "courgette", label: "Courgette" },
            { value: "leek", label: "Leek" },
        ],
    },
    {
        label: "Meat",
        foods: [
            { value: "beef", label: "Beef" },
            { value: "beef-with-sauce", label: "Beef with sauce and stuff" },
            { value: "chicken", label: "Chicken" },
            { value: "lamb", label: "Lamb" },
            { value: "pork", label: "Pork" },
        ],
    },
    {
        foods: [
            { value: "candies", label: "Candies" },
            { value: "chocolates", label: "Chocolates" },
        ],
    },
];

export const BasicUsage = () => (
    <Box>
        <Box mb="4x">
            <Label htmlFor="basic-usage--form" display="block" mb="0-5x">
                Choose a number:
            </Label>
            <Select defaultValue="two">
                <SelectTrigger id="basic-usage--form" />
                <SelectContent>
                    <SelectItem value="one">
                        <SelectItemText>One</SelectItemText>
                    </SelectItem>
                    <SelectItem value="two">
                        <SelectItemText>Two</SelectItemText>
                    </SelectItem>
                    <SelectItem value="three">
                        <SelectItemText>Three</SelectItemText>
                    </SelectItem>
                </SelectContent>
            </Select>
        </Box>
        <Box>
            <Label htmlFor="basic-usage--button" display="block" mb="0-5x">
                Choose a number:
            </Label>
            <Select defaultValue="two">
                <SelectTrigger variant="button" id="basic-usage--button" />
                <SelectContent>
                    <SelectItem value="one">
                        <SelectItemText>One</SelectItemText>
                    </SelectItem>
                    <SelectItem value="two">
                        <SelectItemText>Two</SelectItemText>
                    </SelectItem>
                    <SelectItem value="three">
                        <SelectItemText>Three</SelectItemText>
                    </SelectItem>
                </SelectContent>
            </Select>
        </Box>
    </Box>
);

export const AlwaysOpen = () => (
    <Flex gap="12x">
        <Select open>
            <SelectTrigger width="auto" />
            <SelectContent>
                <SelectItem value="one">
                    <SelectItemText>One</SelectItemText>
                </SelectItem>
                <SelectItem value="two">
                    <SelectItemText>Two</SelectItemText>
                </SelectItem>
                <SelectItem value="three">
                    <SelectItemText>Three</SelectItemText>
                </SelectItem>
                {/* 
                    There's a bug where selecting this item will change the width of the content.
                    In reality, the user wont notice because the content will be closed immediately, but we should fix it anyway.
                */}
                <SelectItem value="looooooooooooooooooooooong">
                    <SelectItemText>Looooooooooooooooooooooong</SelectItemText>
                </SelectItem>
            </SelectContent>
        </Select>
    </Flex>
);

const allSides = ["top", "right", "bottom", "left"] as const;

export const ForceContentSide = () => (
    <Flex mt="6x" ml="6x" p="12x" gap="4x">
        {allSides.map((side) => (
            <Select defaultValue={side}>
                <SelectTrigger />
                <SelectContent side={side}>
                    {allSides.map((value) => (
                        <SelectItem disabled={value !== side} value={value}>
                            <SelectItemText>{value}</SelectItemText>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ))}
    </Flex>
);

export const FocusSomethingElseOnClose = () => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <Box>
            <Flex gap="1x">
                <Select defaultValue="all">
                    <SelectTrigger />
                    <SelectContent
                        onCloseAutoFocus={(e) => {
                            e.preventDefault();
                            inputRef.current?.focus();
                        }}
                    >
                        <SelectItem value="all">
                            <SelectItemText>All</SelectItemText>
                        </SelectItem>
                        <SelectItem value="users">
                            <SelectItemText>Users</SelectItemText>
                        </SelectItem>
                        <SelectItem value="organizations">
                            <SelectItemText>Organizations</SelectItemText>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for something"
                />
            </Flex>
        </Box>
    );
};

export const WithDisabledItems = () => (
    <Box>
        <Label htmlFor="with-disabled-items" display="block" mb="0-5x">
            Choose a number:
        </Label>
        <Select defaultValue="three">
            <SelectTrigger id="with-disabled-items" />
            <SelectContent>
                <SelectItem value="one">
                    <SelectItemText>One</SelectItemText>
                </SelectItem>
                <SelectItem disabled value="two">
                    <SelectItemText>Two</SelectItemText>
                </SelectItem>
                <SelectItem value="three">
                    <SelectItemText>Three</SelectItemText>
                </SelectItem>
                <SelectItem value="four" disabled>
                    <SelectItemText>Four</SelectItemText>
                </SelectItem>
                <SelectItem disabled value="five">
                    <SelectItemText>Five</SelectItemText>
                </SelectItem>
                <SelectItem value="six">
                    <SelectItemText>Six</SelectItemText>
                </SelectItem>
                <SelectItem value="seven">
                    <SelectItemText>Seven</SelectItemText>
                </SelectItem>
            </SelectContent>
        </Select>
    </Box>
);

export const WithRichItems = () => (
    <Box>
        <Label htmlFor="with-rich-items" display="block" mb="0-5x">
            Choose a number:
        </Label>
        <Select defaultValue="one">
            <SelectTrigger id="with-rich-items" />
            <SelectContent>
                <SelectItem value="one">
                    <SelectItemText>Cool, new feature</SelectItemText>
                    <Badge>New</Badge>
                </SelectItem>
                <SelectItem disabled value="two">
                    <SelectItemText>Unavailable feature</SelectItemText>
                </SelectItem>
                <SelectItem value="three">
                    <SelectItemText>This would never happen</SelectItemText>
                    <Code>
                        {`import { WOW } from "you-can-put-anything-in-here" }`}
                    </Code>
                </SelectItem>
            </SelectContent>
        </Select>
    </Box>
);

export const WithCustomTriggerContent = () => {
    const [value, setValue] = React.useState("uk");

    return (
        <Box>
            <Label display="block" mb="0-5x">
                Choose a country:
            </Label>
            <Select value={value} onValueChange={setValue}>
                <SelectTrigger width="auto">
                    <SelectValue
                        aria-label={
                            value === "fr"
                                ? "France"
                                : value === "uk"
                                  ? "United Kingdom"
                                  : value === "es"
                                    ? "Spain"
                                    : undefined
                        }
                    >
                        {value === "fr"
                            ? "🇫🇷"
                            : value === "uk"
                              ? "🇬🇧"
                              : value === "es"
                                ? "🇪🇸"
                                : null}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="fr">
                        <SelectItemText>France</SelectItemText>
                    </SelectItem>
                    <SelectItem value="uk">
                        <SelectItemText>United Kingdom</SelectItemText>
                    </SelectItem>
                    <SelectItem value="es">
                        <SelectItemText>Spain</SelectItemText>
                    </SelectItem>
                </SelectContent>
            </Select>
        </Box>
    );
};

export const WithCustomPlaceholder = () => (
    <Box>
        <Label>Choose a number:</Label>
        <Select>
            <SelectTrigger mt="0-5x">
                <SelectValue placeholder="Select a number" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="one">
                    <SelectItemText>One</SelectItemText>
                </SelectItem>
                <SelectItem value="two" disabled>
                    <SelectItemText>Two</SelectItemText>
                </SelectItem>
                <SelectItem value="three">
                    <SelectItemText>Three</SelectItemText>
                </SelectItem>
            </SelectContent>
        </Select>
    </Box>
);

export const WithItemDescription = () => {
    const [value, setValue] = React.useState("uk");

    return (
        <Box>
            <Label display="block" mb="0-5x">
                Choose a country:
            </Label>
            <Select value={value} onValueChange={setValue}>
                <SelectTrigger />
                <SelectContent>
                    <SelectDescribedItem value="fr">
                        <SelectDescribedItemTitle>
                            <SelectItemText>France</SelectItemText>
                        </SelectDescribedItemTitle>
                        <SelectDescribedItemDescription>
                            Population: 67,000,000
                            <br />A Western European country renowned for its
                            art, cuisine, and iconic landmarks, including the
                            Eiffel Tower and Louvre Museum, as well as its
                            romantic capital, Paris.
                        </SelectDescribedItemDescription>
                    </SelectDescribedItem>
                    <SelectDescribedItem value="uk">
                        <SelectDescribedItemTitle>
                            <SelectItemText>United Kingdom</SelectItemText>
                        </SelectDescribedItemTitle>
                        <SelectDescribedItemDescription>
                            Population: 71,000,000
                            <br />A constitutional monarchy with a rich history,
                            known for its global influence, diverse culture, and
                            iconic landmarks such as Big Ben and Buckingham
                            Palace.
                        </SelectDescribedItemDescription>
                    </SelectDescribedItem>
                    <SelectDescribedItem value="es">
                        <SelectDescribedItemTitle>
                            <SelectItemText>Spain</SelectItemText>
                        </SelectDescribedItemTitle>
                        <SelectDescribedItemDescription>
                            Population: 46,000,000
                            <br />A vibrant, culturally diverse nation in
                            southwestern Europe, celebrated for its rich
                            history, flavorful cuisine, lively flamenco dance,
                            and stunning architecture, such as Gaudí's Sagrada
                            Família.
                        </SelectDescribedItemDescription>
                    </SelectDescribedItem>
                </SelectContent>
            </Select>
        </Box>
    );
};

const allCountries = [
    { value: "af", label: "Afghanistan", flag: "🇦🇫" },
    { value: "ax", label: "Åland Islands", flag: "🇦🇽" },
    { value: "al", label: "Albania", flag: "🇦🇱" },
    { value: "dz", label: "Algeria", flag: "🇩🇿" },
    { value: "as", label: "American Samoa", flag: "🇦🇸" },
    { value: "ad", label: "Andorra", flag: "🇦🇩" },
    { value: "ao", label: "Angola", flag: "🇦🇴" },
    { value: "ai", label: "Anguilla", flag: "🇦🇮" },
    { value: "aq", label: "Antarctica", flag: "🇦🇶" },
    { value: "ag", label: "Antigua and Barbuda", flag: "🇦🇬" },
    { value: "ar", label: "Argentina", flag: "🇦🇷" },
    { value: "am", label: "Armenia", flag: "🇦🇲" },
    { value: "aw", label: "Aruba", flag: "🇦🇼" },
    { value: "au", label: "Australia", flag: "🇦🇺" },
    { value: "at", label: "Austria", flag: "🇦🇹" },
    { value: "az", label: "Azerbaijan", flag: "🇦🇿" },
    { value: "bs", label: "Bahamas", flag: "🇧🇸" },
    { value: "bh", label: "Bahrain", flag: "🇧🇭" },
    { value: "bd", label: "Bangladesh", flag: "🇧🇩" },
    { value: "bb", label: "Barbados", flag: "🇧🇧" },
    { value: "by", label: "Belarus", flag: "🇧🇾" },
    { value: "be", label: "Belgium", flag: "🇧🇪" },
    { value: "bz", label: "Belize", flag: "🇧🇿" },
    { value: "bj", label: "Benin", flag: "🇧🇯" },
    { value: "bm", label: "Bermuda", flag: "🇧🇲" },
    { value: "bt", label: "Bhutan", flag: "🇧🇹" },
    {
        value: "bo",
        label: "Bolivia, Plurinational State of",
        flag: "🇧🇴",
    },
    {
        value: "bq",
        label: "Bonaire, Sint Eustatius and Saba",
        flag: "🇧🇶",
    },
    { value: "ba", label: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { value: "bw", label: "Botswana", flag: "🇧🇼" },
    { value: "bv", label: "Bouvet Island", flag: "🇧🇻" },
    { value: "br", label: "Brazil", flag: "🇧🇷" },
    {
        value: "io",
        label: "British Indian Ocean Territory",
        flag: "🇮🇴",
    },
    { value: "bn", label: "Brunei Darussalam", flag: "🇧🇳" },
    { value: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { value: "bf", label: "Burkina Faso", flag: "🇧🇫" },
    { value: "bi", label: "Burundi", flag: "🇧🇮" },
    { value: "kh", label: "Cambodia", flag: "🇰🇭" },
    { value: "cm", label: "Cameroon", flag: "🇨🇲" },
    { value: "ca", label: "Canada", flag: "🇨🇦" },
    { value: "cv", label: "Cape Verde", flag: "🇨🇻" },
    { value: "ky", label: "Cayman Islands", flag: "🇰🇾" },
    { value: "cf", label: "Central African Republic", flag: "🇨🇫" },
    { value: "td", label: "Chad", flag: "🇹🇩" },
    { value: "cl", label: "Chile", flag: "🇨🇱" },
    { value: "cn", label: "China", flag: "🇨🇳" },
    { value: "cx", label: "Christmas Island", flag: "🇨🇽" },
    { value: "cc", label: "Cocos (Keeling) Islands", flag: "🇨🇨" },
    { value: "co", label: "Colombia", flag: "🇨🇴" },
    { value: "km", label: "Comoros", flag: "🇰🇲" },
    { value: "cg", label: "Congo", flag: "🇨🇬" },
    {
        value: "cd",
        label: "Congo, the Democratic Republic of the",
        flag: "🇨🇩",
    },
    { value: "ck", label: "Cook Islands", flag: "🇨🇰" },
    { value: "cr", label: "Costa Rica", flag: "🇨🇷" },
    { value: "ci", label: "Côte d'Ivoire", flag: "🇨🇮" },
    { value: "hr", label: "Croatia", flag: "🇭🇷" },
    { value: "cu", label: "Cuba", flag: "🇨🇺" },
    { value: "cw", label: "Curaçao", flag: "🇨🇼" },
    { value: "cy", label: "Cyprus", flag: "🇨🇾" },
    { value: "cz", label: "Czech Republic", flag: "🇨🇿" },
    { value: "dk", label: "Denmark", flag: "🇩🇰" },
    { value: "dj", label: "Djibouti", flag: "🇩🇯" },
    { value: "dm", label: "Dominica", flag: "🇩🇲" },
    { value: "do", label: "Dominican Republic", flag: "🇩🇴" },
    { value: "ec", label: "Ecuador", flag: "🇪🇨" },
    { value: "eg", label: "Egypt", flag: "🇪🇬" },
    { value: "sv", label: "El Salvador", flag: "🇸🇻" },
    { value: "gq", label: "Equatorial Guinea", flag: "🇬🇶" },
    { value: "er", label: "Eritrea", flag: "🇪🇷" },
    { value: "ee", label: "Estonia", flag: "🇪🇪" },
    { value: "et", label: "Ethiopia", flag: "🇪🇹" },
    { value: "fk", label: "Falkland Islands (Malvinas)", flag: "🇫🇰" },
    { value: "fo", label: "Faroe Islands", flag: "🇫🇴" },
    { value: "fj", label: "Fiji", flag: "🇫🇯" },
    { value: "fi", label: "Finland", flag: "🇫🇮" },
    { value: "fr", label: "France", flag: "🇫🇷" },
    { value: "gf", label: "French Guiana", flag: "🇬🇫" },
    { value: "pf", label: "French Polynesia", flag: "🇵🇫" },
    { value: "tf", label: "French Southern Territories", flag: "🇹🇫" },
    { value: "ga", label: "Gabon", flag: "🇬🇦" },
    { value: "gm", label: "Gambia", flag: "🇬🇲" },
    { value: "ge", label: "Georgia", flag: "🇬🇪" },
    { value: "de", label: "Germany", flag: "🇩🇪" },
    { value: "gh", label: "Ghana", flag: "🇬🇭" },
    { value: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { value: "us", label: "United States", flag: "🇺🇸" },
] as const;

const suggestedPrefix = `suggested_`;

const allCountriesWithSuggested = [
    {
        label: "Suggested",
        countries: allCountries
            .filter((country) => {
                return ["au", "ca", "gb", "us"].includes(country.value);
            })
            .map((country) => ({
                ...country,
                value: suggestedPrefix + country.value,
            })),
    },
    {
        label: "All Countries",
        countries: allCountries,
    },
];

export const WithManyItemsAndDuplicates = () => {
    const [data, setData] = React.useState<{
        country: (typeof allCountries)[number]["value"] | null;
    }>({ country: null });

    // Each value must be unique. We can't actually have "duplicates",
    // so we add `suggested_` to the suggested countries' item value,
    // and then remove it before setting it to state.
    function handleChange(event: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget);
        const formDataObj = Object.fromEntries(
            formData.entries()
        ) as typeof data;

        // Remove the `suggested_` prefix from the value
        if (formDataObj.country?.startsWith(suggestedPrefix)) {
            formDataObj.country = formDataObj.country.replace(
                suggestedPrefix,
                ""
            ) as (typeof data)["country"];
        }

        setData(formDataObj);
    }

    return (
        <Box>
            <form
                onSubmit={(event) => {
                    handleChange(event);
                    event.preventDefault();
                }}
                onChange={handleChange}
            >
                <Label display="block" mb="0-5x">
                    Country of residence:
                </Label>
                <Select name="country" autoComplete="country">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent style={{ maxHeight: "50vh" }}>
                        {allCountriesWithSuggested.map(
                            (countryGroup, index) => {
                                const hasLabel =
                                    countryGroup.label !== undefined;

                                return (
                                    <React.Fragment key={index}>
                                        <SelectGroup>
                                            {hasLabel && (
                                                <SelectLabel
                                                    key={countryGroup.label}
                                                >
                                                    {countryGroup.label}
                                                </SelectLabel>
                                            )}
                                            {countryGroup.countries.map(
                                                (country) => {
                                                    const prefix =
                                                        countryGroup.label ===
                                                        "Suggested"
                                                            ? `suggested_`
                                                            : "";

                                                    return (
                                                        <SelectItem
                                                            key={
                                                                prefix +
                                                                country.value
                                                            }
                                                            value={
                                                                country.value
                                                            }
                                                        >
                                                            {country.flag}
                                                            <SelectItemText>
                                                                {country.label}
                                                            </SelectItemText>
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectGroup>
                                        {index <
                                            allCountriesWithSuggested.length -
                                                1 && <SelectSeparator />}
                                    </React.Fragment>
                                );
                            }
                        )}
                    </SelectContent>
                </Select>
                <br />
                <button type="submit">Submit</button>
                <br />
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </form>
        </Box>
    );
};

export const WithGroups = () => (
    <Box>
        <Label display="block" mb="0-5x">
            Favourite food:
        </Label>
        <Select defaultValue="banana">
            <SelectTrigger />
            <SelectContent>
                {foodGroups.map((foodGroup, index) => {
                    const hasLabel = foodGroup.label !== undefined;

                    return (
                        <React.Fragment key={index}>
                            <SelectGroup>
                                {hasLabel && (
                                    <SelectLabel key={foodGroup.label}>
                                        {foodGroup.label}
                                    </SelectLabel>
                                )}
                                {foodGroup.foods.map((food) => (
                                    <SelectItem
                                        key={food.value}
                                        value={food.value}
                                    >
                                        <SelectItemText>
                                            {food.label}
                                        </SelectItemText>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                            {index < foodGroups.length - 1 && (
                                <SelectSeparator />
                            )}
                        </React.Fragment>
                    );
                })}
            </SelectContent>
        </Select>
    </Box>
);

export const WithinForm = () => {
    const [data, setData] = React.useState({});

    function handleChange(event: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget);
        setData(Object.fromEntries((formData as any).entries()));
    }

    return (
        <form
            onSubmit={(event) => {
                handleChange(event);
                event.preventDefault();
            }}
            onChange={handleChange}
        >
            <Label>Name</Label>
            <input
                name="name"
                autoComplete="name"
                className={box({
                    display: "block",
                    mt: "0-5x",
                })}
            />
            <br />
            <Label>Country</Label>
            <Select name="country" autoComplete="country" defaultValue="fr">
                <SelectTrigger mt="0-5x" />
                <SelectContent>
                    <SelectItem value="fr">
                        <SelectItemText>France</SelectItemText>
                    </SelectItem>
                    <SelectItem value="uk">
                        <SelectItemText>United Kingdom</SelectItemText>
                    </SelectItem>
                    <SelectItem value="es">
                        <SelectItemText>Spain</SelectItemText>
                    </SelectItem>
                </SelectContent>
            </Select>

            <br />
            <button type="submit">Submit</button>
            <br />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </form>
    );
};

export const DisabledWithinForm = () => {
    const [data, setData] = React.useState({});

    function handleChange(event: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget);
        setData(Object.fromEntries((formData as any).entries()));
    }

    return (
        <form
            onSubmit={(event) => {
                handleChange(event);
                event.preventDefault();
            }}
            onChange={handleChange}
        >
            <Label>Name</Label>
            <input
                name="name"
                autoComplete="name"
                className={box({
                    display: "block",
                    mt: "0-5x",
                })}
            />
            <br />
            <Label>Country</Label>
            <Select
                disabled
                name="country"
                autoComplete="country"
                defaultValue="fr"
            >
                <SelectTrigger mt="0-5x" />
                <SelectContent>
                    <SelectItem value="fr">
                        <SelectItemText>France</SelectItemText>
                    </SelectItem>
                    <SelectItem value="uk">
                        <SelectItemText>United Kingdom</SelectItemText>
                    </SelectItem>
                    <SelectItem value="es">
                        <SelectItemText>Spain</SelectItemText>
                    </SelectItem>
                </SelectContent>
            </Select>

            <br />
            <button type="submit">Submit</button>
            <br />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </form>
    );
};

export const RequiredWithinForm = () => {
    const [data, setData] = React.useState({});

    function handleChange(event: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget);
        setData(Object.fromEntries((formData as any).entries()));
    }

    return (
        <form
            onSubmit={(event) => {
                handleChange(event);
                event.preventDefault();
            }}
            onChange={handleChange}
        >
            <Label>Name</Label>
            <input
                name="name"
                autoComplete="name"
                className={box({
                    display: "block",
                    mt: "0-5x",
                })}
            />
            <br />
            <Label>Country</Label>
            <Select required name="country" autoComplete="country">
                <SelectTrigger mt="0-5x" />
                <SelectContent>
                    <SelectItem value="fr">
                        <SelectItemText>France</SelectItemText>
                    </SelectItem>
                    <SelectItem value="uk">
                        <SelectItemText>United Kingdom</SelectItemText>
                    </SelectItem>
                    <SelectItem value="es">
                        <SelectItemText>Spain</SelectItemText>
                    </SelectItem>
                </SelectContent>
            </Select>

            <br />
            <button type="submit">Submit</button>
            <br />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </form>
    );
};
