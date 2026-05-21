# SingleStore notifications UI (prototype)

Standalone preview of the organization **Notifications** experience (bell popover + full page), built with [Fusion](https://github.com/singlestore/helios/tree/main/fusion-design-system).

## What you need

1. [Node.js](https://nodejs.org/) 18+ and [pnpm](https://pnpm.io/installation) 9+
2. **`FONTAWESOME_TOKEN`** for Sharp icons (see below)
3. Fusion is included under `vendor/fusion-design-system/src` — no separate clone required for preview or Vercel.

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

Sharp icons require the Font Awesome npm registry. Set **`FONTAWESOME_TOKEN`** before `pnpm install` (local and Vercel):

```bash
export FONTAWESOME_TOKEN="your-token-from-fontawesome.com"
pnpm install
```

## Deploy on Vercel

1. Import the GitHub repo `jtiradova/notification`.
2. In **Project → Settings → Environment Variables**, add:
   - **`FONTAWESOME_TOKEN`** — your [Font Awesome npm token](https://fontawesome.com/account) (required; without it `pnpm install` fails with 401).
3. Leave **Install Command** as `pnpm install` and **Build Command** as `pnpm build` (or use the defaults from `vercel.json`).
4. Fusion source is **vendored** under `vendor/fusion-design-system/src` — you do not need a sibling Fusion clone on Vercel.

If install still fails, check the build log for:
- `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` — fixed by `auto-install-peers=true` in `.npmrc` (must match the lockfile).
- `Failed to replace env in config: ${FONTAWESOME_TOKEN}` — add `FONTAWESOME_TOKEN` in Vercel (install will fail on Font Awesome packages without it).
- `ERR_PNPM_FETCH_401` — invalid or missing Font Awesome token.
