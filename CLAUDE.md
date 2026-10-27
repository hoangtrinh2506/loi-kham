# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Lối Khám" is a Zalo Mini App for hospitals/clinics, built from the **ZaUI Doctor** template (React 18 + TypeScript, Vite 5, `zmp-ui`, `zmp-sdk`, Jotai, react-router-dom v7, Tailwind 3 + SCSS). UI text is Vietnamese. All data is currently mocked.

## Commands

- `npm install` — install dependencies
- `npm start` (`zmp start`) — dev server at `localhost:3000` (requires Zalo Mini App CLI; the README notes Vite 5 support in the CLI is incomplete and recommends the VS Code Zalo Mini App Extension → Run panel → Start instead)
- `npm run login` / `npm run deploy` — `zmp login` / `zmp deploy` to Zalo (needs an App ID)
- `npm run format` — Prettier over `src/**/*.{js,jsx,ts,tsx}`
- `npx tsc` — type-check only (`tsconfig.json` has `noEmit: true`)

There is no test suite and no linter configured.

## Architecture

- **Entry**: `src/app.ts` mounts `RouterProvider` and exposes `app-config.json` as `window.APP_CONFIG`. Vite's `root` is `./src`; the `@/` alias maps to `src/`.
- **Routing** (`src/router.tsx`): every page is a child of `components/layout.tsx` (Header + scrollable Page with `<Suspense>` around `<Outlet>` + Footer + Toaster). Per-route UI behavior is driven by the route `handle` object, read via `useRouteHandle()` in `src/hooks.ts`:
  - `back: true` → header shows back button + `title` instead of the main gradient header
  - `title: "custom"` → header renders `customTitleState`; pages set it (see `pages/detail/template.tsx`, which sets and restores it on unmount)
  - `noScroll`, `profile` → disable page scroll / show user avatar header
  - `getBasePath()` returns `/zapps/${window.APP_ID}` in production and Zalo testing envs (`?env=...`); keep this when changing routing.
- **Data layer** (`src/state.ts`): all data is Jotai atoms holding Promises (seeded from `src/utils/mock.ts`), consumed with `useAtomValue` under Suspense. Detail lookups use `atomFamily(id)`; search uses `loadable(...)`. To wire a real backend, replace the atom's initializer — UI depends only on the interfaces in `src/types.d.ts`. Form state uses `atomWithReset` atoms (`bookingFormState`, `askFormState`, `feedbackFormState`, `symptomFormState`).
- **Forms**: submit handlers currently fake a request (`wait(1500)` + `promptJSON(formData)` to display the payload as a toast); replace those with real API calls. Booking is a multi-step flow at `/booking/:step?` dispatching to `step1`–`step3.tsx`.
- **Detail pages**: `/service/:id` and `/department/:id` share `pages/detail/template.tsx` (3 tabs, data passed through `DetailPageContext`). Query params `?tab=N` and `?doctor=ID` preselect tab/doctor.
- **Errors**: throw `NotifiableError` (`src/utils/errors.ts`) for user-facing errors — the router `ErrorBoundary` toasts its message (and refreshes `userState`); other errors are only logged and render the 404 page. `userState` calls `zmp-sdk` `getUserInfo`, which needs user permission.
- **Navigation**: use `navigate(..., { viewTransition: true })` / `components/transition-link.tsx` to keep view transitions consistent.

## Conventions

- New page: folder in `src/pages/<name>/` with `index.tsx` exporting a `*Page` component, split sections into sibling files, then register it in `src/router.tsx` with an appropriate `handle`.
- Theme colors are CSS variables in `src/css/app.scss` (`--primary`, `--primary-gradient`, `--highlight`, `--background`, `--disabled`) exposed as Tailwind colors in `tailwind.config.js`; Tailwind also defines custom font sizes (`4xs`…`xl`) and safe-area spacing (`st`, `sb`).
- App title (`app.title`) and Zalo OA ID for chat (`template.oaID`) live in `app-config.json`; read them via `getConfig()` from `src/utils/miscellaneous.tsx`.
- Use `toLowerCaseNonAccentVietnamese()` for Vietnamese-insensitive text matching.
