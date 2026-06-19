export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
cd ~/app

echo "1. Sao lưu (Backup) dữ liệu tin tức và ảnh upload hiện tại trên VPS"
mkdir -p ~/app_backup/data
mkdir -p ~/app_backup/uploads
if [ -d "solutioncoop-app/data" ]; then
  cp -r solutioncoop-app/data/* ~/app_backup/data/ 2>/dev/null || true
fi
if [ -d "solutioncoop-app/public/uploads" ]; then
  cp -r solutioncoop-app/public/uploads/* ~/app_backup/uploads/ 2>/dev/null || true
fi

echo "2. Reset cứng mã nguồn về master của Github"
git fetch origin master
git reset --hard origin/master

echo "3. Khôi phục lại (Restore) dữ liệu tin tức và ảnh upload của VPS"
if [ -d "~/app_backup/data" ]; then
  cp -r ~/app_backup/data/* solutioncoop-app/data/ 2>/dev/null || true
fi
if [ -d "~/app_backup/uploads" ]; then
  mkdir -p solutioncoop-app/public/uploads
  cp -r ~/app_backup/uploads/* solutioncoop-app/public/uploads/ 2>/dev/null || true
fi

echo "4. Cài đặt thư viện, Biên dịch và Khởi chạy lại ứng dụng"
cd solutioncoop-app
npm install
npm run build
pm2 restart b2b-app || pm2 start npm --name "b2b-app" -- start

echo "Hoàn tất triển khai trên VPS!"
