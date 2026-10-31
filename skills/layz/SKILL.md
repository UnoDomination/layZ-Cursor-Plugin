---
name: layz
description: Make, clean, and edit short-form videos with the layZ MCP. Use when the user wants to download a TikTok, YouTube, Instagram, Reels, Shorts, X, or Facebook video; remove watermarks, captions, or burned-in text; enhance or upscale footage; make a commentary or Shorts video from a link; open, edit, or export a layZ editor project; or asks what layZ can do.
---

# layZ

layZ is an AI video platform for short-form creators. The `layz` MCP server exposes the user's layZ account: downloads, cleanup, enhancement, workflow runs, a timeline editor with 100+ commands, and export. Tool calls spend the same credits as the matching dashboard feature.

## Before you start

1. Call `layz_get_capabilities` at the start of every unfamiliar session. Follow what it returns over this file when they differ.
2. Take stock of your own tools in Cursor (browser, screenshots, image viewing, terminal). Use them to inspect real frames and exports. Never claim to have watched or listened to media you could not inspect.
3. If a layZ tool returns an auth or plan error, tell the user to sign in when Cursor prompts, or to pick a paid plan at https://layz.ai/pricing.

## Pick the path

| User wants | Start with |
| --- | --- |
| A file from a link | `layz_download_videos` or `layz_download_media` |
| Remove watermark, captions, or on-screen text | `layz_remove_text` |
| Sharper or larger footage | `layz_enhance_media` |
| A finished Short or commentary video from a link | `layz_list_templates` → `layz_start_workflow` → `layz_get_current_step` |
| Edit an existing project | `layz_list_projects` → `layz_open_editor_project` |
| A new blank project | `layz_create_project` → `layz_open_editor_project` |
| Resume earlier work | `layz_list_runs` → `layz_get_current_step` |
| Use a local file | `layz_request_upload`, give the user the link, then continue once the file appears |

Long jobs return ids. Use `layz_wait_for_processing` or `layz_editor_wait_for_completion` instead of polling in a loop.

## Workflows (commentary and Shorts)

1. `layz_start_workflow` with the template, then `layz_get_current_step`. Follow the step's `productionWorkflow`.
2. Download the source footage. Inspect actual frames yourself with `layz_view_video_frames` and save timestamped `visualNotes` on the downloader step. Do not use `layz_analyze_videos` for commentary.
3. Choose the mode with `layz_set_script_brief`:
   - **automatic**: skip routine questions and keep going.
   - **guided**: show the user the exact script and wait. Call `layz_approve_script` only after the user approves. Any script edit revokes approval.
4. Move through steps with `layz_advance_step`. Do not skip review steps.

## Editing

- Prefer `layz_duplicate_project` before large or risky edits.
- Read state with `layz_get_editor_context` before changing it, and after big batches.
- Batch related changes with `layz_apply_editor_commands` when possible.
- Save with `layz_editor_save_project`, or `layz_editor_save_version` before experiments.
- Check vertical layouts with `layz_editor_check_safe_zones`.

## Export and hand-off

1. `layz_export_video`, then wait for completion.
2. Review the actual export: pull frames with `layz_view_video_frames` and check audio with `layz_measure_audio`. Fix problems before sharing.
3. Give the user the editor link (`layz_get_workflow_link` for runs), the export download URL, and a suggested title. Export URLs are temporary; tell the user to save the file.

## Guardrails

- Only download media the user has the right to use.
- Ask before deleting projects, runs, or versions.
- Keep replies short. Share links and results, not raw tool output.
