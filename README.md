# layZ AI Cursor plugin

Connects Cursor Agent to [layZ AI](https://layz.ai) so it can download, clean, enhance, edit, and export short-form videos from your layZ account.

This repo is a thin wrapper. The MCP server stays hosted at `https://api.layz.ai/mcp`; no API code ships here.

## What it installs

| Path | Purpose |
| --- | --- |
| `.cursor-plugin/plugin.json` | Plugin identity and marketplace metadata |
| `mcp.json` | The remote layZ MCP server (Streamable HTTP, OAuth) |
| `skills/layz/SKILL.md` | How to pick tools, run workflows, edit projects, and review exports |
| `rules/layz.mdc` | Short guardrails the agent applies to layZ requests |
| `commands/` | `/layz-make-short`, `/layz-clean-video`, `/layz-edit-project` |
| `assets/logo.png` | Marketplace logo |

## Requirements

- A paid layZ plan (Starter, Creator, or Pro)
- Cursor with plugin support

## Sign in

The first time Agent calls a layZ tool, Cursor opens the layZ sign-in and consent page (`layz.ai/mcp/authorize`). Approve it once. Manage or revoke the connection under [Settings → Connections](https://layz.ai/app/settings/connections).

## Try it

```text
What can layZ do? Call layz_get_capabilities and summarize it.
```

```text
/layz-clean-video https://www.tiktok.com/@creator/video/123
```

```text
/layz-make-short https://youtube.com/shorts/abc — 35 seconds, guided mode
```

More prompts: [docs.layz.ai/mcp/example-prompts](https://docs.layz.ai/mcp/example-prompts).

## Support

- Docs: [docs.layz.ai/mcp/connect-cursor](https://docs.layz.ai/mcp/connect-cursor)
- Contact: [layz.ai/contact](https://layz.ai/contact) or support@layz.ai

## Updating

Tool changes on the live MCP show up without a plugin release. Bump `version` in `.cursor-plugin/plugin.json` when the manifest, skill, rules, commands, or MCP URL change.

## License

MIT
