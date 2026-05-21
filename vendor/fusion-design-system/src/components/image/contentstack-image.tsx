import React from "react";
import { Image } from "@singlestore/fusion/components/image";
import type { UseContentstackImageProps } from "@singlestore/fusion/react-utils/use-contentstack-image";
import { useContentstackImage } from "@singlestore/fusion/react-utils/use-contentstack-image";
import { useResolveSrc } from "@singlestore/fusion/react-utils/use-resolve-src";

type ContentstackImageProps = Omit<
    React.ComponentProps<typeof Image>,
    "sizes"
> & {
    srcSm?: UseContentstackImageProps["urlSm"];
    srcMd?: UseContentstackImageProps["urlMd"];
    srcLg?: UseContentstackImageProps["urlLg"];
    maximumPixelDensity?: UseContentstackImageProps["maximumPixelDensity"];
} & Pick<UseContentstackImageProps, "sizes">;

// Uses <img> element to render images without art direction
// letting the browser decide which image to load
export const ContentstackImage = React.forwardRef<
    React.ElementRef<"img">,
    ContentstackImageProps
>((props, ref) => {
    const resolveSrc = useResolveSrc();
    const { src, srcSm, srcMd, srcLg, sizes, maximumPixelDensity, ...rest } =
        props;

    const { fallbackSrc, srcSetAttr, sizesAttr } = useContentstackImage({
        url: resolveSrc(src),
        urlSm: resolveSrc(srcSm),
        urlMd: resolveSrc(srcMd),
        urlLg: resolveSrc(srcLg),
        sizes,
        maximumPixelDensity,
    });

    return (
        <Image
            ref={ref}
            src={fallbackSrc}
            srcSet={srcSetAttr}
            sizes={sizesAttr}
            {...rest}
        />
    );
});
