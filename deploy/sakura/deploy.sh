#!/usr/bin/env bash
# Build bản tĩnh và trỏ current sang release mới. Chưa chạy lên máy chủ thật.
set -euo pipefail

BASE=${BASE:-/var/www/solutioncoop}
SRC=${SRC:-$BASE/src}
REL=$BASE/releases
CURRENT=$BASE/current
KEEP=3
HEALTH_URL=${HEALTH_URL:-http://127.0.0.1/}

if [[ "$(id -un)" == "web" ]]; then
  as_web() { "$@"; }
else
  if id web >/dev/null 2>&1; then
    as_web() { sudo -u web -- "$@"; }
  else
    as_web() { "$@"; }
  fi
fi

if [[ ! -d "$SRC/web" ]]; then
  echo "Không thấy $SRC/web. Clone release/2026-11 vào $SRC trước." >&2
  exit 1
fi

as_web git -C "$SRC" pull --ff-only
as_web npm --prefix "$SRC/web" ci
as_web npm --prefix "$SRC/web" run build

out="$SRC/web/out"
if [[ ! -f "$out/index.html" ]]; then
  echo "Không thấy $out/index.html. next.config cần output export." >&2
  exit 1
fi

ts=$(date -u +%Y%m%dT%H%M%SZ)
dest="$REL/$ts"
mkdir -p "$dest"
rsync -a --delete "$out"/ "$dest"/
if id web >/dev/null 2>&1; then
  chown -R web:web "$dest"
fi

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

if ! curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL"; then
  echo "Health check thất bại: $HEALTH_URL" >&2
  if [[ -n "$prev" && -d "$prev" ]]; then
    ln -s "$prev" "${CURRENT}.next"
    mv -Tf "${CURRENT}.next" "$CURRENT"
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

echo "Đang phục vụ $dest"
