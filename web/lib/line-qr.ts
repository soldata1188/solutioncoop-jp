import QRCode from "qrcode";
import { LINE_URL } from "./site.ts";

/** LINEの友だち追加リンク。QRもボタンもこのURLだけを使います。 */
export const LINE_QR_URL = LINE_URL;

const qrOptions = {
  margin: 1,
  errorCorrectionLevel: "M" as const,
};

/** ビルド時に呼ぶQRのSVG。外部のQRサービスは使いません。 */
export async function qrSvg(url: string, dark: string): Promise<string> {
  const svg = await QRCode.toString(url, { ...qrOptions, type: "svg", width: 160, color: { dark, light: "#FFFFFF" } });
  return svg.replace(/<\?xml[^?]*\?>\s*/, "");
}

/** テストで同じ条件のPNGを読み取るために使います。 */
export async function qrPng(url: string, dark: string): Promise<Buffer> {
  return QRCode.toBuffer(url, { ...qrOptions, type: "png", width: 256, color: { dark, light: "#FFFFFF" } });
}

/** LINE友だち追加用。色は LINE の緑です。 */
export async function lineQrSvg(url = LINE_QR_URL): Promise<string> {
  return qrSvg(url, "#06C755");
}

export async function lineQrPng(url = LINE_QR_URL): Promise<Buffer> {
  return qrPng(url, "#06C755");
}
