---
name: layz-edit-project
description: Open a layZ editor project, summarize the timeline, and apply the requested edits.
---

# Edit a layZ project

Use the `layz` skill. The user names a project or gives a project id, plus the edits they want.

1. Find the project with `layz_list_projects` if needed, then `layz_open_editor_project`.
2. Read `layz_get_editor_context` and summarize tracks, duration, and canvas size.
3. For large edits, save a version or duplicate the project first.
4. Apply the edits, then save the project.
5. If the user wants a file, export, review frames and audio, and return the download URL with the editor link.
