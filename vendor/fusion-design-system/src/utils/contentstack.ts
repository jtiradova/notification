export const isContentstackImage = (image: string | object = "") => {
    // Need to check if `image` is of type string because in the
    // NetlifyCMS preview, an uploaded `image` returns an object.
    return (
        typeof image === "string" && image.includes("images.contentstack.io")
    );
};

const isSvgImage = (image: string | object = "") => {
    // Need to check if `image` is of type string because in the
    // NetlifyCMS preview, an uploaded `image` returns an object.
    return typeof image === "string" && image.toLowerCase().endsWith(".svg");
};

/**
 * @function getContentstackImageSrc
 * @see https://www.contentstack.com/docs/developers/apis/image-delivery-api/
 */

type ContentstackImageOptions = {
    width?: number;
    height?: number;
    blur?: number;
    brightness?: number;
    contrast?: number;
    crop?: {
        x?: number | string;
        y?: number | string;
        width: number | string;
        height: number | string;
    };
    overlay?: string;
};

export const getContentstackImageSrc = (
    imageSrc: string = "",
    options: ContentstackImageOptions = {}
) => {
    // If the image is not a Contentstack image or is an SVG,
    // return the original image source without modifications.
    if (!isContentstackImage(imageSrc) || isSvgImage(imageSrc)) {
        return imageSrc;
    }

    const baseUrl = imageSrc.split("?")[0];

    // gifs should not be transformed
    if (baseUrl.toLowerCase().endsWith(".gif")) {
        return imageSrc;
    }

    const existingParams = Object.fromEntries(
        new URL(imageSrc).searchParams.entries()
    );

    const newParams: Record<string, string> = Object.keys(options).reduce(
        (acc, key) => {
            const theseParams = {
                [key]: options[
                    key as keyof ContentstackImageOptions
                ]?.toString(),
            };

            if (key === "crop" && options.crop) {
                const { width, height, x = 0, y = 0 } = options.crop;

                // E.g.: crop=150,100,x0,y0
                theseParams[key] = `${width},${height},x${x},y${y}`;
            }

            // If an image has an overlay, we need the overlay
            // to be the same size as the image (100p equals 100%)
            if (key === "overlay") {
                theseParams["overlay-width"] = "100p";
            }

            // Disable upscaling image if we're resizing
            if (key === "width" || key === "height") {
                theseParams["disable"] = "upscale";
            }

            return {
                ...acc,
                ...theseParams,
            };
        },
        {}
    );

    // Use WebP images if supported by browser
    if (!("auto" in existingParams)) {
        newParams["auto"] = "webp";
    }

    const urlParams: Record<string, string> = {
        ...existingParams,
        ...newParams,
    };

    if (Object.keys(urlParams).length) {
        return `${baseUrl}?${new URLSearchParams(urlParams).toString()}`;
    }

    return imageSrc;
};
