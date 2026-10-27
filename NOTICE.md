# NOTICE

This project is based on OpenCluely by TechyCSR (https://github.com/TechyCSR/OpenCluely). Modified and maintained by Lalbabu Kumar.

## Attribution

- **Original Project:** OpenCluely (https://github.com/TechyCSR/OpenCluely)
- **Original Author:** TechyCSR (https://techycsr.dev)
- **Original License:** Apache License 2.0 (see [LICENSE](LICENSE))

## Modifications and Changes

The following modifications have been made to the original repository by Lalbabu Kumar:

1. **Rebranding & Repository Metadata:**
   - Updated package configuration (`package.json`) with new author ("Lalbabu Kumar"), repository URL (`https://github.com/lalbabukumar12/AI_assistant`), issue tracker, and homepage links.
   - Renamed application identity to "AI Assistant".
   - Aligned the `license` field in `package.json` and `package-lock.json` to "Apache-2.0" to match the actual upstream `LICENSE` file.

2. **Cross-Platform Execution Script:**
   - Added `scripts/run-electron.js` to enable smooth cross-platform startup on Windows, macOS, and Linux without depending on Unix-specific shell constructs (`env -u ELECTRON_RUN_AS_NODE`).
   - Updated npm run scripts (`start` and `dev`) to use `scripts/run-electron.js`.

3. **UI & Onboarding Attribution Updates:**
   - Replaced promotional author links and branding in `index.html` and `onboarding.html` footers with clear attribution: *"Based on OpenCluely by TechyCSR"* linking directly to upstream.
   - Redirected the repository star button in `onboarding.html` and `onboarding.js` to point to `https://github.com/lalbabukumar12/AI_assistant`.
   - Updated the tray/window menu item in `src/ui/main-window.js` and window titles in `src/managers/window.manager.js`.

4. **Documentation Overhaul:**
   - Rewrote `README.md` to provide accurate, clean documentation without dead promotional badges, broken download links, or stale external URLs.
   - Included clear setup instructions, shortcuts, troubleshooting, and known platform limitations (including Linux content-protection constraints).
   - Documented currently implemented features accurately.

5. **Repository Hygiene & Security:**
   - Removed obsolete/empty `CLAUDE.md`.
   - Confirmed `.gitignore` protects secrets, local environments (`.env`), virtual environments (`.venv-whisper/`), models (`.whisper-models/`), logs, and build artifacts.
   - Verified that no API keys or personal credentials are tracked in version control.

## Acknowledgments

- **Google Gemini:** For multimodal reasoning, screenshot interpretation, and streaming code intelligence.
- **OpenAI Whisper & Azure Speech Services:** For high-accuracy local and cloud speech-to-text processing.
- **Electron:** For the cross-platform desktop application framework.
- **Vysper by varun-singhh (https://github.com/varun-singhh/Vysper):** For UI layout and structural inspiration.
