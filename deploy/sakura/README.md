# Chạy web trên さくらのVPS

Chưa áp dụng lên máy chủ. Không đổi DNS từ các file này.

Site mới nằm ở `web/` trong repo. Site cũ `solutioncoop-app/` trên VPS không được đè.

## Yêu cầu

- Node ≥ 20.9, nên 22 LTS. Lệnh `node` và `npm` phải có trên PATH mặc định của user `web` (systemd không đọc nvm).
- RAM ≥ 2 GB nếu `npm run build` chạy trên VPS. Build Next 16 có thể chiếm khoảng 1,5–2,5 GB.
- Nginx và chứng chỉ Let's Encrypt do Boss cài sau, khi đã có SSH và quyết định DNS.

Trước khi làm trên máy thật, cần Boss cho biết: OS, đang dùng Apache hay Nginx, RAM, cách SSH, thư mục site cũ.

## Cài lần đầu

```bash
sudo useradd --system --create-home --home-dir /var/www/solutioncoop --shell /bin/bash web
sudo mkdir -p /var/www/solutioncoop/releases /var/www/solutioncoop/shared /var/www/solutioncoop/src
sudo chown -R web:web /var/www/solutioncoop
sudo -u web git clone --branch release/2026-11 --single-branch <url-repo> /var/www/solutioncoop/src
sudo cp deploy/sakura/.env.example /var/www/solutioncoop/shared/.env
sudo chown web:web /var/www/solutioncoop/shared/.env
sudo chmod 600 /var/www/solutioncoop/shared/.env
# File này chỉ cần NODE_ENV. Site không đọc token X. Không xóa token đang có trên Vercel.
sudo cp deploy/sakura/solutioncoop-web.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo bash deploy/sakura/deploy.sh
sudo systemctl enable solutioncoop-web
```

`deploy.sh` lắng nghe `127.0.0.1:3000`. Nginx (`nginx.conf.example`) là mẫu, domain `solutioncoop-jp.com` chỉ là chỗ dành cho certbot, chưa bật.

## Cập nhật

Trên máy chủ, trong bản clone đã theo `release/2026-11`:

```bash
sudo bash deploy/sakura/deploy.sh
```

Script kéo fast-forward, build trong `web/`, copy bản standalone sang `releases/<thời-điểm>`, đổi symlink `current`, restart, rồi `curl` `http://127.0.0.1:3000/`. Lỗi health check thì trỏ lại release trước. Chỉ giữ 3 release mới nhất.

## Rollback

```bash
sudo bash deploy/sakura/rollback.sh
```

Script trỏ `current` về release liền trước, restart, rồi kiểm tra cùng cổng.
