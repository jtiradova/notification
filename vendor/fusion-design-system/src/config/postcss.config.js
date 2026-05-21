const path = require("path");

module.exports = {
    plugins: [
        require("autoprefixer"),
        require("@csstools/postcss-global-data")({
            files: [
                path.resolve(
                    path.join(
                        __dirname,
                        "../tokens/css/variables/supplementary/breakpoints.css"
                    )
                ),
            ],
        }),
        require("postcss-preset-env")({
            stage: 3,
            features: {
                "custom-media-queries": true,
            },
        }),
    ],
};
