#!/usr/bin/env bash
# Trỏ current về release liền trước, rồi kiểm tra trang chủ.
set -euo pipefail

BASE=${BASE:-/var/www/solutioncoop}
REL=$BASE/releases
CURRENT=$BASE/current
HEALTH_URL=${HEALTH_URL:-http://127.0.0.1/}

if [[ -e "$CURRENT" && ! -L "$CURRENT" ]]; then
  echo "$CURRENT không phải symlink. Dừng để không đè." >&2
  exit 1
fi
if [[ ! -L "$CURRENT" ]]; then
  echo "Chưa có symlink $CURRENT." >&2
  exit 1
fi

current=$(readlink -f "$CURRENT")
prev=""
while IFS= read -r dir; do
  if [[ "$dir" == "$current" ]]; then
    break
  fi
  prev=$dir
done < <(find "$REL" -mindepth 1 -maxdepth 1 -type d | sort)

if [[ -z "$prev" || "$prev" == "$current" ]]; then
  echo "Không có release trước để quay lại." >&2
  exit 1
fi

ln -s "$prev" "${CURRENT}.next"
mv -Tf "${CURRENT}.next" "$CURRENT"

if ! curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL"; then
  echo "Health check sau rollback thất bại. current đang trỏ $prev." >&2
  exit 1
fi

echo "Đã quay lại $prev"
