# PROMPT CHO CODEX — BACKEND CHO WEBSITE "GALAXY BAND"

## 0. Bối cảnh dự án (đọc kỹ trước khi bắt tay vào việc)

Đây là website **profile + booking** cho Galaxy Band (ban nhạc live music tại TP.HCM). Mục đích: bầu show/khách hàng vào xem profile band, năng lực từng thành viên, clip diễn, và **book band trực tiếp trên website** bằng cách điền form rồi bấm submit.

Dự án hiện tại là **website tĩnh (static HTML/CSS/JS)**, cấu trúc thư mục hiện có (đã hoàn thiện phần giao diện, KHÔNG được thay đổi — xem mục 1):

```
galaxy band website/
├── css/
│   ├── base.css
│   ├── components.css
│   ├── home.css
│   ├── pages.css
│   ├── responsive.css
│   └── tokens.css
├── js/                     (đã có sẵn các file JS cho UI, không rõ tên hết trong ảnh nhưng KHÔNG được đụng vào)
├── Band on stage 1.jpg
├── Band on stage 2.jpg
├── bassist - Hùng Trọng.jpg
├── blog.html
├── cafe show.jpg
├── dich-vu.html
├── drummer - Trần Khuê.jpg
├── festival.JPG
├── galaxy band logo.jpg
├── guitarist - Nhật Hào.JPG
├── index.html
├── keyboardist - Tuấn Duy.jpg
├── lich-show.html
├── vocalist - Louis Nguyễn.jpg
├── vocalist - Ngọc Giàu.jpg
└── vocalist - Trang Halley.jpg
```

Đây KHÔNG phải dự án dùng framework (React/Vue/Next...) — là HTML/CSS/JS thuần, deploy dạng static site. Web không có hệ thống đăng ký/đăng nhập tài khoản (chủ đích tinh giản vì landing page ít chức năng) — khách vào thẳng site, điền form booking, bấm submit là xong. Đây là **kênh nhận booking duy nhất** của band.

Trong `index.html` đã có sẵn **Booking Form** (section "Để lại thông tin để Galaxy Band tư vấn và báo giá phù hợp nhé!") với các field:
- Tên/đơn vị (text, required)
- Số điện thoại/Zalo (text, required nếu Email trống)
- Email (email, required nếu SĐT trống — ít nhất 1 trong 2 phải có)
- Loại show (dropdown — VD: Café acoustic, Sự kiện/Event, Tiệc cưới, YEP/Tiệc công ty, Gala Dinner, Team Building, Khai trương, Khác)
- Ngày dự kiến (date picker)
- Ghi chú nhanh (textarea, optional)
- Nút submit "Gửi yêu cầu booking"

Form booking này hiện xuất hiện lặp lại ở **nhiều trang** (trang chủ `index.html` và trang `dich-vu.html`), nhưng nội dung/cấu trúc field giống nhau.

---

## 1. PHẠM VI CÔNG VIỆC — RANH GIỚI BẮT BUỘC (đọc kỹ, vi phạm là sai yêu cầu)

**Nhiệm vụ của CodeX chỉ là BACKEND.** Cụ thể:

### ĐƯỢC PHÉP làm:
- Thiết kế và tạo schema database trên Supabase (SQL migration/script).
- Viết API endpoint (dạng Vercel Serverless Function, đặt trong thư mục `/api` ở gốc dự án — Vercel hỗ trợ native cho static site + serverless function, **không cần** convert dự án sang Next.js/React) để nhận dữ liệu booking, lưu vào Supabase, và gửi email thông báo.
- Tạo các file cấu hình cần thiết cho backend: `.env.example`, file kết nối Supabase client phía server (VD `lib/supabaseAdmin.js` hoặc tương đương), file cấu hình gửi email.
- Viết tài liệu hướng dẫn riêng (VD `README-backend.md`) giải thích cách deploy, cách cấu hình biến môi trường, cách test.
- Thêm các package cần thiết vào `package.json`/`package-lock.json` (Supabase JS client, thư viện gửi email...) — nếu dự án chưa có `package.json`, được phép tạo mới **chỉ để phục vụ phần backend** (Vercel functions cần Node.js runtime).

### TUYỆT ĐỐI KHÔNG được làm:
- **Không sửa** bất kỳ file `.html` nào đã có (`index.html`, `dich-vu.html`, `lich-show.html`, `blog.html`).
- **Không sửa** bất kỳ file nào trong `css/` (base.css, components.css, home.css, pages.css, responsive.css, tokens.css).
- **Không sửa** bất kỳ file JS nào đã tồn tại sẵn trong thư mục `js/`.
- **Không đổi tên, không di chuyển, không xoá** bất kỳ file/ảnh nào đang có trong dự án.
- **Không tự ý thêm** thư viện UI, không thêm CSS/animation, không "tiện tay" chỉnh sửa giao diện dù chỉ 1 dòng — kể cả khi thấy có thể cải thiện. Phần giao diện đã được xác nhận hoàn thiện, mọi thay đổi ở đây đều gây conflict không mong muốn.
- **Không** đổi cấu trúc thư mục dự án hiện có (không gộp, không refactor lại cây thư mục).

### ⚠️ Một ngoại lệ CẦN HỎI LẠI TRƯỚC KHI LÀM (không được tự ý quyết định):
Để form booking trên `index.html`/`dich-vu.html` gọi được API backend, bắt buộc phải có một đoạn JavaScript nào đó thực hiện `fetch()` gửi dữ liệu form lên endpoint `/api/booking`. Đây là điểm giao giữa frontend và backend, cần làm rõ trước:
- **Cách xử lý đề xuất (an toàn nhất, không đụng file cũ):** tạo **1 file JS mới hoàn toàn tách biệt**, ví dụ `js/booking-submit.js`, chỉ chứa logic: lắng nghe sự kiện submit của form booking, gọi API, hiển thị trạng thái thành công/lỗi. File này **không sửa gì trong các file JS cũ**, chỉ là file cộng thêm.
- Tuy nhiên, để file JS mới này chạy được, **cần được `<script src="js/booking-submit.js">` nhúng vào trong `index.html` và `dich-vu.html`** — đây là dòng duy nhất buộc phải chạm vào file HTML.
- **CodeX phải dừng lại và hỏi rõ người dùng xác nhận** trước khi thêm dòng `<script>` này vào HTML, hoặc hỏi xem người phụ trách frontend có muốn tự tay thêm dòng đó vào (CodeX chỉ cần cung cấp đúng 1 dòng code để họ tự dán) để tuyệt đối không tạo xung đột ngoài ý muốn. Nêu rõ 2 phương án và để người dùng chọn:
  1. CodeX tự thêm đúng 1 dòng `<script>` vào cuối `<body>` của 2 file HTML liên quan (không đụng gì khác).
  2. CodeX chỉ giao file `booking-submit.js` + đoạn code cần dán, người dùng/bên frontend tự dán vào.
- Ngoài dòng `<script>` (nếu được đồng ý ở phương án 1), **không được thêm/sửa bất kỳ thứ gì khác** trong 2 file HTML đó (không đổi `id`, `class`, `name` của các input trong form — nếu cần biết chính xác `id`/`name` hiện tại của từng field trong form để bind đúng, CodeX phải đọc file HTML thật để lấy chính xác, không được đoán bừa).

---

## 2. THIẾT KẾ DATABASE (Supabase / PostgreSQL)

### 2.1 Bảng chính — `bookings` (bắt buộc, MVP, dùng ngay)

```sql
create table public.bookings (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  full_name         text not null,              -- Tên / đơn vị
  phone             text,                        -- Số điện thoại/Zalo (có thể null nếu có email)
  email             text,                        -- Email (có thể null nếu có phone)
  show_type         text not null,               -- Loại show (Café acoustic, Event, Tiệc cưới, ...)
  event_date        date,                        -- Ngày dự kiến (có thể chưa chốt nên cho null)
  note              text,                        -- Ghi chú nhanh
  source_page       text,                        -- 'home' | 'dich-vu' | ... (trang nào gửi form)
  status            text not null default 'new', -- 'new' | 'contacted' | 'confirmed' | 'cancelled' (dùng cho tương lai nếu làm dashboard quản lý)
  email_sent        boolean not null default false, -- đánh dấu đã gửi mail thông báo thành công hay chưa
  email_error       text,                        -- lưu lỗi gửi mail nếu có, để debug sau
  constraint bookings_contact_required check (phone is not null or email is not null)
);

alter table public.bookings enable row level security;

-- Chỉ cho phép INSERT từ phía client (anon key), KHÔNG cho SELECT/UPDATE/DELETE công khai.
create policy "Public can insert bookings"
  on public.bookings for insert
  to anon
  with check (true);

-- Không tạo policy select/update/delete cho anon => mặc định bị chặn hoàn toàn, chỉ service role (server) mới đọc/sửa được.
```

> Lưu ý: thực tế API backend sẽ dùng `service role key` để insert (an toàn hơn, không lộ quyền ghi trực tiếp cho trình duyệt), nên policy insert cho `anon` ở trên có thể **bỏ qua nếu quyết định chỉ insert qua server** (khuyến nghị dùng cách này — xem mục 3). Giữ RLS bật, không cấp bất kỳ quyền nào cho `anon`/`authenticated` là an toàn nhất vì mọi ghi dữ liệu đều đi qua server (service role bypass RLS).

### 2.2 Các bảng khác (KHÔNG bắt buộc làm ngay — chỉ thiết kế sẵn để tương lai mở rộng, không cần implement trong lần này trừ khi được yêu cầu thêm)

Vì hiện tại toàn bộ nội dung profile band, member, media, lịch show, blog đều đang là **nội dung tĩnh viết cứng trong HTML**, không cần bảng dữ liệu ngay. Tuy nhiên nếu tương lai muốn quản lý động qua Supabase (VD admin tự cập nhật lịch show mà không cần sửa code), có thể tham khảo schema gợi ý sau (để dành, chưa cần tạo bảng này ở giai đoạn hiện tại):

```sql
-- (Tương lai, KHÔNG tạo trong scope lần này)
create table public.band_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,          -- Vocalist / Drummer / Guitarist / Bassist / Keyboardist
  bio text,
  photo_url text,
  display_order int default 0
);

create table public.schedule_events (
  id uuid primary key default gen_random_uuid(),
  weekday_label text,          -- "Chủ Nhật", "Thứ 7"...
  venue_name text not null,
  address text,
  start_time time,
  end_time time,
  map_url text,
  event_date date
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  published_at timestamptz default now()
);
```

**Chỉ tạo bảng `bookings` (mục 2.1) trong lần triển khai này.** Các bảng ở mục 2.2 chỉ để tham khảo định hướng, không code/migrate trừ khi có yêu cầu cụ thể sau này.

---

## 3. LUỒNG XỬ LÝ BOOKING (API + GỬI EMAIL)

### 3.1 Kiến trúc tổng quan
```
[Form trên index.html/dich-vu.html]
        │  fetch POST (JS mới - xem mục 1, phần ngoại lệ)
        ▼
[Vercel Serverless Function: /api/booking.js]
        │  1) validate dữ liệu server-side
        │  2) insert vào Supabase (dùng service role key, KHÔNG dùng anon key ở bước này)
        │  3) gửi email thông báo tới tdkhuee@gmail.com
        │  4) trả về JSON { success: true } hoặc { success: false, error }
        ▼
[Supabase Postgres: bảng bookings]      [Email inbox: tdkhuee@gmail.com]
```

### 3.2 API endpoint: `POST /api/booking`
- **Request body (JSON):**
```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "email": "vana@example.com",
  "showType": "Tiệc cưới",
  "eventDate": "2026-12-20",
  "note": "Cần band chơi 2 tiếng, có acoustic set.",
  "sourcePage": "home",
  "honeypot": ""
}
```
- **Validate server-side (bắt buộc, không chỉ tin tưởng validate phía client):**
  - `fullName`: bắt buộc, không rỗng.
  - `phone` hoặc `email`: ít nhất 1 trong 2 phải có, đúng định dạng cơ bản (regex đơn giản đủ dùng, không cần thư viện phức tạp).
  - `showType`: bắt buộc, không rỗng.
  - `honeypot`: field ẩn chống spam bot — nếu field này có giá trị (bot tự động điền), **âm thầm trả về success giả** nhưng KHÔNG lưu DB, KHÔNG gửi mail (tránh bot biết bị chặn).
  - Giới hạn độ dài các field text (VD `note` tối đa 2000 ký tự) để tránh spam dữ liệu rác quá lớn.
- **Response:**
  - Thành công: `{ "success": true }` — HTTP 200.
  - Lỗi validate: `{ "success": false, "error": "Thiếu thông tin bắt buộc" }` — HTTP 400.
  - Lỗi hệ thống (DB/email fail): `{ "success": false, "error": "..." }` — HTTP 500. Lưu ý: nếu insert DB **thành công** nhưng gửi mail **thất bại**, vẫn nên trả `success: true` cho người dùng (vì dữ liệu đã lưu, band vẫn xem được nếu có dashboard sau này) nhưng ghi log lỗi vào cột `email_error` trong bảng để dev biết mà xử lý — không nên bắt khách hàng chịu trách nhiệm lỗi hệ thống email.

### 3.3 Gửi email thông báo
- Người nhận **duy nhất**: `tdkhuee@gmail.com` — đây là kênh nhận booking duy nhất của band, không gửi cho email nào khác, không cần gửi email xác nhận ngược lại cho khách hàng ở phiên bản này (có thể làm sau nếu được yêu cầu).
- Đề xuất dùng dịch vụ email API đơn giản, dễ tích hợp với Vercel Serverless (KHÔNG dùng Nodemailer + SMTP Gmail trực tiếp vì Gmail SMTP thường bị chặn/yêu cầu App Password phức tạp và không ổn định trên serverless). Ưu tiên theo thứ tự:
  1. **Resend** (resend.com) — có gói free, tích hợp cực đơn giản với Node.js, phù hợp Vercel. (Khuyến nghị dùng cái này nếu không có lý do khác.)
  2. Hoặc dịch vụ tương đương nếu người dùng đã có sẵn tài khoản khác (SendGrid, Postmark...) — hỏi người dùng trước khi tự ý chọn nếu Resend không phù hợp.
- Nội dung email thông báo cần có đầy đủ: Tên/đơn vị, SĐT, Email khách, Loại show, Ngày dự kiến, Ghi chú, thời gian gửi, trang nguồn (source_page) — trình bày rõ ràng, dễ đọc (subject email gợi ý: `[Booking mới] {showType} - {fullName}`).

---

## 4. ĐỊNH HƯỚNG HẠ TẦNG (Supabase + Vercel)

- **Supabase**: dùng gói Free tier — đủ dùng vì lượng booking không nhiều, không cần gói trả phí. Chỉ cần 1 project Supabase cho toàn bộ dự án.
- **Vercel**: deploy dự án static hiện tại (HTML/CSS/JS) kèm thư mục `/api` chứa serverless function — Vercel tự nhận diện và deploy cả 2 phần này cùng lúc, không cần cấu hình phức tạp, không cần chuyển sang framework nào khác.
- **Biến môi trường (Environment Variables)** cần cấu hình trên Vercel (Project Settings → Environment Variables), CodeX phải liệt kê rõ trong `.env.example` và `README-backend.md`, **không hardcode bất kỳ key nào trong code**:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (⚠️ chỉ dùng ở phía server/serverless function, tuyệt đối không expose ra frontend/JS phía client)
  - `RESEND_API_KEY` (hoặc key của dịch vụ email được chọn)
  - `BOOKING_NOTIFY_EMAIL=tdkhuee@gmail.com` (để dễ đổi sau này mà không cần sửa code)

---

## 5. QUY TẮC KHI CẦN TÀI NGUYÊN/THÔNG TIN TỪ NGƯỜI DÙNG

CodeX **không được tự bịa, không được mock giả các key/thông tin nhạy cảm rồi coi như xong việc**. Khi cần bất kỳ thứ gì để hoàn thành task, CodeX phải **dừng lại, thông báo rõ ràng cần gì, và hướng dẫn từng bước cách người dùng lấy được thứ đó**, ví dụ:

- Nếu cần tạo project Supabase: hướng dẫn người dùng vào supabase.com → tạo project mới (chọn region gần VN, VD Singapore) → vào Project Settings → API để lấy `Project URL` và `service_role key` (lưu ý cảnh báo rõ đây là key nhạy cảm, không share công khai) → gửi lại cho CodeX (qua biến môi trường, không dán trực tiếp vào chat/code).
- Nếu cần tài khoản Resend: hướng dẫn đăng ký resend.com (free) → xác minh domain gửi email (nếu muốn gửi từ domain riêng của Galaxy Band) hoặc dùng domain test mặc định của Resend cho giai đoạn đầu → lấy API Key ở mục API Keys.
- Nếu cần biết chính xác `name`/`id` của từng input trong form booking để bind JS đúng: CodeX phải đọc trực tiếp file `index.html`/`dich-vu.html` hiện có để lấy chính xác, nếu không đọc được thì hỏi người dùng gửi đoạn HTML của form đó.
- Nếu phát sinh quyết định kỹ thuật không nằm trong prompt này (VD chọn dịch vụ email khác Resend, cần thêm bảng DB khác...), **phải hỏi trước khi tự quyết**, không tự ý mở rộng phạm vi công việc.

---

## 6. CHECKLIST BÀN GIAO (CodeX tự kiểm tra trước khi báo hoàn thành)
- [ ] Không có file HTML/CSS/JS cũ nào bị sửa ngoài đúng 1 ngoại lệ đã được người dùng xác nhận ở mục 1.
- [ ] Bảng `bookings` đã có script SQL đầy đủ, đã bật RLS, không mở quyền đọc công khai.
- [ ] API `/api/booking` validate đầy đủ, có honeypot chống spam, trả response đúng format.
- [ ] Email gửi đúng và chỉ gửi tới `tdkhuee@gmail.com`, nội dung đầy đủ thông tin form.
- [ ] Không có secret/key nào bị hardcode trong code — toàn bộ qua biến môi trường, có `.env.example` mẫu.
- [ ] Có `README-backend.md` hướng dẫn: cách tạo Supabase project, cách lấy key, cách cấu hình biến môi trường trên Vercel, cách test thử API (VD bằng curl/Postman) trước khi nối với frontend thật.
- [ ] Đã liệt kê rõ ràng, cụ thể mọi thứ còn thiếu (key, tài khoản, xác nhận...) cần người dùng cung cấp — không tự mock rồi coi như hoàn thành.
