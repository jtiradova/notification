import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function resolveFusionRoot(): string {
    const candidates = [
        path.resolve(rootDir, "../fusion-design-system"),
        path.resolve(rootDir, "vendor/fusion-design-system"),
    ];
    for (const candidate of candidates) {
        if (fs.existsSync(path.join(candidate, "src"))) {
            return candidate;
        }
    }
    throw new Error(
        "Fusion design system not found. Clone it next to this repo as ../fusion-design-system or into vendor/fusion-design-system (see README)."
    );
}

const fusionRoot = resolveFusionRoot();
const fusionSrc = path.join(fusionRoot, "src");
const fusionNodeModules = path.join(fusionRoot, "node_modules");

export default defineConfig({
    plugins: [react()],
    resolve: {
        dedupe: [
            "react",
            "react-dom",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
        ],
        alias: {
            "@": path.resolve(rootDir, "src"),
            "@single-js/common": path.resolve(rootDir, "src/vendor/common"),
            "~@single-js/common": path.resolve(rootDir, "src/vendor/common"),
            "@singlestore/fusion/styles": path.join(fusionSrc, "styles"),
            "@singlestore/fusion": fusionSrc,
            "@radix-ui/react-popover": path.resolve(
                fusionNodeModules,
                "@radix-ui/react-popover"
            ),
            "@radix-ui/react-tooltip": path.resolve(
                fusionNodeModules,
                "@radix-ui/react-tooltip"
            ),
        },
    },
    optimizeDeps: {
        include: [
            "@radix-ui/react-switch",
            "@radix-ui/react-popover",
            "@radix-ui/react-tooltip",
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    server: {
        port: 5174,
        open: false,
        fs: {
            allow: [rootDir, fusionRoot],
        },
    },
});
