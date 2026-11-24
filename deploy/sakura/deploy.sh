#!/usr/bin/env bash
# Cập nhật site trên VPS. Chưa được chạy từ repo này lên máy thật.
set -euo pipefail

BASE=/var/www/solutioncoop
SRC=${SRC:-$BASE/src}
REL=$BASE/releases
CURRENT=$BASE/current
KEEP=3

if [[ "$(id -un)" == "web" ]]; then
  as_web() { "$@"; }
  as_root() { sudo "$@"; }
else
  as_web() { sudo -u web -- "$@"; }
  as_root() { "$@"; }
fi

if [[ ! -d "$SRC/web" ]]; then
  echo "Không thấy $SRC/web. Clone release/2026-11 vào $SRC trước." >&2
  exit 1
fi

as_web git -C "$SRC" pull --ff-only
as_web npm --prefix "$SRC/web" ci
as_web npm --prefix "$SRC/web" run build

stand="$SRC/web/.next/standalone"
if [[ ! -f "$stand/server.js" ]]; then
  echo "Không thấy $stand/server.js. next.config cần output standalone." >&2
  exit 1
fi

ts=$(date -u +%Y%m%dT%H%M%SZ)
dest="$REL/$ts"
mkdir -p "$dest"
cp -a "$stand/." "$dest/"
rm -rf "$dest/public"
cp -a "$SRC/web/public" "$dest/public"
mkdir -p "$dest/.next"
rm -rf "$dest/.next/static"
cp -a "$SRC/web/.next/static" "$dest/.next/static"
chown -R web:web "$dest"

if [[ -e "$CURRENT" && ! -L "$CURRENT" ]]; then
  echo "$CURRENT đã tồn tại và không phải symlink. Dừng để không đè." >&2
  exit 1
fi

prev=""
if [[ -L "$CURRENT" ]]; then
  prev=$(readlink -f "$CURRENT" || true)
fi

ln -s "$dest" "${CURRENT}.next"
mv -Tf "${CURRENT}.next" "$CURRENT"

health() {
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
    if curl -fsS -o /dev/null --max-time 3 http://127.0.0.1:3000/; then
      return 0
    fi
    sleep 1
  done
  return 1
}

as_root systemctl restart solutioncoop-web
if ! health; then
  echo "Health check thất bại." >&2
  if [[ -n "$prev" && -d "$prev" ]]; then
    ln -s "$prev" "${CURRENT}.next"
    mv -Tf "${CURRENT}.next" "$CURRENT"
    as_root systemctl restart solutioncoop-web || true
  fi
  exit 1
fi

mapfile -t names < <(find "$REL" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -r)
count=0
for name in "${names[@]}"; do
  count=$((count + 1))
  if (( count > KEEP )); then
    rm -rf "${REL:?}/${name:?}"
  fi
done

echo "Đang chạy $dest"
