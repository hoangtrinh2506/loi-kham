# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Lối Khám" is a Zalo Mini App that helps users find a suitable clinic from their symptoms, with an emergency (115) shortcut and a medication schedule. It started from the **ZaUI Doctor** template (React 18 + TypeScript, Vite 5, `zmp-ui`, `zmp-sdk`, Jotai, react-router-dom v7, Tailwind 3 + SCSS). UI text is Vietnamese. All data is currently mocked.

## Commands

- `npm install` — install dependencies
- `npm start` (`zmp start`) — dev server at `localhost:3000` (requires Zalo Mini App CLI; the README notes Vite 5 support in the CLI is incomplete and recommends the VS Code Zalo Mini App Extension → Run panel → Start instead)
- `npm run login` / `npm run deploy` — `zmp login` / `zmp deploy` to Zalo (needs an App ID)
- `npm run format` — Prettier over `src/**/*.{js,jsx,ts,tsx}`
- `npx tsc` — type-check only (`tsconfig.json` has `noEmit: true`)

There is no test suite and no linter configured.

## Architecture

- **Entry**: `src/app.ts` mounts `RouterProvider` and exposes `app-config.json` as `window.APP_CONFIG`. Vite's `root` is `./src`; the `@/` alias maps to `src/`.
- **Clinic finder flow** (current UI, phase 1, fake data only): `/` Trang chủ → `/symptoms` Mô tả triệu chứng → `/results` Kết quả; `/emergency` Cấp cứu; `/medication` Lịch uống thuốc; `/prescription` Xác nhận toa thuốc. Source design: the "Zalo Mini App phòng khám - UI giai đoạn 1" canvas at https://claude.ai/artifact/2PeWF5THuhvpePYYC4e6Un.
  - `components/layout.tsx` has no shared header or tab bar: each page wraps itself in `components/flow/screen.tsx` (handles the safe-area top inset, since `app-config.json` hides Zalo's action bar) and renders its own `components/flow/back-link.tsx`. Shared stroke icons live in `components/flow/icons.tsx`.
  - Submitting `/symptoms` routes to `/emergency` instead of `/results` when `hasEmergencySigns()` (`src/utils/emergency.ts`) matches a danger keyword.
  - External actions go through `src/utils/actions.ts` (`callPhone`, `openUrl`, Google Maps URL builders) — they use `zmp-sdk` `openPhone`/`openWebview` with browser fallbacks. Unbuilt actions call `notAvailableYet()`.
- **Routing** (`src/router.tsx`): `getBasePath()` returns `/zapps/${window.APP_ID}` in production and Zalo testing envs (`?env=...`); keep this when changing routing. `useRouteHandle()` in `src/hooks.ts` still reads route `handle` (`noScroll` disables page scroll in `components/page.tsx`).
- **Data layer** (`src/state.ts`): all data is Jotai atoms holding Promises (seeded from `src/utils/mock.ts`), consumed with `useAtomValue` under Suspense. To wire a real backend, replace the atom's initializer — UI depends only on the interfaces in `src/types.d.ts`. The symptom form persists across screens in `clinicSearchFormState` (`atomWithReset`).
- **Legacy template code**: the ZaUI Doctor pages (booking, services, departments, schedule, profile…), `components/header.tsx` and `components/footer.tsx` are still in the repo but no longer routed.
- **Errors**: throw `NotifiableError` (`src/utils/errors.ts`) for user-facing errors — the router `ErrorBoundary` toasts its message (and refreshes `userState`); other errors are only logged and render the 404 page. `userState` calls `zmp-sdk` `getUserInfo`, which needs user permission.
- **Navigation**: use `navigate(..., { viewTransition: true })` / `components/transition-link.tsx` to keep view transitions consistent.

## Conventions

- New page: folder in `src/pages/<name>/` with `index.tsx` exporting a `*Page` component wrapped in `<Screen>`, split sections into sibling files, then register it in `src/router.tsx`.
- Theme: core colors are CSS variables in `src/css/app.scss` (`--primary`, `--primary-dark`, `--highlight`, `--background`, `--foreground`, `--muted`, `--disabled`); `tailwind.config.js` maps them plus fixed status palettes (`danger-*`, `warning-*`, `success-*`, `line`, `field`, `subtle`). Font is Be Vietnam Pro (Google Fonts import in `app.scss`). Tailwind overrides font sizes (`2xs`=12px … `xl`=18px, `base`=15px), so larger headings use arbitrary values like `text-[26px]`; safe-area spacing is `st`/`sb`.
- App title (`app.title`) and Zalo OA ID for chat (`template.oaID`) live in `app-config.json`; read them via `getConfig()` from `src/utils/miscellaneous.tsx`.
- Use `toLowerCaseNonAccentVietnamese()` for Vietnamese-insensitive text matching.
