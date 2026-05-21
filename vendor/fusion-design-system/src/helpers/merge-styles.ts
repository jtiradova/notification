type InlineStyle = Maybe<
    React.CSSProperties | Record<string, Nullable<Maybe<string | number>>>
>;

// Merges CSS styles like `classNames` merges CSS classes
export function mergeStyles(...styles: Array<InlineStyle>): InlineStyle {
    const result: InlineStyle = {};

    for (const style of styles) {
        if (style) {
            for (const key in style) {
                result[key as keyof InlineStyle] =
                    style[key as keyof InlineStyle];
            }
        }
    }

    return Object.keys(result).length ? result : undefined;
}
