import React from "react";
import { Image } from "@singlestore/fusion/components/image";
import type { UseContentstackImageProps } from "@singlestore/fusion/react-utils/use-contentstack-image";
import { useContentstackImage } from "@singlestore/fusion/react-utils/use-contentstack-image";
import { useResolveSrc } from "@singlestore/fusion/react-utils/use-resolve-src";
import { cx } from "cva";

type ContentstackPictureProps = {
    src?: UseContentstackImageProps["url"];
    srcSm?: UseContentstackImageProps["urlSm"];
    srcMd?: UseContentstackImageProps["urlMd"];
    srcLg?: UseContentstackImageProps["urlLg"];
} & Pick<UseContentstackImageProps, "sizes" | "maximumPixelDensity"> &
    React.ComponentProps<"picture"> & {
        imgProps?: Omit<React.ComponentProps<typeof Image>, "src">;
    };

// Uses <picture> element to render images with art direction
export const ContentstackPicture = React.forwardRef<
    React.ElementRef<"picture">,
    ContentstackPictureProps
>((props, ref) => {
    const resolveSrc = useResolveSrc();
    const {
        src,
        srcSm,
        srcMd,
        srcLg,
        sizes,
        maximumPixelDensity,
        className,
        imgProps,
        ...rest
    } = props;

    const { fallbackSrc, sizeSources } = useContentstackImage({
        url: resolveSrc(src),
        urlSm: resolveSrc(srcSm),
        urlMd: resolveSrc(srcMd),
        urlLg: resolveSrc(srcLg),
        sizes,
        maximumPixelDensity,
    });

    const sourceNodes = sizeSources.map(({ media, srcset }) => {
        return <source key={media} media={media} srcSet={srcset} />;
    });

    const pictureClasses = cx(className, "sui-c-contentstack-picture");
    const imageClasses = cx(
        imgProps?.className,
        "sui-c-contentstack-picture__image"
    );

    return (
        <picture {...rest} className={pictureClasses} ref={ref}>
            {sourceNodes}
            <Image {...imgProps} className={imageClasses} src={fallbackSrc} />
        </picture>
    );
});
