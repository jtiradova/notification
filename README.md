# SingleStore notifications UI (prototype)

Standalone preview of the organization **Notifications** experience (bell popover + full page), built with [Fusion](https://github.com/singlestore/helios/tree/main/fusion-design-system).

## What you need

1. [Node.js](https://nodejs.org/) 18+ and [pnpm](https://pnpm.io/installation)
2. Fusion is included under `vendor/fusion-design-system/src` — no separate clone required for preview or Vercel.

**No secret tokens for Vercel** — unlike Query Tuner (which uses `lucide-react`), this app originally used Font Awesome *Sharp* (paid npm). The repo now uses free Font Awesome from public npm, so you do **not** need `FONTAWESOME_TOKEN`.

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

## Deploy on Vercel

1. Import the GitHub repo `jtiradova/notification`.
2. Use default settings: **Install** `pnpm install`, **Build** `pnpm build`, **Output** `dist`.
3. No environment variables required (icons install from public npmjs.org).
