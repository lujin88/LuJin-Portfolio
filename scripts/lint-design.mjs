#!/usr/bin/env node
// 设计系统 linter（行 94）：先只查两类。
//   color：写死的色值（#hex、rgb()/rgba()/hsl()/hsla()）
//   size ：不在 12/14/16/20/24/32 里的字号（Lu 2026-11-26 #25706 批的 B 版六级）
// 范围：app/、global-header/、global-footer/ 下的 .css .ts .tsx。
// 用法：node scripts/lint-design.mjs [--report] [路径…]
//   默认有发现就退出码 1；--report 只列不失败。
// 故意写死的行，同一行末尾加 /* lint-ok: 原因 */ 或 // lint-ok: 原因。
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "global-header", "global-footer"];
const EXT = /\.(css|tsx?)$/;
const SIZES = new Set([12, 14, 16, 20, 24, 32]);
const args = process.argv.slice(2);
const reportOnly = args.includes("--report");
const targets = args.filter((a) => !a.startsWith("--"));

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
for (const t of targets.length ? targets : ROOTS) walk(t, files);

const COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b|\b(?:rgba?|hsla?)\(/g;
// CSS：font-size: 13px；JS：fontSize: 13 / fontSize: "13px"；Tailwind：text-[13px]
const SIZE_DECL = /font-size\s*:\s*([^;}]+)|fontSize\s*:\s*([^,}\n]+)|\btext-\[([^\]]+)\]/g;
const LENGTH = /^["'`]?(-?\d*\.?\d+)(px|rem)?["'`]?$/;

const findings = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  let inBlock = false;
  lines.forEach((raw, i) => {
    if (/lint-ok/.test(raw)) return;
    // 去掉注释（块注释跨行也处理），避免误报
    let line = raw;
    if (inBlock) {
      const e = line.indexOf("*/");
      if (e < 0) return;
      line = line.slice(e + 2); inBlock = false;
    }
    line = line.replace(/\/\*.*?\*\//g, "");
    const s = line.indexOf("/*");
    if (s >= 0) { line = line.slice(0, s); inBlock = true; }
    line = line.replace(/(^|[^:])\/\/.*$/, "$1");

    for (const m of line.matchAll(COLOR)) {
      findings.push({ f, n: i + 1, kind: "color", text: m[0], line: raw.trim() });
    }
    for (const m of line.matchAll(SIZE_DECL)) {
      const v = (m[1] ?? m[2] ?? m[3]).trim().replace(/\s*!important$/, "");
      if (/^(var\(|inherit|initial|unset|calc\(|clamp\(|min\(|max\()/.test(v) || /^(var|theme)\b/.test(v)) continue;
      const mm = v.match(LENGTH);
      if (!mm) {
        // 关键字（small、larger）、em、%、vw 等：不是六级里的值，列出来人工看
        if (/^[a-z-]+$/.test(v) && !/^(px|rem)$/.test(v)) { if (m[3]) continue; }
        findings.push({ f, n: i + 1, kind: "size", text: v, line: raw.trim() });
        continue;
      }
      const num = parseFloat(mm[1]);
      const px = mm[2] === "rem" ? num * 16 : num;
      if (!SIZES.has(px)) findings.push({ f, n: i + 1, kind: "size", text: v, line: raw.trim() });
    }
  });
}

for (const x of findings) {
  console.log(`${relative(process.cwd(), x.f)}:${x.n}  ${x.kind}  ${x.text}  | ${x.line.slice(0, 100)}`);
}
const c = findings.filter((x) => x.kind === "color").length;
const s = findings.length - c;
console.log(`\n共 ${findings.length} 条：写死的色值 ${c}，字号不在 12/14/16/20/24/32 ${s}；扫了 ${files.length} 个文件`);
process.exit(findings.length && !reportOnly ? 1 : 0);
