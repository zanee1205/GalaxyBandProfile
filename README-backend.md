# Backend nhận booking — Galaxy Band

Backend này bổ sung endpoint `POST /api/booking` cho website tĩnh đang deploy trên Vercel. Endpoint sẽ kiểm tra dữ liệu, lưu booking vào Supabase bằng `service_role key` chỉ dùng ở phía máy chủ, sau đó gửi một email thông báo tới `tdkhuee@gmail.com` qua Resend. Nếu gửi email lỗi nhưng booking đã lưu thành công, khách vẫn nhận phản hồi thành công và lỗi email được ghi lại trong cơ sở dữ liệu.

## 1. Cài đặt thư viện cần thiết

Máy cần có Node.js phiên bản 18 trở lên. Tại thư mục gốc dự án, chạy:

```powershell
npm install
```

## 2. Tạo cơ sở dữ liệu trên Supabase

1. Truy cập [Supabase](https://supabase.com/dashboard) và tạo một project mới. Nên chọn region Singapore để gần Việt Nam.
2. Trong project, mở **SQL Editor** → tạo một query mới.
3. Sao chép toàn bộ nội dung của file `supabase/migrations/20260914_create_bookings.sql` vào query rồi nhấn **Run**.
4. Vào **Project Settings → API**, lấy hai giá trị sau:
   - **Project URL**
   - **service_role key**

`service_role key` là khóa bí mật. Tuyệt đối không đặt khóa này trong HTML, JavaScript phía trình duyệt, hoặc repository công khai.

RLS được bật và không có quyền công khai nào được cấp. Chỉ Vercel Serverless Function sử dụng `service_role key` mới có thể ghi booking.

## 3. Thiết lập Resend để gửi email

1. Tạo tài khoản tại [Resend](https://resend.com), sau đó tạo một API key.
2. Thêm và xác minh domain email sẽ dùng trong `BOOKING_FROM_EMAIL`.
3. Khi thử nghiệm ban đầu, có thể dùng `onboarding@resend.dev`. Tuy nhiên địa chỉ này chỉ gửi được tới email chủ sở hữu tài khoản Resend.
4. Sao chép `.env.example` thành `.env.local` khi chạy local, rồi điền đầy đủ giá trị. Không commit file `.env.local`.

## 4. Cấu hình biến môi trường trên Vercel

Deploy repository như một Vercel project thông thường. Sau đó vào **Project Settings → Environment Variables** và thêm các biến sau cho môi trường Production (và Preview nếu cần):

| Biến | Giá trị cần điền |
| --- | --- |
| `SUPABASE_URL` | Project URL từ Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role key` từ Supabase — chỉ dùng phía server |
| `RESEND_API_KEY` | API key từ Resend |
| `BOOKING_NOTIFY_EMAIL` | `tdkhuee@gmail.com` |
| `BOOKING_FROM_EMAIL` | Email gửi đã xác minh, ví dụ `Galaxy Band Booking <booking@your-domain.com>` |

Sau khi thêm hoặc đổi biến môi trường, hãy redeploy dự án để Vercel áp dụng cấu hình mới.

## 5. Kiểm tra API trước khi dùng thật

Khi chạy `vercel dev` ở máy local và đã nạp biến môi trường, gửi một request thử:

```powershell
curl.exe -X POST http://localhost:3000/api/booking -H "Content-Type: application/json" -d "{\"fullName\":\"Nguyễn Văn A\",\"phone\":\"0901234567\",\"email\":\"\",\"showType\":\"Tiệc cưới\",\"eventDate\":\"2026-12-20\",\"note\":\"Cần band chơi 2 tiếng.\",\"sourcePage\":\"home\",\"honeypot\":\"\"}"
```

Kết quả thành công là:

```json
{ "success": true }
```

Sau đó kiểm tra một dòng booking mới trong Supabase và email thông báo tại `tdkhuee@gmail.com`.

Nên thử thêm các trường hợp lỗi: bỏ trống `fullName`, bỏ trống đồng thời số điện thoại và email, hoặc nhập email không đúng định dạng. Nếu `honeypot` có giá trị, API sẽ chủ động trả thành công nhưng không lưu dữ liệu — đây là cơ chế chống bot/spam.

## 6. Kết nối frontend

File `js/booking-submit.js` đã được thêm để gửi dữ liệu form tới `/api/booking`. File này đã được nhúng ở cuối thẻ `<body>` của `index.html` và `dich-vu.html`.

Các trường form hiện được gửi theo đúng cấu trúc API: họ tên, số điện thoại, email, loại show, ngày dự kiến, ghi chú, trang nguồn và honeypot chống spam.
