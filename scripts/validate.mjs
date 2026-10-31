#!/usr/bin/env node

// Single-plugin version of cursor/plugin-template's validate-template.mjs.
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const exists = (p) => fs.access(p).then(() => true, () => false);

async function readJson(rel) {
	try {
		return JSON.parse(await fs.readFile(path.join(root, rel), "utf8"));
	} catch (error) {
		errors.push(`${rel}: ${error.message}`);
		return null;
	}
}

function frontmatter(content) {
	const text = content.replace(/\r\n/g, "\n");
	if (!text.startsWith("---\n")) return null;
	const end = text.indexOf("\n---\n", 4);
	if (end === -1) return null;
	const fields = {};
	for (const line of text.slice(4, end).split("\n")) {
		const i = line.indexOf(":");
		if (i > 0) fields[line.slice(0, i).trim()] = line.slice(i + 1).trim();
	}
	return fields;
}

async function checkDir(dir, match, required) {
	const abs = path.join(root, dir);
	if (!(await exists(abs))) return;
	for (const entry of await fs.readdir(abs, { recursive: true })) {
		if (!match(entry)) continue;
		const rel = path.join(dir, entry);
		const fields = frontmatter(await fs.readFile(path.join(root, rel), "utf8"));
		if (!fields) {
			errors.push(`${rel}: missing YAML frontmatter`);
			continue;
		}
		for (const key of required) {
			if (!fields[key]) errors.push(`${rel}: missing "${key}" in frontmatter`);
		}
	}
}

const manifest = await readJson(".cursor-plugin/plugin.json");
if (manifest) {
	if (!/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(manifest.name ?? "")) {
		errors.push('plugin.json: "name" must be lowercase kebab-case');
	}
	for (const key of ["displayName", "version", "description"]) {
		if (!manifest[key]) errors.push(`plugin.json: "${key}" is required`);
	}
	for (const field of ["logo", "rules", "skills", "agents", "commands", "hooks", "mcpServers"]) {
		const value = manifest[field];
		if (typeof value !== "string" || /^https?:\/\//.test(value)) continue;
		if (path.isAbsolute(value) || path.posix.normalize(value).startsWith("..")) {
			errors.push(`plugin.json: "${field}" must be a relative path inside the plugin`);
		} else if (!(await exists(path.join(root, value)))) {
			errors.push(`plugin.json: "${field}" points to missing path "${value}"`);
		}
	}
}

const mcp = await readJson("mcp.json");
for (const [name, server] of Object.entries(mcp?.mcpServers ?? {})) {
	if (!server.url && !server.command) errors.push(`mcp.json: server "${name}" needs "url" or "command"`);
}

const isMarkdown = (f) => /\.(md|mdc|markdown)$/i.test(f);
await checkDir("rules", isMarkdown, ["description"]);
await checkDir("skills", (f) => path.basename(f) === "SKILL.md", ["name", "description"]);
await checkDir("agents", isMarkdown, ["name", "description"]);
await checkDir("commands", (f) => isMarkdown(f) || f.endsWith(".txt"), ["name", "description"]);

if (errors.length > 0) {
	console.error("Validation failed:");
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}
console.log("Validation passed.");
