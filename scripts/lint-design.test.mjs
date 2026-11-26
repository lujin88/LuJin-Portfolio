// node --test scripts/lint-design.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { lintText } from "./lint-design.mjs";

const kinds = (t) => lintText(t).map((x) => `${x.kind}:${x.text}`);

test("写死的色值和 13px 要报", () => {
  assert.deepEqual(kinds(".a{color:#123456;font-size:13px}"), ["color:#123456", "size:13px"]);
});
test("六级、var()、clamp() 不报", () => {
  assert.deepEqual(kinds(".a{color:var(--c);font-size:14px}.b{font-size:1.5rem}.c{font-size:clamp(1rem,2vw,2rem)}"), []);
});
test("注释里的不报；lint-ok 放行", () => {
  assert.deepEqual(kinds("/* #fff 13px */\n.a{color:#abc} /* lint-ok: 品牌色 */"), []);
});
test("字符串里的 /* 不让后面的行漏查（QA 必修 1）", () => {
  assert.deepEqual(kinds('const s = "a/*b";\nconst c = "#123456";'), ["color:#123456"]);
});
test("font 简写要查字号（QA 必修 2）", () => {
  assert.deepEqual(kinds(".a{font:italic 700 13px/1.4 Arial}"), ["size:13px"]);
  assert.deepEqual(kinds(".a{font:700 16px/1.4 Arial}.b{font:inherit}"), []);
});
test("HTML 实体 &#123; 不当色值（review ①）", () => {
  assert.deepEqual(kinds("<p>&#123;x&#125;</p>"), []);
});
test("text-[#111] 只算色值，不当字号（review ②）", () => {
  assert.deepEqual(kinds('className="text-[#111] text-[13px]"'), ["color:#111", "size:13px"]);
});
test("font-size: 后换行写值也要查（review ③）", () => {
  assert.deepEqual(kinds(".a{\n  font-size:\n    13px;\n}"), ["size:13px"]);
});
