import QRCode from "qrcode";
import { LINE_URL } from "./site.ts";

/** LINEの友だち追加リンク。QRもボタンもこのURLだけを使います。 */
export const LINE_QR_URL = LINE_URL;

const qrOptions = {
  margin: 1,
  errorCorrectionLevel: "M" as const,
  color: { dark: "#06C755", light: "#FFFFFF" },
};

/** ビルド時に呼ぶ、LINE友だち追加用のSVG。外部のQRサービスは使いません。 */
export async function lineQrSvg(url = LINE_QR_URL): Promise<string> {
  const svg = await QRCode.toString(url, { ...qrOptions, type: "svg", width: 160 });
  return svg.replace(/<\?xml[^?]*\?>\s*/, "");
}

/** テストで同じ条件のPNGを読み取るために使います。 */
export async function lineQrPng(url = LINE_QR_URL): Promise<Buffer> {
  return QRCode.toBuffer(url, { ...qrOptions, type: "png", width: 256 });
}
