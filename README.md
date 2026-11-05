# GoodHands Web Admin

React admin frontend ที่สร้างด้วย Vite และ TypeScript

## เริ่มใช้งาน

```bash
Copy-Item .env.example .env.local
npm install
npm run dev
```

แก้ `.env.local` ให้ตรงกับ backend ของคุณ:

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://localhost:8080
VITE_API_WITH_CREDENTIALS=false
```

ในโหมดพัฒนา Vite จะ proxy ทุก request ที่ขึ้นต้น `/api` ไปยัง `VITE_API_PROXY_TARGET` ดังนั้น frontend สามารถเรียก `apiClient('/users')` และส่งต่อไปที่ `http://localhost:8080/api/users` โดยไม่ติด CORS

ถ้า backend มี CORS ตั้งค่าอยู่แล้ว สามารถใช้ URL เต็มได้ เช่น `VITE_API_BASE_URL=https://api.example.com/api` และไม่ต้องกำหนด `VITE_API_PROXY_TARGET`.

## โครงสร้าง

```text
src/
  app/          # จุดประกอบหน้าและ provider ระดับแอป
  assets/       # รูปภาพและ static assets
  components/   # UI ที่ใช้ร่วมกัน
  features/     # โค้ดแยกตามโดเมน/ฟีเจอร์ (API, types, UI)
  lib/          # เครื่องมือพื้นฐาน เช่น API client และ environment
  styles/       # global styles
```

`src/lib/api-client.ts` รวมการเรียก API, JSON serialization, credentials และ error (`ApiError`) ไว้จุดเดียว. ตัวอย่าง endpoint อยู่ที่ `src/features/health` และปุ่มบนหน้าแรกเรียก `GET /api/health`.

## คำสั่ง

```bash
npm run dev
npm run build
npm run lint
```
