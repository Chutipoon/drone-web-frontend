# Assignment #2: Drone Web Frontend (Next.js, TypeScript & Tailwind CSS)

เว็บแอปพลิเคชัน Frontend พัฒนาด้วย **Next.js (React + TypeScript)** และ **Tailwind CSS** สำหรับแสดงผลข้อมูลการตั้งค่าโดรน บันทึกอุณหภูมิ และดูประวัติ Log โดยเชื่อมต่อผ่าน **API Server จาก Assignment #1** เท่านั้น

## คุณสมบัติหลัก (Features)

1. **Page #1: View Config (`/`)**
   - ดึงข้อมูล Config ของ `DRONE_ID` ที่กำหนดไว้ในไฟล์ `.env.local` จาก API Server (`GET /configs/{droneId}`)
   - บันทึกข้อมูล Config ไว้ใน Shared Context และ `sessionStorage` เพื่อนำไปใช้ต่อใน Page #2 และ Page #3
   - แสดงผลข้อมูล:
     - **Drone ID**
     - **Drone Name**
     - **Light**
     - **Country**

2. **Page #2: Temperature Log Form (`/log-form`)**
   - แสดงแบบฟอร์มสำหรับป้อนค่า **Temperature in celsius** พร้อมปุ่ม **Submit data**
   - เมื่อกดปุ่ม Submit จะเรียกใช้งาน `POST /logs` ของ API Server (Assignment #1) โดยส่งเฉพาะข้อมูล:
     - `drone_id`, `drone_name`, `country` (ที่ได้มาจากค่า Config)
     - `celsius` (ที่ได้จากตัวเลขที่ผู้ใช้กรอกในฟอร์ม)

3. **Page #3: View Logs (`/logs`)**
   - แสดงรายการ Log ของ `drone_id` ด้วยแท็ก `<table>` เรียงตามเวลา `created` ล่าสุดขึ้นก่อน จำกัดหน้าละ 12 รายการ
   - รองรับ **Pagination** (เปลี่ยนหน้า Previous / Next / เลขหน้า)
   - แสดงข้อมูล 5 คอลัมน์ตามลำดับ:
     1. **Created**
     2. **Country**
     3. **Drone ID**
     4. **Drone Name**
     5. **Celsius**

---

## วิธีการติดตั้งและรันโปรเจกต์ (Local Development)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables (`.env.local`)
คัดลอกไฟล์ `.env.example` ไปเป็น `.env.local` แล้วระบุค่าต่างๆ:
```bash
cp .env.example .env.local
```
ตัวอย่างเนื้อหาในไฟล์ `.env.local`:
```env
DRONE_ID=67010210
API_URL=http://localhost:4000
CONFIG_PATH=/configs
STATUS_PATH=/status
LOG_PATH=/logs
```
> **หมายเหตุ:** ไฟล์ `.env` และ `.env.local` ถูกตั้งค่าให้อยู่ใน `.gitignore` เรียบร้อยแล้วเพื่อป้องกันไม่ให้ข้อมูลสำคัญถูก commit ขึ้น GitHub

### 3. รันเว็บแอปพลิเคชัน
*(ตรวจสอบให้แน่ใจว่ารัน `api-server` ของ Assignment #1 ไว้ที่พอร์ต `4000` แล้ว)*
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## วิธีการ Deploy ขึ้น Cloud (Vercel)

1. อัปโหลดโค้ดขึ้น GitHub Repository (ตรวจสอบว่าไม่มีไฟล์ `.env` หรือ `.env.local` ติดไปด้วย)
2. ไปที่ [Vercel Dashboard](https://vercel.com/) กด **Add New... -> Project** และเลือก Repository นี้
3. ในส่วน **Environment Variables** ให้ตั้งค่า:
   - `DRONE_ID` = `67010210`
   - `API_URL` = URL ของ API Server (Assignment #1) ที่ Deploy ไว้บน Cloud (เช่น `https://your-api-server.vercel.app`)
   - `CONFIG_PATH` = `/configs`
   - `STATUS_PATH` = `/status`
   - `LOG_PATH` = `/logs`
4. กด **Deploy**
