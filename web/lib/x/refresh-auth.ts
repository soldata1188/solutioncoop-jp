import { timingSafeEqual } from "node:crypto";

export type RefreshAuth = 200 | 401 | 404;

/**
 * 更新用の合言葉を照合します。秘密が未設定なら 404、違う合言葉なら 401、一致なら 200。
 * 合言葉そのものはログに出しません。
 */
export function refreshAuthDecision(secret: string | undefined, key: string | null): RefreshAuth {
  const expected = secret?.trim() ?? "";
  if (!expected) return 404;
  if (!sameSecret(expected, key ?? "")) return 401;
  return 200;
}

function sameSecret(expected: string, given: string): boolean {
  const left = Buffer.from(expected);
  const right = Buffer.from(given);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}
