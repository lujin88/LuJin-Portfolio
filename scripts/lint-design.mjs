#!/usr/bin/env node
// 设计系统 linter（行 94）：先只查两类。
//   color：写死的色值（#hex、rgb()/rgba()/hsl()/hsla()）
//   size ：不在 12/14/16/20/24/32 里的字号（Lu 2026-11-26 #25706 批的 B 版六级）
// 范围：app/、global-header/、global-footer/ 下的 .css .ts .tsx。
// 用法：node scripts/lint-design.mjs [--report] [--diff <base>] [路径…]
//   --diff origin/main：只算相对 base 新加的行（CI 用，存量不拦）
//   默认有发现就退出码 1；--report 只列不失败。
// 故意写死的行，同一行末尾加 /* lint-ok: 原因 */ 或 // lint-ok: 原因。
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";

const ROOTS = ["app", "global-header", "global-footer"];
const EXT = /\.(css|tsx?)$/;
const SIZES = new Set([12, 14, 16, 20, 24, 32]);
const args = process.argv.slice(2);
const reportOnly = args.includes("--report");
const di0 = args.indexOf("--diff");
const targets = args.filter((a, i) => !a.startsWith("--") && !(di0 >= 0 && i === di0 + 1));

function walk(p, out) {
  let st;
  try { st = statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const n of readdirSync(p)) {
      if (n === "node_modules" || n === ".next") continue;
      walk(join(p, n), out);
    }
  } else if (EXT.test(p)) out.push(p);
}

const files = [];
if (process.argv[1]?.endsWith("lint-design.mjs")) for (const t of targets.length ? targets : ROOTS) walk(t, files);

const COLOR = /(?<![&\w])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b|\b(?:rgba?|hsla?)\(/g;
// 字号：CSS font-size / JS fontSize / Tailwind text-[…] / font 简写（取简写里的字号）
const SIZE_DECL = /font-size\s*:\s*([^;}]+)|fontSize\s*:\s*([^,}\n]+)|\btext-\[([^\]]+)\]/g;
const FONT_SHORT = /(?:^|[;{\s"'])font\s*:\s*([^;}"'`]+)/g;
const LENGTH = /^["'`]?(-?\d*\.?\d+)(px|rem)?["'`]?$/;
const SIZE_TOKEN = /^(-?\d*\.?\d+)(px|rem|em|%|pt|vw|cqw|vh|ch)?(?:\/\S+)?$/;
const NEUTRAL = /^(var\(|inherit|initial|unset|calc\(|clamp\(|min\(|max\(|theme\()/;

// 去掉注释，但不动字符串里的 /* 或 //；块注释跨行用 state.inBlock 记着
export function stripComments(raw, state) {
  let out = "", q = null;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i], d = raw[i + 1];
    if (state.inBlock) {
      if (c === "*" && d === "/") { state.inBlock = false; i++; }
      continue;
    }
    if (q) {
      out += c;
      if (c === "\\") { out += d ?? ""; i++; }
      else if (c === q) q = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") { q = c; out += c; continue; }
    if (c === "/" && d === "*") { state.inBlock = true; i++; continue; }
    if (c === "/" && d === "/" && raw[i - 1] !== ":") break;
    out += c;
  }
  return out;
}

// 返回要报的字号写法（不在六级里）；不用查的返回 null
function badSize(v, fromTailwind) {
  v = v.trim().replace(/\s*!important$/, "");
  if (NEUTRAL.test(v)) return null;
  const mm = v.match(LENGTH);
  if (mm) {
    const num = parseFloat(mm[1]);
    const px = mm[2] === "rem" ? num * 16 : num;
    return SIZE_SET.has(px) ? null : v;
  }
  if (fromTailwind) return null; // text-[#111]、text-[length:var(--x)] 这类不是字号
  return /^[a-z-]+$/.test(v) && !/^(small|smaller|large|larger|medium|x-small|xx-small|x-large|xx-large|xxx-large)$/.test(v) ? null : v;
}
const SIZE_SET = SIZES;

export function lintText(text, name = "<text>") {
  const out = [];
  const lines = text.split("\n");
  const state = { inBlock: false };
  lines.forEach((raw, i) => {
    let line = stripComments(raw, state);
    if (/lint-ok/.test(raw)) return;
    // font-size: 后面换行才写值：把下一行并进来
    if (/(font-size|fontSize)\s*:\s*$/.test(line) && lines[i + 1] !== undefined) line += " " + lines[i + 1].trim();
    for (const m of line.matchAll(COLOR)) out.push({ f: name, n: i + 1, kind: "color", text: m[0], line: raw.trim() });
    for (const m of line.matchAll(SIZE_DECL)) {
      const v = m[1] ?? m[2] ?? m[3];
      const bad = badSize(v, m[3] !== undefined);
      if (bad) out.push({ f: name, n: i + 1, kind: "size", text: bad, line: raw.trim() });
    }
    for (const m of line.matchAll(FONT_SHORT)) {
      const toks = m[1].trim().split(/\s+/);
      if (NEUTRAL.test(toks[0]) || /^(caption|icon|menu|message-box|small-caption|status-bar)$/.test(toks[0])) continue;
      const sz = toks.find((t) => SIZE_TOKEN.test(t) && !/^[1-9]00$/.test(t));
      if (!sz) continue;
      const bad = badSize(sz.split("/")[0], false);
      if (bad) out.push({ f: name, n: i + 1, kind: "size", text: bad, line: raw.trim() });
    }
  });
  return out;
}

// --diff <base>：只留 git diff 里新加的行（CI 用，存量不拦）
function addedLines(base) {
  const diff = execFileSync("git", ["-c", "core.quotepath=false", "diff", "-U0", "--no-color", base + "...HEAD", "--", ...ROOTS], { encoding: "utf8", maxBuffer: 1 << 26 });
  const map = new Map();
  let file = null;
  for (const l of diff.split("\n")) {
    const f = l.match(/^\+\+\+ b\/(.+)$/);
    if (f) { file = f[1]; map.set(file, new Set()); continue; }
    const h = l.match(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/);
    if (h && file) {
      const start = +h[1], n = h[2] === undefined ? 1 : +h[2];
      for (let k = 0; k < n; k++) map.get(file).add(start + k);
    }
  }
  return map;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());
if (isMain) {
  let findings = [];
  const di = args.indexOf("--diff");
  const base = di >= 0 ? args[di + 1] : null;
  for (const f of files) {
    findings.push(...lintText(readFileSync(f, "utf8"), f));
  }
  if (base) {
    const added = addedLines(base);
    findings = findings.filter((x) => added.get(relative(process.cwd(), x.f))?.has(x.n));
  }
  const gh = process.env.GITHUB_ACTIONS === "true";
  for (const x of findings) {
    if (gh) {
      const why = x.kind === "color" ? `写死的色值 ${x.text}：改用设计系统的颜色变量` : `字号 ${x.text} 不在 12/14/16/20/24/32：改成这六级之一`;
      console.log(`::error file=${relative(process.cwd(), x.f)},line=${x.n},title=design-lint::${why}（确实要写死：行尾加 /* lint-ok: 原因 */）`);
    }
    console.log(`${relative(process.cwd(), x.f)}:${x.n}  ${x.kind}  ${x.text}  | ${x.line.slice(0, 100)}`);
  }
  const c = findings.filter((x) => x.kind === "color").length;
  const s = findings.length - c;
  console.log(`\n共 ${findings.length} 条：写死的色值 ${c}，字号不在 12/14/16/20/24/32 ${s}；扫了 ${files.length} 个文件${base ? `（只算相对 ${base} 新加的行）` : ""}`);
  process.exit(findings.length && !reportOnly ? 1 : 0);
}
