---
name: layz-clean-video
description: Download a video with layZ, remove watermarks and burned-in text, and optionally enhance it.
---

# Clean a video with layZ

Use the `layz` skill. The user supplies a video URL or a local file.

1. Call `layz_get_capabilities`.
2. For a URL, download it with layZ. For a local file, call `layz_request_upload` and give the user the upload link.
3. Remove the watermark and on-screen text or captions.
4. If the user asked for higher quality, enhance the result (default 2x, keep audio).
5. Check a few frames of the result, then return the download URL.
