import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const expectedBranch = "chore/claude-dev-preflight";
const expectedRef = "xczwsamkziqqtdmohdjv";
const branch = execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim();
const mcp = JSON.parse(readFileSync(".mcp.json", "utf8"));
const url = new URL(mcp.mcpServers.supabase.url);
const failures = [];
if (branch === "main" || branch === "dev/demo-30" || branch === "demo/roport-30") failures.push(`rama protegida: ${branch}`);
if (branch !== expectedBranch) console.log(`Rama de trabajo distinta: ${branch}; confirmar base antes de seguir.`);
if (url.origin !== "https://mcp.supabase.com" || url.searchParams.get("project_ref") !== expectedRef || url.searchParams.get("read_only") !== "true") failures.push("MCP remoto sin alcance de proyecto y lectura segura");
if (!existsSync("supabase/config.toml")) failures.push("falta configuración local Supabase");
if (!existsSync("playwright.config.ts")) failures.push("falta configuración Playwright");
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log(`Preflight OK: ${branch}; Supabase remoto de solo lectura; base local y Playwright configurados.`);
