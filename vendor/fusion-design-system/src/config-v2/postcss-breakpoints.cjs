const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

// Build a list of breakpoints from "@custom media" rules in "breakpoints.css"
const breakpointsFile = path.resolve(
    __dirname,
    "../tokens-v2/css/variables/breakpoint.css"
);
const breakpointsCss = fs.readFileSync(breakpointsFile, "utf-8");
const breakpoints = postcss
    .parse(breakpointsCss)
    .nodes.map((node) => {
        if (node.type === "atrule" && node.name === "custom-media") {
            const [_match, name, params] = node.params.match(
                /--(xs|sm|md|lg|xl)\s+(.+)/
            );

            return { name, params };
        }

        return null;
    })
    .filter(Boolean);

const cache = new WeakMap();

module.exports = () => ({
    postcssPlugin: "postcss-breakpoints",
    Rule(rule) {
        if (rule.parent.name === "breakpoints") {
            const breakpointsRule = rule.parent;

            // when we first meet a given @breakpoints at-rule
            if (!cache.has(breakpointsRule)) {
                // create the final media rules for this @breakpoints at-rule
                const medias = breakpoints.reduce(
                    (breakpointsMedias, breakpoint) => {
                        breakpointsMedias[breakpoint.name] = new postcss.AtRule(
                            {
                                name: "media",
                                params: breakpoint.params,
                            }
                        );
                        return breakpointsMedias;
                    },
                    {}
                );

                // add an entry to the cache
                cache.set(breakpointsRule, medias);

                // add final media rules after the @breakpoints at-rule
                const mediaRules = Object.values(medias).reverse();
                mediaRules.forEach((media) => {
                    breakpointsRule.after(media);
                });
            }

            // move the rule itself before @breakpoints at-rule
            breakpointsRule.before(rule);

            // save clone of the rule before we modify it
            const originalRule = rule.clone();
            // clean up the extra indentation
            rule.selector = rule.selector.replace(/\n\s\s/g, "\n");
            rule.cleanRaws();

            // add breakpoint-level rules
            breakpoints.forEach((breakpoint) => {
                const clone = originalRule.clone();
                addBreakpointPrefix(clone, breakpoint.name);
                cache.get(breakpointsRule)[breakpoint.name].append(clone);
            });

            // remove @breakpoints at-rule and clear cache if it has no rules
            if (breakpointsRule.nodes.length === 0) {
                breakpointsRule.remove();
                cache.delete(breakpointsRule);
            }
        }
    },
});

module.exports.postcss = true;

function addBreakpointPrefix(node, prefix) {
    if (node.type === "atrule") {
        node.each((child) => addPrefix(child, prefix));
    }

    /**
     * Should match responsive classes (sui-r- prefix):
     * ```
     * .sui-r-size-1
     * .sui-m-2
     * .-sui-m-2
     * .sui-Button.sui-r-size-1 (captures "sui-r-size-1")
     * ```
     *
     * Should not match:
     * .sui-Button
     */
    const classNameRegexp = /\.(-?sui-r-[a-z0-9\-]+)/g;

    // Check for rules that use compound props on a component:
    // - a component name (prefixed with "sui-" and pascal cased)
    // - followed by 2 or more prop selectors (lowercase, numbers, -)
    //
    // e.g. ".sui-DialogContent.sui-r-size-2.gray"
    if (/\.sui-(?:[A-Z][a-z]+)+(?:\.[a-z0-9\-]+){2,}/.test(node.selector)) {
        throw Error(`
      "${node.selector}" looks like it uses compound props on a component.
      "@breakpoints" does not support compound props yet.
    `);
    }

    if (classNameRegexp.test(node.selector)) {
        node.selector = node.selector.replace(
            classNameRegexp,
            `.${prefix}\\:$1`
        );
    }
}
