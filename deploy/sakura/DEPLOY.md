# 公開手順（さくらのVPS）

**Mỗi bước dưới đây cần Boss nói rõ là được làm. File này chỉ là tài liệu. Không tự chạy lên máy chủ, không đổi DNS, không merge.**

Thư mục trang đang phục vụ: `/var/www/solutioncoop/current` (symlink). Bản build nằm trong `web/out/`.

## (a) Build tĩnh

Cần Boss duyệt trước khi chạy.

```bash
cd web
npm ci
npm run build
```

Kết quả: thư mục `web/out/`. Trong đó có `index.html`.

## (b) Đưa file lên Nginx

Cần Boss duyệt trước khi chạy.

Giữ bản đang chạy trước (xem mục e). Sau đó tạo một thư mục release theo thời điểm, copy `out/`, rồi đổi symlink.

```bash
BASE=/var/www/solutioncoop
TS=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p "$BASE/releases/$TS"
rsync -a --delete web/out/ "$BASE/releases/$TS/"
ln -s "$BASE/releases/$TS" "$BASE/current.next"
mv -Tf "$BASE/current.next" "$BASE/current"
```

Nginx đọc `/var/www/solutioncoop/current`. Không cần chạy Node để xem trang.

`deploy/sakura/deploy.sh` làm cùng việc này (kéo git, build, rsync, đổi symlink, giữ 3 bản). Chỉ chạy khi Boss bảo.

## (c) 301 của /contact

Cần Boss duyệt trước khi sửa Nginx.

Trong `deploy/sakura/nginx.conf.example` đã có:

```
location = /contact { return 301 "/#contact"; }
location = /contact/ { return 301 "/#contact"; }
```

Dấu `#` phải nằm trong ngoặc kép, nếu không Nginx coi phần sau là ghi chú.

Áp file mẫu vào cấu hình Nginx của máy (đường dẫn do Boss chỉ), rồi:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## (d) Kiểm tra sau khi đưa lên

Cần Boss duyệt trước khi chạy. Đổi host nếu Boss kiểm tra trên máy khác.

```bash
curl -sI https://solutioncoop-jp.com/contact | head -n 20
curl -sI https://solutioncoop-jp.com/contact/ | head -n 20
curl -s https://solutioncoop-jp.com/robots.txt
curl -s https://solutioncoop-jp.com/sitemap.xml
curl -sI https://solutioncoop-jp.com/ | head -n 15
curl -sI https://solutioncoop-jp.com/images/sdgs-logo-yoko-880.avif | head -n 15
```

Kỳ vọng:

- `/contact` và `/contact/` trả `301`, `Location` có `/#contact`.
- `robots.txt` trả về được.
- `sitemap.xml` có đúng 4 URL: `/`, `/about`, `/for-workers`, `/privacy`. Không có `/contact`.
- Canonical của 5 trang:
  - `/` → `https://solutioncoop-jp.com`
  - `/about` → `https://solutioncoop-jp.com/about`
  - `/for-workers` → `https://solutioncoop-jp.com/for-workers`
  - `/privacy` → `https://solutioncoop-jp.com/privacy`
  - `/contact` → `https://solutioncoop-jp.com` (trang chủ)
- Trang chủ trả `200`.
- File AVIF logo SDGs trả `200` và `Content-Type` là `image/avif`.

Xem canonical:

```bash
for p in / /about /for-workers /privacy /contact; do
  echo "== $p"
  curl -s "https://solutioncoop-jp.com$p" | grep -o 'rel="canonical"[^>]*' | head -n 1
done
```

## (e) Quay lại bản trước

Cần Boss duyệt trước khi chạy.

**Trước lần đưa site mới lên lần đầu**, chép nguyên site đang chạy sang chỗ khác, ví dụ:

```bash
sudo tar -C /var/www -czf /var/www/solutioncoop-live-backup-$(date -u +%Y%m%dT%H%M%SZ).tar.gz <thư-mục-site-đang-chạy>
```

Boss chỉ đúng thư mục đang chạy. Không đoán.

Khi đã có các thư mục trong `/var/www/solutioncoop/releases/`, quay symlink về bản liền trước rồi reload Nginx:

```bash
BASE=/var/www/solutioncoop
bash deploy/sakura/rollback.sh
sudo nginx -t && sudo systemctl reload nginx
```

`rollback.sh` trỏ `current` về release liền trước và kiểm tra trang chủ. Nếu health check lỗi, script dừng và báo `current` đang trỏ đâu.
