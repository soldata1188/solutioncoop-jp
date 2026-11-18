import assert from "node:assert/strict";
import test from "node:test";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { LINE_QR_URL, lineQrPng, lineQrSvg } from "./line-qr.ts";

test("the LINE QR decodes to the official friend-add URL", async () => {
  assert.equal(LINE_QR_URL, "https://line.me/R/ti/p/@122kbyao");
  const png = PNG.sync.read(await lineQrPng());
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert.equal(code?.data, "https://line.me/R/ti/p/@122kbyao");
  const svg = await lineQrSvg();
  assert.match(svg, /^<svg[\s>]/);
  assert.equal(svg.includes("https://evil.example"), false);
});
