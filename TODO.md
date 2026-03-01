# Focused Reader Desktop TODO

## Current Behavior

The app is a small Electron-based PDF reader focused on distraction-free reading.

- Opens a single Electron window and loads `index.html`
- Lets the user choose a local PDF file
- Renders the PDF into a canvas with `pdf.js`
- Adds a dark overlay that hides most of the page except a revealed reading strip
- Supports page navigation with buttons
- Supports adjusting the reveal strip and overlay transparency with keyboard and mouse input
- Supports toggling scroll lock

## Current Review Findings

### High priority

- Rebuild `node_modules` on Linux
  - The checked-in dependency state was installed for Windows and currently contains `electron.exe`, which will not run on Linux.
- Remove insecure Electron defaults before packaging
  - `nodeIntegration: true` and `contextIsolation: false` should not ship in a packaged desktop app.
- Stop opening DevTools by default
  - `main.js` currently opens DevTools on launch, which is a development-only behavior.
- Clarify asset strategy
  - `pdf.mjs` and `pdf.worker.mjs` are committed directly in the repo while `pdfjs-dist` is also listed as a dependency. Pick one source of truth.

### Medium priority

- Clean up dead or misleading code
  - `BroserWindow` is misspelled and unused.
  - `BrowserView` and `path` are imported but unused.
  - `removeOverlay()` exists but is never used.
- Improve rendering robustness
  - `renderPage()` does not handle render task cancellation if a user changes pages quickly.
- Improve input behavior documentation
  - The current controls are not obvious in the UI.
- Decide whether large binary assets belong in the app repo
  - `0327.mp4` and `thumbnail.PNG` may be useful for release assets, docs, or screenshots, but they should not stay in the main branch by accident.

### Nice to have

- Add app icon, desktop metadata, and polished branding
- Remember user preferences like reveal height, transparency, and last window size
- Add a menu or settings panel for discoverability

## Linux Bring-up Plan

### Phase 1: Make the dev environment valid on Arch/Omarchy

- Delete and reinstall `node_modules` on Linux
- Confirm `npm start` launches with a Linux-native Electron binary
- Record any missing system dependencies needed for Electron on this distro
- Verify PDF loading and keyboard/mouse controls on Linux

### Phase 2: Make runtime behavior cross-platform and safer

- Remove DevTools auto-open
- Replace insecure renderer settings with a preload-based bridge if Node access is actually needed
- Audit file loading paths so packaging works from installed locations
- Keep Windows support intact while validating Linux behavior after each change

### Phase 3: Improve the app UX

- Add visible help text for controls
- Improve page layout and canvas sizing for larger PDFs
- Decide whether the overlay should allow interacting with the PDF while active
- Add error states for invalid PDFs or failed loads

## AUR Readiness Plan

### Packaging

- Choose package target:
  - `focused-reader-desktop`
  - or `focused-reader-desktop-git` if distributing from the Git repo head
- Add a Linux launcher script that runs the app with system Electron
- Add a `.desktop` file
- Add an application icon
- Add a `PKGBUILD`
- Add an install layout under `/usr/lib/focused-reader-desktop` or equivalent

### Release expectations

- Decide whether the package depends on Arch `electron` or a versioned Electron package
- Verify the app works when launched from the installed package path, not just the repo root
- Ensure the package does not rely on a Windows-generated `node_modules`
- Document build and update steps for the AUR repo

## Enhancement Backlog

- Open PDFs from command-line arguments or drag-and-drop
- Add recent files
- Add zoom controls and fit-to-width
- Add page thumbnails
- Add keyboard shortcuts for next/previous page
- Add persistent settings
- Add dark/light UI polish
- Add a real reader mode with smooth stepping through lines or regions

## Immediate Next Steps

1. Reinstall dependencies natively on Linux and verify the app launches.
2. Review whether the checked-in PDF assets and media files should remain in the repo.
3. Remove development-only Electron behavior and tighten runtime security.
4. Add packaging files only after the app launches cleanly on Linux.
