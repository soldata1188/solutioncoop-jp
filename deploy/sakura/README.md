# Chạy web tĩnh trên さくらのVPS

Chưa áp dụng lên máy chủ. Không đổi DNS từ các file này.

Site mới là bản xuất tĩnh `web/out/`. Không chạy Node lúc xem trang. Site cũ `solutioncoop-app/` trên VPS không được đè.

## Yêu cầu

- Máy build (VPS hoặc CI): Node ≥ 20.9, nên 22 LTS. Nếu build trên VPS thì RAM ≥ 2 GB.
- Máy phục vụ chỉ cần Nginx. Không cần systemd cho Node.
- Chứng chỉ Let's Encrypt do Boss cài sau, khi đã có SSH và quyết định DNS.

Trước khi làm trên máy thật, cần Boss cho biết: OS, đang dùng Apache hay Nginx, RAM, cách SSH, thư mục site cũ.

## Cài lần đầu

```bash
sudo mkdir -p /var/www/solutioncoop/releases /var/www/solutioncoop/src
sudo chown -R "$USER" /var/www/solutioncoop
git clone --branch release/2026-11 --single-branch <url-repo> /var/www/solutioncoop/src
# Chỉnh root trong deploy/sakura/nginx.conf.example nếu khác /var/www/solutioncoop/current
sudo cp deploy/sakura/nginx.conf.example /etc/nginx/conf.d/solutioncoop.conf
sudo nginx -t && sudo systemctl reload nginx
BASE=/var/www/solutioncoop SRC=/var/www/solutioncoop/src bash deploy/sakura/deploy.sh
```

`nginx.conf.example` lắng nghe 80 và 443. Domain `solutioncoop-jp.com` chỉ là chỗ dành cho certbot, chưa bật. File mẫu không bật brotli. Nếu máy có module `ngx_brotli` thì có thể thêm `brotli on` trong khối server.

## Cập nhật

```bash
BASE=/var/www/solutioncoop SRC=/var/www/solutioncoop/src bash deploy/sakura/deploy.sh
```

Script kéo fast-forward, `npm run build` trong `web/`, rsync `out/` sang `releases/<thời-điểm>`, đổi symlink `current`, rồi `curl` trang chủ. Lỗi health check thì trỏ lại release trước. Chỉ giữ 3 release mới nhất. Nginx đọc symlink mỗi request, không cần restart Node.

## Rollback

```bash
BASE=/var/www/solutioncoop bash deploy/sakura/rollback.sh
```

## Thêm một tin

Sửa `web/lib/news.ts` rồi build lại. Xem `web/README.md`.
