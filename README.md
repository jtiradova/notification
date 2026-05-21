# SingleStore notifications UI (prototype)

Standalone preview of the organization **Notifications** experience (bell popover + full page), built with [Fusion](https://github.com/singlestore/helios/tree/main/fusion-design-system).

## What you need

1. [Node.js](https://nodejs.org/) 18+ and [pnpm](https://pnpm.io/installation)
2. A clone of the **Fusion design system** next to this folder **or** inside `vendor/`:
   - **Recommended:** `git clone <fusion-repo-url> ../fusion-design-system` so this repo and Fusion are siblings.
   - **Alternative:** `git submodule add <fusion-repo-url> vendor/fusion-design-system` then `git submodule update --init`
3. In the Fusion folder, run `pnpm install` once (so Radix packages exist under `fusion-design-system/node_modules`).

## Run the preview

```bash
cd notification
pnpm install
pnpm dev
```

Open the **Local** URL printed in the terminal (usually `http://localhost:5174`).

## Try it

- Click the **bell** in the top bar: unread popover (~500px tall); mark items read or open **View All** for the full page.
- Empty unread state uses a shorter popover (~350px).
- Red dot on the bell when any alert is unread.
- **Alert** / **Activity** tabs use sentence case labels.
- Mock data intentionally has **no** notification `id: "8"` maintenance alert.

## Project layout

| Path | Purpose |
|------|---------|
| `src/notifications/` | Notification UI components |
| `src/vendor/common/` | Minimal `@single-js/common` header + toggle |
| `src/app.tsx`, `preview-top-nav.tsx` | Local preview shell |
| `public/singlestore-logo-black.svg` | Logo in preview header |

## Optional: Helios monorepo

If you already have [helios](https://github.com/singlestore/helios) checked out, you can symlink Fusion instead of cloning again:

```bash
ln -s /path/to/helios/fusion-design-system ../fusion-design-system
```

## Build

```bash
pnpm build
pnpm preview
```

## Font Awesome (first-time install)

Sharp icons require the Font Awesome npm registry. This repo includes an `.npmrc` that reads **`FONTAWESOME_TOKEN`** from your environment (same as the Helios monorepo). Set it before `pnpm install`:

```bash
export FONTAWESOME_TOKEN="your-token-from-fontawesome.com"
pnpm install
```
