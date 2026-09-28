# Project Brief: MUI Button Designer

## 1. Overview

A web application that lets a user visually customize a Material UI (MUI) `Button` component through form controls, see a live, real-time preview of the result, and export the generated React/MUI code — ready to copy or open directly in an online sandbox (CodeSandbox / StackBlitz), similar to the "Basic Button" example on the [MUI docs](https://mui.com/material-ui/react-button/#basic-button).

Think of it as a "button playground": no-code control panel in, production-ready JSX out.

## 2. Goals

- Let users explore MUI Button styling options without reading documentation or writing code.
- Generate clean, copy-pasteable React + MUI code that reflects the exact configuration on screen.
- Make it trivial to drop the generated component into a live sandbox to keep experimenting.
- Support both quick one-off tweaks (variant/color/size) and deep customization (gradients, custom shadows, typography, responsive sizing).

## 3. Target Users

- Frontend developers using MUI who want to speed-run styling decisions.
- Designers/PMs who want to explore options and hand a dev a working code snippet.
- Anyone building a design system who wants to preview theme-level button variants quickly.

## 4. Core Experience / Layout

A two (or three) pane layout:

1. **Control Panel** (left) — grouped, scrollable form controls (see §5).
2. **Live Preview** (center/right) — the actual `<Button>` rendered live, updating on every change, on a neutral canvas with a light/dark background toggle so users can check contrast.
3. **Code Panel** (bottom or right, collapsible) — generated JSX/TSX, syntax-highlighted, with a "Copy" button and "Open in Sandbox" buttons.

## 5. Customization Controls

Organize controls into collapsible sections. Suggested set (this is intentionally extensive — MVP can launch with a subset, see §9):

### Content

- Button label/text (editable input)
- Start icon (icon picker, from `@mui/icons-material`, or "none")
- End icon (icon picker or "none")
- Icon-only mode (renders `IconButton` instead)

### Variant & Color

- Variant: `text` / `outlined` / `contained`
- Color: `primary` / `secondary` / `success` / `error` / `info` / `warning` / custom hex
- Disabled toggle
- Loading state toggle (spinner + disabled, `LoadingButton` pattern from MUI Lab)

### Size & Spacing

- Size preset: `small` / `medium` / `large`
- Custom width (auto / fixed px / percentage / `fullWidth` toggle)
- Custom height
- Padding (top/bottom, left/right — sliders)
- Min-width

### Shape

- Border radius (slider, px or theme-shape token)
- Border width, style (solid/dashed/dotted), color (for outlined variant or custom border)

### Color Fill

- Background color (solid, color picker)
- Gradient toggle → gradient type (linear/radial), angle, 2–3 color stops
- Text/label color
- Hover background color (auto-derived vs custom)
- Active/pressed color

### Elevation & Effects

- Shadow/elevation level (0–24, MUI elevation scale, or custom `box-shadow`)
- Opacity
- Ripple effect on/off (`disableRipple`)
- Transition duration & easing (for hover/press animations)

### Typography

- Font family (theme fonts + Google Fonts picker)
- Font size
- Font weight
- Letter spacing
- Text transform (`none` / `uppercase` / `capitalize` / `lowercase`)
- Italic toggle
- Line height

### States (preview toggles, not just CSS)

- Default / Hover / Focus / Active / Disabled — a small selector to preview each state directly rather than requiring the user to hover manually

### Accessibility

- `aria-label` input (auto-warns if icon-only button has no label)
- Live contrast ratio check between text and background color (WCAG AA/AAA indicator)

### Advanced / Escape Hatches

- Raw `sx` prop JSON editor for power users (merges with generated styles)
- Custom class name / additional CSS override textarea
- Responsive overrides (different size/padding at `sm`/`md`/`lg` breakpoints)

## 6. Code Generation

- Output real, idiomatic MUI code — not a config dump. Two style modes user can toggle between:

- **`sx` prop** (inline styling, good for one-offs)
- **`styled()` component** (better for reuse/theming)
- Syntax-highlighted code block (e.g., via Prism or Shiki) with:

- Copy-to-clipboard button
- Toggle for TypeScript vs JavaScript output
- Toggle to include/exclude imports and a full runnable component wrapper
- "Open in Sandbox" buttons:

- **CodeSandbox** — use the [Define API](https://codesandbox.io/docs/learn/sandboxes/cli-api#define-api) to POST the generated files and open a new sandbox in one click.
- **StackBlitz** — use the [SDK](https://developer.stackblitz.com/platform/api/javascript-sdk) (`sdk.openProject(...)`) for the same effect.
- Generated code should be self-contained (imports, theme wrapper if needed) so it runs unmodified in either sandbox.

## 7. Presets & Sharing

- A gallery of starter presets (e.g., "Primary CTA", "Ghost/Outlined", "Gradient Pill", "Danger", "Icon Only") to load as a starting point.
- "Save preset" (local storage) so users can return to a configuration.
- "Share" — encode the full configuration into a URL query param (base64/compressed JSON) so a link reproduces the exact button + code.
- "Reset to default" button.

## 8. Technical Approach

- **Framework:** React (Vite or Next.js) + TypeScript.
- **UI library:** MUI (`@mui/material`, `@mui/icons-material`), MUI Lab if using `LoadingButton`.
- **State management:** a single config object in `useState`/`useReducer` (or a lightweight store like Zustand) that drives both the live preview and the code generator — single source of truth.
- **Code generation:** template-based string builder (not `eval`) that maps the config object to formatted JSX; run through Prettier (in-browser, e.g. `prettier/standalone`) for clean formatting before display.
- **Syntax highlighting:** Shiki or Prism.
- **Color pickers:** `react-colorful` or MUI-compatible color input.
- **Sandbox export:** CodeSandbox Define API + StackBlitz SDK (both client-side, no backend required).
- **Persistence:** URL state (shareable) + `localStorage` (presets); no backend/database needed for MVP.
- **Hosting:** static site (Vercel/Netlify) — no server required since everything runs client-side.

## 9. Suggested Phasing

**MVP (Phase 1):**
Variant, color, size, border radius, disabled/loading, icon start/end, label text, live preview, code panel with copy button, `sx` output.

**Phase 2:**
Gradients, custom shadows/elevation, typography controls, state preview (hover/focus/active), presets gallery, `styled()` output mode, TS/JS toggle.

**Phase 3:**
CodeSandbox/StackBlitz one-click export, shareable URL encoding, contrast checker, responsive breakpoint overrides, raw `sx` JSON escape hatch, Google Fonts integration.

## 10. Out of Scope (initial version)

- Multi-component design system builder (this is button-only).
- Server-side account system or saved-project database (start with local/URL-based persistence).
- Support for UI libraries other than MUI.

## 11. Success Criteria

- A user with no MUI experience can produce a styled button and valid, copy-pasteable code in under 2 minutes.
- Generated code compiles and renders identically when pasted into a fresh MUI project or opened in CodeSandbox/StackBlitz.
- Every control in §5 has a visible, immediate effect on both the preview and the generated code.
