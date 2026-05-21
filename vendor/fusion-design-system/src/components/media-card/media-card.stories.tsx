import { faPieChart } from "@fortawesome/sharp-solid-svg-icons";
import { FaIcon } from "@singlestore/fusion/components/icon/fa-icon";
import { Box, Flex } from "@singlestore/fusion/components/layout";
import {
    MediaCard,
    MediaCardAuthor,
    MediaCardAuthorAvatar,
    MediaCardAuthorDescription,
    MediaCardAuthorInfo,
    MediaCardAuthorName,
    MediaCardBadge,
    MediaCardBadgeGroup,
    MediaCardBody,
    MediaCardEyebrow,
    MediaCardDescription,
    MediaCardFooter,
    MediaCardHeader,
    MediaCardHeaderBadge,
    MediaCardIconHeader,
    MediaCardLink,
    MediaCardTitle,
    mediaCardHeaderVariants,
} from "@singlestore/fusion/components/media-card/media-card";
import { Paragraph } from "@singlestore/fusion/components/typography";
import React from "react";

const EX_ICON_URL =
    "https://raw.githubusercontent.com/singlestore-labs/spaces-notebooks/master/common/images/card-header-icons/data-management.png";
const EX_AUTHOR_IMAGE_URL =
    "https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt6f85fdabbacf7253/632d6e5e5710672259b3c166/sarung-tripathi.jpg";

export default {
    title: "Components / MediaCard",
};

export const BasicUsage = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardEyebrow>This is an Eyebrow</MediaCardEyebrow>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>
        </MediaCardBody>
    </MediaCard>
);

export const Clickable = () => (
    <MediaCard asChild width="50x">
        <a href="https://singlestore.com">
            <MediaCardIconHeader icon={EX_ICON_URL} variant="neutral" />

            <MediaCardBody>
                <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
                <MediaCardTitle>This is a Title</MediaCardTitle>
                <MediaCardDescription>
                    This is a Description
                </MediaCardDescription>
                <MediaCardAuthor>
                    <MediaCardAuthorAvatar
                        src={EX_AUTHOR_IMAGE_URL}
                        fallback="JS"
                    />
                    <MediaCardAuthorInfo>
                        <MediaCardAuthorName>John Smith</MediaCardAuthorName>
                        <MediaCardAuthorDescription>
                            Data Expert
                        </MediaCardAuthorDescription>
                    </MediaCardAuthorInfo>
                </MediaCardAuthor>

                <MediaCardBadgeGroup>
                    <MediaCardBadge>Tag 1</MediaCardBadge>
                    <MediaCardBadge>Tag 2</MediaCardBadge>
                    <MediaCardBadge>Tag 3</MediaCardBadge>
                </MediaCardBadgeGroup>
            </MediaCardBody>
        </a>
    </MediaCard>
);

export const HeaderVariants = () => {
    return (
        <Flex gap="4x" flexWrap="wrap">
            {(
                Object.keys(mediaCardHeaderVariants.variant) as Array<
                    keyof (typeof mediaCardHeaderVariants)["variant"]
                >
            ).map((variant) => (
                <MediaCard key={variant} width="40x">
                    <MediaCardIconHeader icon={EX_ICON_URL} variant={variant} />

                    <MediaCardBody>
                        <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
                        <MediaCardTitle>Variant = {variant}</MediaCardTitle>
                        <MediaCardAuthor>
                            <MediaCardAuthorAvatar
                                src={EX_AUTHOR_IMAGE_URL}
                                fallback="JS"
                            />
                            <MediaCardAuthorInfo>
                                <MediaCardAuthorName>
                                    John Smith
                                </MediaCardAuthorName>
                                <MediaCardAuthorDescription>
                                    Data Expert
                                </MediaCardAuthorDescription>
                            </MediaCardAuthorInfo>
                        </MediaCardAuthor>
                        <MediaCardBadgeGroup>
                            <MediaCardBadge>Tag 1</MediaCardBadge>
                            <MediaCardBadge>Tag 2</MediaCardBadge>
                            <MediaCardBadge>Tag 3</MediaCardBadge>
                        </MediaCardBadgeGroup>
                    </MediaCardBody>
                </MediaCard>
            ))}
        </Flex>
    );
};

export const HeaderBadges = () => {
    return (
        <Flex gap="4x" flexWrap="wrap">
            <MediaCard width="40x">
                <MediaCardIconHeader icon={EX_ICON_URL} variant="neutral">
                    <MediaCardHeaderBadge variant="primary">
                        NEW
                    </MediaCardHeaderBadge>
                </MediaCardIconHeader>

                <MediaCardBody>
                    <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
                    <MediaCardTitle>This is a Title</MediaCardTitle>

                    <MediaCardAuthor>
                        <MediaCardAuthorAvatar
                            src={EX_AUTHOR_IMAGE_URL}
                            fallback="JS"
                        />
                        <MediaCardAuthorInfo>
                            <MediaCardAuthorName>
                                John Smith
                            </MediaCardAuthorName>
                            <MediaCardAuthorDescription>
                                Data Expert
                            </MediaCardAuthorDescription>
                        </MediaCardAuthorInfo>
                    </MediaCardAuthor>

                    <MediaCardBadgeGroup>
                        <MediaCardBadge>Tag 1</MediaCardBadge>
                        <MediaCardBadge>Tag 2</MediaCardBadge>
                        <MediaCardBadge>Tag 3</MediaCardBadge>
                    </MediaCardBadgeGroup>
                </MediaCardBody>
            </MediaCard>
            <MediaCard width="40x">
                <MediaCardIconHeader icon={EX_ICON_URL} variant="neutral">
                    <MediaCardHeaderBadge variant="secondary">
                        Notebook 1/3
                    </MediaCardHeaderBadge>
                </MediaCardIconHeader>

                <MediaCardBody>
                    <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
                    <MediaCardTitle>This is a Title</MediaCardTitle>

                    <MediaCardAuthor>
                        <MediaCardAuthorAvatar
                            src={EX_AUTHOR_IMAGE_URL}
                            fallback="JS"
                        />
                        <MediaCardAuthorInfo>
                            <MediaCardAuthorName>
                                John Smith
                            </MediaCardAuthorName>
                            <MediaCardAuthorDescription>
                                Data Expert
                            </MediaCardAuthorDescription>
                        </MediaCardAuthorInfo>
                    </MediaCardAuthor>

                    <MediaCardBadgeGroup>
                        <MediaCardBadge>Tag 1</MediaCardBadge>
                        <MediaCardBadge>Tag 2</MediaCardBadge>
                        <MediaCardBadge>Tag 3</MediaCardBadge>
                    </MediaCardBadgeGroup>
                </MediaCardBody>
            </MediaCard>
        </Flex>
    );
};

export const ClickableTagsAndAuthor = () => {
    const mainLinkRef = React.useRef<HTMLAnchorElement>(null);

    const handleCardClick = () => {
        mainLinkRef.current?.click();
    };

    return (
        <Box width="50x">
            <Paragraph mb="4x">
                HTML doesn't allow you to nest an interactive element (
                {`<button>`}, {`<a>`} etc.. ) inside another interactive
                element. So, here, we showcase a workaround, where clicking the
                card ({`<div>`}) triggers the action of a separate element (
                {`<a> wrapping the title`}). <br />
                <br />
                <a href="https://css-tricks.com/block-links-the-search-for-a-perfect-solution">
                    Read more about this issue and solution here.
                </a>
            </Paragraph>
            <MediaCard interactive onClick={handleCardClick}>
                <MediaCardIconHeader icon={EX_ICON_URL} variant="neutral" />

                <MediaCardBody>
                    <a ref={mainLinkRef} href="https://singlestore.com">
                        <MediaCardTitle>This is a Title</MediaCardTitle>
                    </a>
                    <MediaCardDescription>
                        This is a Description
                    </MediaCardDescription>

                    <MediaCardAuthor asChild>
                        <a
                            href="https://docs.singlestore.com"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MediaCardAuthorAvatar
                                src={EX_AUTHOR_IMAGE_URL}
                                fallback="JS"
                            />
                            <MediaCardAuthorInfo>
                                <MediaCardAuthorName>
                                    John Smith
                                </MediaCardAuthorName>
                                <MediaCardAuthorDescription>
                                    Data Expert
                                </MediaCardAuthorDescription>
                            </MediaCardAuthorInfo>
                        </a>
                    </MediaCardAuthor>

                    <MediaCardBadgeGroup>
                        <MediaCardBadge variant="secondary" asChild>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Clicked tag 1!");
                                }}
                            >
                                Tag 1
                            </button>
                        </MediaCardBadge>
                        <MediaCardBadge variant="secondary" asChild>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Clicked tag 2");
                                }}
                            >
                                Tag 2
                            </button>
                        </MediaCardBadge>
                        <MediaCardBadge variant="secondary" asChild>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Clicked tag 3");
                                }}
                            >
                                Tag 3
                            </button>
                        </MediaCardBadge>
                    </MediaCardBadgeGroup>
                </MediaCardBody>
            </MediaCard>
        </Box>
    );
};

export const WithLongContent = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardEyebrow>Eyebrow Eyebrow Eyebrow Eyebrow</MediaCardEyebrow>
            <MediaCardTitle>
                This is a Title This is a Title This is a Title This is a Title
                This is a Title This is a Title This is a Title This is a Title
                This is a Title This is a Title
            </MediaCardTitle>
            <MediaCardDescription>
                This is a Description This is a Description This is a
                Description This is a Description This is a Description This is
                a Description This is a Description This is a Description This
                is a Description This is a Description This is a Description
                This is a Description
            </MediaCardDescription>
        </MediaCardBody>
    </MediaCard>
);

export const WithFooterAction = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>
        </MediaCardBody>

        <MediaCardFooter>
            <MediaCardLink asChild>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    Call to action
                </a>
            </MediaCardLink>
        </MediaCardFooter>
    </MediaCard>
);

export const WithTags = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>

            <MediaCardBadgeGroup>
                <MediaCardBadge>Tag 1</MediaCardBadge>
                <MediaCardBadge>Tag 2</MediaCardBadge>
                <MediaCardBadge>Tag 3</MediaCardBadge>
            </MediaCardBadgeGroup>
        </MediaCardBody>
    </MediaCard>
);

export const WithAuthorInformation = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>

            <MediaCardAuthor>
                <MediaCardAuthorInfo>
                    <MediaCardAuthorName>John Smith</MediaCardAuthorName>
                    <MediaCardAuthorDescription>
                        Data Expert
                    </MediaCardAuthorDescription>
                </MediaCardAuthorInfo>
            </MediaCardAuthor>
        </MediaCardBody>
    </MediaCard>
);

export const WithAuthorAvatarInitials = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>

            <MediaCardAuthor>
                <MediaCardAuthorAvatar fallback="JS" />
                <MediaCardAuthorInfo>
                    <MediaCardAuthorName>John Smith</MediaCardAuthorName>
                    <MediaCardAuthorDescription>
                        Data Expert
                    </MediaCardAuthorDescription>
                </MediaCardAuthorInfo>
            </MediaCardAuthor>
        </MediaCardBody>
    </MediaCard>
);

export const WithAuthorAvatarImage = () => (
    <MediaCard width="50x">
        <MediaCardBody>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>

            <MediaCardAuthor>
                <MediaCardAuthorAvatar
                    src={EX_AUTHOR_IMAGE_URL}
                    fallback="JS"
                />
                <MediaCardAuthorInfo>
                    <MediaCardAuthorName>John Smith</MediaCardAuthorName>
                    <MediaCardAuthorDescription>
                        Data Expert
                    </MediaCardAuthorDescription>
                </MediaCardAuthorInfo>
            </MediaCardAuthor>
        </MediaCardBody>
    </MediaCard>
);

export const WithIconHeader = () => (
    <MediaCard width="50x">
        <MediaCardIconHeader icon={EX_ICON_URL} variant="neutral" />

        <MediaCardBody>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>
        </MediaCardBody>
    </MediaCard>
);

export const WithCustomIcon = () => (
    <MediaCard width="50x">
        <MediaCardIconHeader
            className="dark-mode"
            icon={<FaIcon icon={faPieChart} color="info" size="xl" />}
            variant="neutral"
        />

        <MediaCardBody>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>
        </MediaCardBody>
    </MediaCard>
);

export const WithCustomHeader = () => (
    <MediaCard width="50x">
        <MediaCardHeader p="2x" variant="unstyled">
            Custom header content
        </MediaCardHeader>

        <MediaCardBody>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>
        </MediaCardBody>
    </MediaCard>
);

export const WithEverything = () => (
    <MediaCard width="50x">
        <MediaCardIconHeader icon={EX_ICON_URL} variant="neutral" />

        <MediaCardBody>
            <MediaCardEyebrow>Eyebrow</MediaCardEyebrow>
            <MediaCardTitle>This is a Title</MediaCardTitle>
            <MediaCardDescription>This is a Description</MediaCardDescription>

            <MediaCardAuthor>
                <MediaCardAuthorAvatar
                    fallback="JS"
                    src={EX_AUTHOR_IMAGE_URL}
                />
                <MediaCardAuthorInfo>
                    <MediaCardAuthorName>John Smith</MediaCardAuthorName>
                    <MediaCardAuthorDescription>
                        Data Expert
                    </MediaCardAuthorDescription>
                </MediaCardAuthorInfo>
            </MediaCardAuthor>
            <MediaCardBadgeGroup>
                <MediaCardBadge>Tag 1</MediaCardBadge>
                <MediaCardBadge>Tag 2</MediaCardBadge>
                <MediaCardBadge>Tag 3</MediaCardBadge>
            </MediaCardBadgeGroup>
        </MediaCardBody>

        <MediaCardFooter>
            <MediaCardLink asChild>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    Call to action
                </a>
            </MediaCardLink>
        </MediaCardFooter>
    </MediaCard>
);
