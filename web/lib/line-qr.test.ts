import assert from "node:assert/strict";
import test from "node:test";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { LINE_QR_URL, lineQrPng, lineQrSvg, qrPng, qrSvg } from "./line-qr.ts";
import { consultMessengerHref } from "./site.ts";

test("the LINE QR decodes to the official friend-add URL", async () => {
  assert.equal(LINE_QR_URL, "https://line.me/R/ti/p/@122kbyao");
  const png = PNG.sync.read(await lineQrPng());
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert.equal(code?.data, "https://line.me/R/ti/p/@122kbyao");
  const svg = await lineQrSvg();
  assert.match(svg, /^<svg[\s>]/);
  assert.equal(svg.includes("https://evil.example"), false);
});

test("the Messenger QR decodes to the button URL, and an empty Messenger link falls back to Facebook", async () => {
  assert.equal(consultMessengerHref(), "https://m.me/solution.sakai");
  assert.equal(consultMessengerHref("", "https://www.facebook.com/solution.sakai"), "https://www.facebook.com/solution.sakai");
  const href = consultMessengerHref();
  const png = PNG.sync.read(await qrPng(href, "#1877F2"));
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert.equal(code?.data, "https://m.me/solution.sakai");
  const svg = await qrSvg(href, "#1877F2");
  assert.match(svg, /^<svg[\s>]/);
});
