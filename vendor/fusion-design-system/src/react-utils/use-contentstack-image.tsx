import { BREAKPOINTS } from "@singlestore/fusion/tokens/js/variables/supplementary";
import {
    getContentstackImageSrc,
    isContentstackImage,
} from "@singlestore/fusion/utils/contentstack";

export const DEFAULT_SIZES = {
    lg: 1024,
    md: 768,
    sm: 480,
};

export type UseContentstackImageProps = {
    url?: string;
    urlLg?: string;
    urlMd?: string;
    urlSm?: string;
    maximumPixelDensity?: number;
    sizes?: {
        xl?: number; // optional width larger than the container
        lg?: number;
        md?: number;
        sm?: number;
    };
};

type Source = {
    src: string;
    sourceWidth: number;
};

type BreakpointConfig = {
    imageWidth: number;
    sources: Array<Source>;
    mediaQuery?: string;
};

type ResponsiveImage = {
    sources: Array<Source>;
    fallbackSrc: string;
    srcSetAttr: string;
    sizesAttr: string;
    sizeSources: Array<{ media?: string; srcset: string }>;
};

export const useContentstackImage = ({
    url,
    urlLg: _urlLg,
    urlMd: _urlMd,
    urlSm: _urlSm,
    sizes = {},
    maximumPixelDensity = 3,
}: UseContentstackImageProps): ResponsiveImage => {
    // this must be included because hooks can't be conditionally called so we
    // must allow for invalid parameters
    if (!url || !isContentstackImage(url)) {
        return {
            fallbackSrc: "",
            sources: [],
            sizeSources: [],
            srcSetAttr: "string",
            sizesAttr: "",
        };
    }

    const xl = sizes.xl;
    const lg = sizes.lg || DEFAULT_SIZES.lg;
    const md = sizes.md || DEFAULT_SIZES.md;
    const sm = sizes.sm || DEFAULT_SIZES.sm;

    const breakpoints: Array<BreakpointConfig> = [];

    const getSourcesForViewport = (
        imageWidth: number,
        url: string,
        cssBreakpoint?: keyof typeof BREAKPOINTS
    ): BreakpointConfig => {
        const breakpointConfig: BreakpointConfig = {
            imageWidth,
            sources: [],
        };

        if (cssBreakpoint) {
            breakpointConfig.mediaQuery = BREAKPOINTS[cssBreakpoint];
        }

        for (
            let pixelDensity = 1;
            pixelDensity <= maximumPixelDensity;
            pixelDensity++
        ) {
            const sourceWidth = imageWidth * pixelDensity;
            const imageSrc = getContentstackImageSrc(url, {
                width: sourceWidth,
            });

            const source: Source = {
                src: imageSrc,
                sourceWidth,
            };

            breakpointConfig.sources.push(source);
        }

        return breakpointConfig;
    };

    let fallbackSrc: string = "";

    if (xl) {
        const xlBreakpoint = getSourcesForViewport(xl, url);
        breakpoints.unshift(xlBreakpoint);

        fallbackSrc = xlBreakpoint.sources[0].src;
    }

    const urlLg = _urlLg || url;
    if (!xl || xl !== lg) {
        const lgBreakpoint = getSourcesForViewport(lg, urlLg, "lg-n-below");
        breakpoints.unshift(lgBreakpoint);

        fallbackSrc ||= lgBreakpoint.sources[0].src;
    }

    const urlMd = _urlMd || urlLg;
    if (md !== lg) {
        const mdBreakpoint = getSourcesForViewport(md, urlMd, "md-n-below");
        breakpoints.unshift(mdBreakpoint);

        fallbackSrc ||= mdBreakpoint.sources[0].src;
    }

    const urlSm = _urlSm || urlMd;
    if (sm !== md) {
        const smBreakpoint = getSourcesForViewport(sm, urlSm, "sm-n-below");
        breakpoints.unshift(smBreakpoint);

        fallbackSrc ||= smBreakpoint.sources[0].src;
    }

    let formattedSources: Array<Source> = [];
    if (breakpoints.length > 1) {
        // make 1D, remove duplicates
        formattedSources = breakpoints
            .flatMap((breakpoint) => breakpoint.sources)
            .filter(
                (source, index, self) =>
                    self.findIndex(
                        ({ sourceWidth }) => sourceWidth === source.sourceWidth
                    ) == index
            );
    }

    const formattedSrcSet = formattedSources
        .sort((a, b) => a.sourceWidth - b.sourceWidth)
        .map(({ src, sourceWidth }) => `${src} ${sourceWidth}w`)
        .join(", ");

    const formattedSizes = breakpoints
        .map(({ mediaQuery, imageWidth }, index) => {
            // fallback breakpoint should be the last one (largest image)
            if (index === breakpoints.length - 1) {
                return `${imageWidth}px`;
            }

            return `${mediaQuery} ${imageWidth}px`;
        })
        .join(", ");

    // media and srcset for each breakpoint
    const sizeSources = breakpoints.map(({ sources, mediaQuery }) => {
        const srcSet = sources
            .sort((a, b) => a.sourceWidth - b.sourceWidth)
            .map(({ src, sourceWidth }) => `${src} ${sourceWidth}w`)
            .join(", ");

        return {
            media: mediaQuery,
            srcset: srcSet,
        };
    });

    return {
        fallbackSrc,
        sources: formattedSources,
        sizeSources,
        srcSetAttr: formattedSrcSet,
        sizesAttr: formattedSizes,
    };
};
