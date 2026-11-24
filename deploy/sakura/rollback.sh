#!/usr/bin/env bash
# Trỏ current về release liền trước, rồi kiểm tra http://127.0.0.1:3000/.
set -euo pipefail

BASE=/var/www/solutioncoop
REL=$BASE/releases
CURRENT=$BASE/current

if [[ "$(id -un)" == "web" ]]; then
  as_root() { sudo "$@"; }
else
  as_root() { "$@"; }
fi

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
as_root systemctl restart solutioncoop-web

ok=0
for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
  if curl -fsS -o /dev/null --max-time 3 http://127.0.0.1:3000/; then
    ok=1
    break
  fi
  sleep 1
done

if [[ "$ok" -ne 1 ]]; then
  echo "Health check sau rollback thất bại. current đang trỏ $prev." >&2
  exit 1
fi

echo "Đã quay lại $prev"
