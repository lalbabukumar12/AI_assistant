# AI Assistant

> **Note:** This project is a fork/derivative of [OpenCluely by TechyCSR](https://github.com/TechyCSR/OpenCluely). See [NOTICE.md](NOTICE.md).

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Platforms: Windows | macOS | Linux](https://img.shields.io/badge/Platforms-Windows%20%7C%20macOS%20%7C%20Linux-111111.svg)](#platform-notes)

Real-time AI problem-solving and interview assistant with a stealth desktop overlay invisible to screen recording and video conferencing tools. Ask questions via voice or on-screen screenshot, and receive streamed answers with syntax-highlighted code solutions.

---

## What It Does

AI Assistant is designed for coding practice, mock interviews, and technical problem solving. It runs a lightweight, floating overlay directly on your screen:

- **Invisible overlay:** On Windows and macOS, the overlay is excluded from screen captures in Zoom, Google Meet, Microsoft Teams, Discord, and OBS using native OS window protection flags.
- **Screenshot reasoning:** Capture any portion of your screen with a quick shortcut. The image is passed directly to Google Gemini's multimodal models without lossy OCR steps.
- **Voice transcription:** Speak your questions naturally. Supports fully local offline transcription with OpenAI Whisper (including Voice Activity Detection and silence filtering) or cloud transcription with Azure Speech.
- **Streamed solutions:** Responses stream in real time into a floating overlay and an interactive chat window, complete with Markdown formatting and language-tailored syntax highlighting.
- **Session memory:** Full conversation history is retained across turns for natural follow-up questions, edge cases, and code optimizations.
- **Local & private:** Your API keys and data remain on your machine. Audio and image data are processed locally and only outbound requests sent directly to Google Gemini are transmitted.

---

## Features Implemented

The current codebase includes the following functional capabilities:

- **Stealth Overlay:** Draggable, minimal command bar with instant click-through (non-interactive) mode toggle.
- **Screen Protection:** Native window exclusion from screen capture on macOS (`NSWindowSharingNone`) and Windows (`WDA_EXCLUDEFROMCAPTURE`).
- **Screen Capture & Multimodal AI:** One-click / shortcut screenshot capture analyzed directly by Google Gemini (`gemini-2.5-flash` / `gemini-2.5-flash-lite`).
- **Local Whisper Integration:** Persistent local Python Whisper worker supporting CPU and CUDA acceleration, configurable models (`tiny`, `base`, `small`, `medium`, `turbo`), VAD mode, and phantom phrase silence filtering.
- **Azure Speech Alternative:** Optional Microsoft Azure Speech SDK integration for cloud-based speech recognition.
- **Interactive Multi-Turn Chat:** Dedicated chat window with complete conversation session memory, message copying, and clear history.
- **Floating Response HUD:** Real-time streaming response window with Prism.js code syntax highlighting.
- **Guided Onboarding Wizard:** First-launch interactive setup for validating API keys, configuring speech recognition, and downloading Whisper models.
- **Cross-Platform Launcher:** Custom `scripts/run-electron.js` ensuring compatibility across Windows, macOS, and Linux without Unix shell dependencies.
- **Settings & Disguise Panel:** Customizable shortcuts, language preferences, custom system prompts (e.g., DSA / coding interviews), and process title disguise options.

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/lalbabukumar12/AI_assistant.git
cd AI_assistant
```

### 2. Run the setup script

On macOS and Linux (or Windows with Git Bash):

```bash
./setup.sh
```

Alternatively, install dependencies manually:

```bash
npm install
npm start
```

### 3. Add your Gemini API Key

- On first launch, the Onboarding wizard will automatically appear to guide you through entering your API key.
- You can get a free API key from [Google AI Studio](https://aistudio.google.com/).
- Alternatively, copy `env.example` to `.env` and set `GEMINI_API_KEY`:

```bash
cp env.example .env
```

---

## Configuration

All configuration is managed locally via your `.env` file (or through the in-app Settings UI):

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Speech Recognition Provider: 'whisper', 'azure', or leave blank to disable
SPEECH_PROVIDER=whisper

# Local Whisper Configuration (optional)
WHISPER_COMMAND=whisper
WHISPER_MODEL=small
WHISPER_LANGUAGE=auto
WHISPER_DEVICE=auto
WHISPER_CAPTURE_MODE=vad
WHISPER_RESPONSE_TARGET=both
WHISPER_MANUAL_MAX_MS=90000
WHISPER_GPU_IDLE_MS=60000

# Azure Speech Configuration (optional)
AZURE_SPEECH_KEY=your_azure_speech_key_here
AZURE_SPEECH_REGION=your_azure_region_here
```

---

## Keyboard Shortcuts

| Action | Shortcut | Description |
|---|---|---|
| **Screenshot Capture** | `Ctrl + Shift + S` (`Cmd + Shift + S` on macOS) | Capture screen area and send to Gemini |
| **Toggle Voice Input** | `Alt + R` | Start / stop voice recognition |
| **Toggle System Listening** | `Alt + L` | Start / stop listening to system audio (interviewer) |
| **Answer Interviewer** | `Ctrl + Shift + A` (`Cmd + Shift + A` on macOS) | Answer latest interviewer speech on demand |
| **Toggle Visibility** | `Ctrl + Shift + V` (`Cmd + Shift + V` on macOS) | Show or hide all overlay windows |
| **Toggle Interaction** | `Ctrl + Shift + I` or `Alt + A` | Toggle click-through transparency mode |
| **Open Chat** | `Ctrl + Shift + C` (`Cmd + Shift + C` on macOS) | Open the multi-turn chat panel |
| **Open Settings** | `Ctrl + ,` (`Cmd + ,` on macOS) | Open configuration and preferences |

---

## Platform Notes & Known Limitations

- **Windows:** Supports full screen-capture invisibility via `WDA_EXCLUDEFROMCAPTURE`. Setup can be run via Git Bash or Command Prompt / PowerShell using `npm install` and `npm start`.
- **macOS:** Supports full screen-capture invisibility via `NSWindowSharingNone`. Screen Recording permissions must be granted under *System Settings > Privacy & Security > Screen Recording*.
- **Linux:**
  - **Screen-capture invisibility limitation:** Electron's `setContentProtection` has **no equivalent implementation on Linux** (neither X11 nor Wayland provide an OS-level exclusion flag for window capture). Therefore, on Linux the overlay **will be visible** during full-screen sharing.
  - *Workaround on Linux:* Share a specific application window instead of your entire desktop display, or place the overlay on a separate secondary monitor that is not shared.

---

## Listening to system audio

AI Assistant allows you to capture and transcribe the interviewer's voice coming from meeting applications (Zoom, Google Meet, Microsoft Teams, Discord) through system audio loopback without sending your own microphone audio into their stream or making unnecessary, premature AI queries.

### How It Works

1. **Passive Transcription Buffer (`LISTEN_MODE=manual-answer`):**
   - When listening is ON, system audio is captured, converted to 16 kHz mono PCM16, and transcribed into a rolling ~60-second buffer.
   - Transcribed interviewer speech appears live in the Chat window under the **Interviewer** label with distinct styling.
   - Crucially, in `manual-answer` mode, incoming fragments **do not trigger automatic LLM calls**, so you aren't distracted by half-formed intermediate AI responses while the interviewer is still speaking.

2. **On-Demand Answer:**
   - Press **Answer** (`Ctrl + Shift + A` / `Cmd + Shift + A` or the Bolt icon on the command bar).
   - The app extracts all interviewer speech since your last answer, waits up to ~1s if speech is currently in progress mid-sentence, and streams a structured answer in your selected language into both the floating HUD and Chat.
   - If no new questions were heard, it briefly displays *"No question heard yet"*.

### Per-OS Setup

- **Windows (Native Desktop Audio Loopback):**
  - Uses Electron's native `desktopCapturer` and `getUserMedia` with `chromeMediaSource: 'desktop'` for system loopback capture.
  - The video stream is discarded, and audio is downsampled in real-time to 16 kHz mono 16-bit PCM.
  - **No third-party virtual audio cables or drivers are required.**

- **macOS (BlackHole Virtual Audio Driver):**
  - macOS CoreAudio does not permit applications to record speaker output directly without an audio loopback device.
  - Install BlackHole (2-channel) via Homebrew:
    ```bash
    brew install blackhole-2ch
    ```
  - Open **Audio MIDI Setup** (`Applications > Utilities > Audio MIDI Setup`), click `+` in the lower-left corner, and select **Create Multi-Output Device**.
  - Check both your primary listening device (e.g., Headphones or MacBook Speakers) and **BlackHole 2ch**. Set your primary listening device as the Master Device with Drift Correction enabled for BlackHole.
  - In macOS System Settings, select the Multi-Output Device as your output, or in AI Assistant Settings (`Cmd + ,`), select **BlackHole 2ch** in the *Audio device* dropdown.

- **Linux (PulseAudio / PipeWire Monitor):**
  - Linux systems using PulseAudio or PipeWire expose monitor sources for all active output sinks.
  - In AI Assistant Settings (`Ctrl + ,`), select the monitor source corresponding to your primary audio output (e.g., `Monitor of Built-in Audio Analog Stereo`).

### Shortcuts & Controls

| Control | Shortcut / Action | Function |
|---|---|---|
| **Toggle Listening** | `Alt + L` (or click Headphones icon) | Toggle system loopback capture. Headphones icon pulses red when active. |
| **Answer Question** | `Ctrl + Shift + A` (`Cmd + Shift + A` on macOS) or click **Answer** | Coalesce interviewer speech and trigger streaming solution |
| **Clear Memory** | `Ctrl + Shift + \` (`Cmd + Shift + \` on macOS) | Clear rolling transcript buffer and session context |

### Configuration (`.env`)

```ini
# Audio Source: 'system' (interviewer only), 'mic' (my voice only), or 'both'
AUDIO_SOURCE=both

# Loopback audio device ID ('default' or specific device ID from settings dropdown)
AUDIO_DEVICE_ID=default

# Listen mode: 'manual-answer' (buffer & wait for Answer trigger) or 'continuous'
LISTEN_MODE=manual-answer

# Duration of rolling interviewer transcript buffer in seconds
INTERVIEWER_BUFFER_SECONDS=60
```

### Limitations & Best Practices

- **Speaker / Mic Echo:** If using open speakers together with an active microphone, the microphone may pick up speaker audio. Using headphones or headset is strongly recommended when `AUDIO_SOURCE=both`.
- **System Sound Artifacts:** System audio loopback records all audio routed to your selected output. Close noisy tabs, mute notification chimes, or route meeting audio to the designated device so non-interview sounds are not fed to transcription.
- **In-flight Guard:** Rapidly clicking the Answer button or pressing the shortcut multiple times is automatically guarded so concurrent duplicate LLM queries are not spawned.

---

## Troubleshooting

<details>
<summary><b>Setup and Installation Issues</b></summary>

- **`./setup.sh` syntax error or command not found on Windows:** Use Git Bash (packaged with Git for Windows) or run `npm install` followed by `npm start`.
- **Node or npm not found:** Ensure Node.js 18 or later is installed from [nodejs.org](https://nodejs.org/).
- **Permission denied when executing `setup.sh`:** Run `chmod +x setup.sh` before executing.

</details>

<details>
<summary><b>Microphone and Speech Recognition</b></summary>

- **Local Whisper fails to start:** Ensure Python 3.10+ is installed. Run `pip install openai-whisper` or let `setup.sh` configure `.venv-whisper`.
- **No microphone activity detected:** Check microphone permissions in your operating system settings. If using Whisper, ensure your input device is recognized.

</details>

<details>
<summary><b>Screen Capture</b></summary>

- **macOS captures a blank screen:** Grant Screen Recording permissions to Terminal or Electron in *System Settings > Privacy & Security > Screen Recording*, then restart the application.

</details>

---

## Privacy & Ethics

- **Privacy:** AI Assistant collects zero telemetry and transmits no analytics. All audio and image data are processed directly on your local device. Requests are sent solely to Google Gemini (or Azure Speech, if configured) over encrypted HTTPS connections.
- **Ethics:** This software is designed exclusively for learning, personal practice, mock interviews, and skill building. You are personally responsible for adhering to the honor codes, policies, and terms of any actual interview, competition, or academic examination.

---

## Attribution & License

- This project is a fork/derivative of **[OpenCluely by TechyCSR](https://github.com/TechyCSR/OpenCluely)**.
- For detailed attribution and list of changes, see [NOTICE.md](NOTICE.md).
- Licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for complete terms.

---

## Acknowledgments

- [Google Gemini](https://ai.google.dev/) for multimodal reasoning and generative responses.
- [OpenAI Whisper](https://github.com/openai/whisper) for robust speech transcription.
- [Electron](https://www.electronjs.org/) for the desktop application platform.
- [Vysper by varun-singhh](https://github.com/varun-singhh/Vysper) for UI layout and conceptual inspiration.
