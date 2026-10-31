---
name: layz-make-short
description: Turn a video link into a finished vertical Short with layZ, from script to export.
---

# Make a Short with layZ

Use the `layz` skill. The user supplies a video URL and, optionally, a topic, length, or tone.

1. Call `layz_get_capabilities`, then `layz_list_templates` and pick the best template (Generic Commentary by default).
2. Start the workflow and follow `layz_get_current_step`.
3. Download the footage, inspect frames yourself, and save timestamped visual notes.
4. Ask the user whether they want guided (approve the script first) or automatic mode, unless they already said.
5. Write a punchy script sized to the requested length (default 30–45 seconds).
6. Generate voiceover, edit, caption, and export at 1080x1920.
7. Review the export frames and audio, then share the editor link, download URL, and a suggested title.
