# PROMPT CHO ANTIGRAVITY — WEBSITE "GALAXY BAND" (v2 — chi tiết bố cục & giao diện)

## 0. Phạm vi công việc (ĐỌC KỸ TRƯỚC KHI LÀM)

**Đây là task THUẦN FRONT-END / UI.** Yêu cầu:
- Dựng đầy đủ giao diện tĩnh (static UI), pixel-perfect theo mô tả bên dưới, responsive đầy đủ desktop/tablet/mobile.
- Có thể dùng dữ liệu mock/placeholder (text, ảnh placeholder, số liệu giả) để lấp đầy layout — KHÔNG cần kết nối API thật, KHÔNG cần xử lý logic gửi form, KHÔNG cần authentication, KHÔNG cần CMS/database.
- Form (booking form) chỉ cần render đúng UI, có validate hiển thị (client-side, ví dụ required field, format email) nhưng KHÔNG cần submit thực sự đi đâu — có thể console.log hoặc alert giả lập khi bấm submit.
- Nút gọi/Zalo/Email/Book âm thanh: chỉ cần đúng UI + href giả (`tel:`, `https://zalo.me/...`, `mailto:`) là đủ, không cần tích hợp thật.
- Toàn bộ carousel, tab, accordion, toggle dark/light, toggle ngôn ngữ (chỉ cần đổi UI label VI/EN, không cần i18n thật) đều phải hoạt động được bằng JS/state ở mức UI (không cần backend).
- Ưu tiên số 1: **giao diện đúng bố cục, đúng khoảng cách, đúng tỉ lệ, đúng theme màu, đúng hành vi tương tác UI** như mô tả. Logic nghiệp vụ thật sẽ làm ở giai đoạn sau — không cần lo phần đó bây giờ.

---

## 1. Design System — Hệ thống thiết kế (bắt buộc dùng CSS variables / design tokens)

### 1.1 Breakpoints (dùng chuẩn này xuyên suốt)
| Tên | Min-width | Ghi chú |
|---|---|---|
| Mobile | 0 – 639px | 1 cột, menu hamburger |
| Tablet | 640 – 1023px | 2 cột cho grid 4, carousel vẫn giữ |
| Desktop | 1024 – 1439px | Layout chuẩn như mô tả |
| Wide | ≥ 1440px | Container max-width 1280px, căn giữa, lề 2 bên auto |

Container chính: `max-width: 1280px; margin: 0 auto; padding-inline: 24px` (mobile: `padding-inline: 16px`).

### 1.2 Bảng màu — CHẾ ĐỘ TỐI (Dark / Space mode) — **MẶC ĐỊNH khi vào web**
| Token | Giá trị | Dùng cho |
|---|---|---|
| `--bg-base` | `#0B0710` | Nền toàn trang |
| `--bg-elevated` | `#150E22` | Nền card, section nổi |
| `--bg-elevated-2` | `#1D1330` | Nền input, nền card hover |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Viền card, divider |
| `--border-glow` | `rgba(255,79,216,0.35)` | Viền glow khi hover/focus |
| `--primary` | `#7B2FF7` | Màu tím chính (nút, icon, link nhấn) |
| `--primary-dark` | `#4B1D8C` | Tím đậm (gradient stop, nền badge) |
| `--accent` | `#FF4FD8` | Hồng neon (badge, tag, glow, nút phụ) |
| `--accent-soft` | `rgba(255,79,216,0.15)` | Nền badge nhạt |
| `--gradient-primary` | `linear-gradient(135deg, #7B2FF7 0%, #FF4FD8 100%)` | Nút CTA chính, heading nhấn, progress |
| `--text-primary` | `#FFFFFF` | Heading, text chính |
| `--text-secondary` | `#B9AFD1` | Mô tả, caption |
| `--text-muted` | `#7A6F94` | Text phụ rất nhẹ (label nhỏ, ngày tháng) |
| `--nebula-blur-1` | radial-gradient tím `rgba(123,47,247,0.35)` → trong suốt | Blob trang trí góc trên |
| `--nebula-blur-2` | radial-gradient hồng `rgba(255,79,216,0.25)` → trong suốt | Blob trang trí góc dưới |
| `--star-dot` | `rgba(255,255,255,0.6)` | Chấm sao nhỏ rải nền |

### 1.3 Bảng màu — CHẾ ĐỘ SÁNG (Light mode) — kích hoạt khi bấm toggle
Không dùng nền trắng thuần trơ — vẫn giữ "chất galaxy" nhưng dịch sang tông ban ngày/pastel vũ trụ nhẹ nhàng hơn:
| Token | Giá trị | Dùng cho |
|---|---|---|
| `--bg-base` | `#F7F3FC` | Nền toàn trang (trắng ánh tím rất nhạt) |
| `--bg-elevated` | `#FFFFFF` | Nền card |
| `--bg-elevated-2` | `#EDE4F9` | Nền input, hover nhẹ |
| `--border-subtle` | `rgba(75,29,140,0.12)` | Viền card, divider |
| `--border-glow` | `rgba(255,79,216,0.4)` | Viền glow hover/focus |
| `--primary` | `#7B2FF7` | Giữ nguyên tím chính |
| `--primary-dark` | `#5A22B8` | Tím đậm hơn 1 chút để đủ tương phản trên nền sáng |
| `--accent` | `#E63FE0` | Hồng (giảm độ neon 1 chút để không chói trên nền sáng) |
| `--accent-soft` | `rgba(230,63,224,0.12)` | Nền badge nhạt |
| `--gradient-primary` | `linear-gradient(135deg, #7B2FF7 0%, #E63FE0 100%)` | Nút CTA chính |
| `--text-primary` | `#1A1027` | Heading, text chính (tím rất đậm gần đen) |
| `--text-secondary` | `#5A4E73` | Mô tả, caption |
| `--text-muted` | `#8B81A3` | Text phụ nhẹ |
| `--nebula-blur-1` | radial-gradient tím nhạt `rgba(123,47,247,0.12)` | Blob trang trí, mờ hơn nhiều so với dark mode |
| `--nebula-blur-2` | radial-gradient hồng nhạt `rgba(255,79,216,0.10)` | Blob trang trí |
| `--star-dot` | `rgba(123,47,247,0.25)` | Ở light mode, chấm "sao" đổi thành chấm tím rất nhạt li ti, không dùng trắng |

**Quy tắc chuyển đổi theme:**
- Toggle nằm ở header, icon mặt trời/mặt trăng (giống bản gốc), click đổi `data-theme="dark"` ↔ `data-theme="light"` trên thẻ `<html>` hoặc `<body>`, mọi màu đều lấy từ CSS variable nên tự đổi theo, có transition `background-color 0.3s ease, color 0.3s ease` để không bị giật cứng khi đổi theme.
- Ảnh hero, ảnh poster ca sĩ/nhạc công: ở dark mode overlay tối hơn (đen 45-55% opacity), ở light mode overlay nhạt hơn (đen 20-30% opacity) để chữ trắng trên ảnh vẫn đọc được nhưng ảnh không bị bí quá ở light mode.
- Watermark chữ "GALAXY" mờ phía sau hero: dark mode dùng trắng mờ 6-8% opacity; light mode dùng tím đậm mờ 6-8% opacity.
- Nebula blob (blur blob trang trí): dark mode để độ mờ/độ bão hoà cao hơn (rực rỡ trên nền tối); light mode giảm mạnh opacity (blob chỉ như vệt màu nước rất nhẹ) để không làm chói nền sáng.
- Mặc định site load ở **Dark mode** trước (đúng tinh thần "galaxy"), người dùng có thể chuyển sang Light mode bất cứ lúc nào, trạng thái lưu lại bằng localStorage (chỉ là hành vi UI, không phải backend).

### 1.4 Typography scale
| Tên | Size (desktop) | Size (mobile) | Weight | Dùng cho |
|---|---|---|---|---|
| Display (Hero H1) | 56px / line-height 1.08 | 34px / 1.15 | 700-800 | Heading hero |
| H2 (Section heading) | 40px / 1.15 | 28px / 1.2 | 700 | Heading từng section |
| H3 (Card title) | 22px / 1.3 | 18px / 1.3 | 600-700 | Tiêu đề card |
| Body large | 18px / 1.6 | 16px / 1.6 | 400 | Mô tả hero, mô tả section |
| Body | 15px / 1.6 | 14px / 1.6 | 400 | Mô tả card, paragraph thường |
| Caption/Label | 13px / 1.4, letter-spacing 0.02em | 12px | 500-600, có thể uppercase | Tag/badge, label form, ngày tháng |
| Font family gợi ý | Heading: một sans-serif đậm hiện đại kiểu "Space Grotesk", "Sora", hoặc "General Sans" | Body: "Inter" hoặc "Be Vietnam Pro" (hỗ trợ tiếng Việt dấu tốt) |

### 1.5 Spacing scale (dùng nhất quán, đơn vị px, base 4px)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`
- Khoảng cách giữa các section lớn (section-to-section): 96px desktop / 56px mobile (padding-top + padding-bottom mỗi section).
- Khoảng cách nội bộ trong 1 card: padding 24px desktop / 16px mobile.
- Gap giữa các item trong grid: 24px desktop / 16px mobile.

### 1.6 Bo góc (Radius scale)
- Nút (button): `9999px` (pill, bo tròn hoàn toàn)
- Card thường: `20px`
- Card lớn (hero, poster): `28px`
- Input: `14px`
- Badge/tag: `9999px` (pill nhỏ)
- Avatar tròn (carousel ca sĩ): `50%`

### 1.7 Shadow / Glow tokens
- `--shadow-card`: `0 8px 24px rgba(0,0,0,0.35)` (dark mode) / `0 8px 24px rgba(75,29,140,0.10)` (light mode)
- `--glow-primary`: `0 0 24px rgba(123,47,247,0.45)` — dùng cho hover nút chính, focus input, viền card nổi bật
- `--glow-accent`: `0 0 20px rgba(255,79,216,0.4)` — dùng cho badge/tag nổi bật, nút "Gọi" nổi

### 1.8 Animation/Transition chuẩn
- Hover card: `transform 0.25s ease, box-shadow 0.25s ease` (card scale nhẹ 1.02, tăng glow)
- Hover ảnh trong card: ảnh `transform: scale(1.05)` trong khung `overflow:hidden`, transition 0.35s ease
- Nút: `transition: all 0.2s ease`, hover tăng sáng nhẹ + `translateY(-1px)`
- Carousel chuyển slide: `transition: transform 0.4s cubic-bezier(0.4,0,0.2,1)`
- Accordion (FAQ) mở/đóng: `max-height` transition 0.3s ease, icon `+` xoay 45° thành `×` (hoặc chevron xoay 180°)
- Smooth scroll (anchor menu): `scroll-behavior: smooth`, offset trừ đúng chiều cao header (`scroll-margin-top: 88px` cho mỗi section neo)

---

## 2. Component chi tiết (Anatomy — mô tả từng phần tử để tránh hiểu lầm)

### 2.1 Header (Sticky/Fixed top, height cố định)
- Chiều cao: 80px desktop / 64px mobile. `position: sticky; top:0; z-index:50;` nền `--bg-base` với `backdrop-filter: blur(12px)` và độ mờ nhẹ (~90% opacity) để nội dung cuộn bên dưới hơi mờ qua.
- Bố cục 3 vùng flex: [Logo] --- [Menu giữa] --- [Actions phải]
- **Logo (trái):** icon hình tròn 32x32px (icon xoáy thiên hà/hành tinh, line-art, gradient tím-hồng) + text "Galaxy Band" font 18px weight 700, cách nhau 8px.
- **Menu (giữa, ẩn trên mobile → hamburger):** các item cách nhau 24-28px, font 15px weight 500, màu `--text-secondary`, hover đổi màu `--text-primary`.
  - Thứ tự: Vocal · Nhạc công · **Xem trình diễn** (dạng pill active: nền `--bg-elevated-2`, bo tròn pill, có chấm tròn nhỏ 6px màu `--accent` bên trái chữ, padding ngang 16px dọc 8px) · Lịch show · Dịch vụ (có icon chevron nhỏ mở dropdown) · Blog · Contact
  - Dropdown "Dịch vụ": mở ra panel nhỏ bo góc 12px, nền `--bg-elevated`, shadow, liệt kê 2-4 dòng link con (VD: Thuê ban nhạc Event, Acoustic Café, Tiệc cưới), mỗi dòng hover đổi nền `--bg-elevated-2`.
- **Actions (phải):** dropdown ngôn ngữ "VI" (icon chevron nhỏ) → icon toggle sáng/tối (hình mặt trời/mặt trăng, click đổi theme ngay lập tức) → nút "Book now" (pill, nền đen/tím rất đậm gần đen `#12081F`, chữ trắng, weight 600, padding 12px 24px).
- **Mobile:** ẩn menu giữa, hiện icon hamburger bên phải cạnh nút Book now (hoặc thay Book now bằng icon nhỏ hơn). Bấm hamburger mở full-screen overlay menu (nền `--bg-base` phủ kín, list dọc các mục, mỗi mục full-width, font 20px, có nút đóng (X) góc trên phải).

### 2.2 Nút bấm (Buttons) — 3 biến thể
1. **Primary (CTA chính):** nền `--gradient-primary`, chữ trắng weight 600, pill radius, padding 14px 28px, shadow nhẹ; hover: thêm `--glow-primary`, `translateY(-1px)`; active: scale 0.98.
2. **Secondary (outline):** nền trong suốt, viền 1.5px `--border-subtle` hoặc `--primary` mờ, chữ `--text-primary`, pill; hover: nền `--bg-elevated-2`, viền sáng lên thành `--primary`.
3. **Ghost/Link nhỏ:** không viền không nền, chữ `--text-secondary` gạch chân khi hover, dùng cho "Xem tất cả media", "Xem vocal media", "Book Âm thanh"...

### 2.3 Card cơ bản
- Nền `--bg-elevated`, border 1px `--border-subtle`, radius 20px, padding 20-24px, shadow `--shadow-card`.
- Ảnh trong card (nếu có): bo góc trên khớp với card (hoặc full-bleed 4 góc nếu ảnh chiếm toàn bộ), tỉ lệ ảnh chuẩn theo từng loại card (ghi rõ ở mục 3 theo từng section).
- Hover: viền chuyển sang `--border-glow`, shadow thêm `--glow-primary` cường độ thấp, card nổi nhẹ `translateY(-4px)`.

### 2.4 Badge/Tag nhỏ (mở đầu mỗi section, VD "SHOWREEL", "BOOKING")
- Pill nhỏ, nền `--accent-soft`, chữ `--accent` hoặc `--primary`, uppercase, font 12-13px weight 600, letter-spacing 0.04em, padding 6px 14px, có thể có chấm tròn nhỏ phía trước chữ.

### 2.5 Poster Card (dùng cho Vocal & Nhạc công — style "magazine cover")
- Tỉ lệ ảnh: 3:4 (dọc), radius 20-24px, ảnh full-bleed choán hết card.
- Overlay gradient tối dần từ dưới lên (để chữ đè lên ảnh đọc được): `linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)`.
- Text đè lên ảnh: tên (to, đậm, uppercase, font 28-36px với card lớn/ 20-24px với card nhỏ trong carousel), thông tin phụ nhỏ hơn bên trên/dưới tên (ngày sinh, số năm kinh nghiệm, thể loại) — với card lớn (vocal nổi bật) thông tin phụ này nằm **dọc theo cạnh trái** ảnh (text-orientation xoay 90° hoặc xếp từng dòng ngắn), giống bìa tạp chí.
- Góc dưới card: nút tròn nhỏ có icon play + chữ "Xem video", nền trắng/kính mờ (glassmorphism), khi hover scale nhẹ.
- Với card nhỏ trong carousel "Đội hình": thêm 1 badge nhỏ góc trên (VD "GUITARIST", "DRUMMER") nền tối bán trong suốt, và 1 dòng caption dưới card (ngoài ảnh, không đè lên ảnh) ghi rõ nhạc cụ cụ thể (VD "Acoustic/E-Guitar/Bass").

### 2.6 Carousel controls
- 2 nút mũi tên tròn (trái/phải), kích thước 40x40px, nền `--bg-elevated`, border `--border-subtle`, icon chevron `--text-primary`; đặt ở 2 mép ngoài của khu vực carousel (hoặc dưới heading section, canh phải, cạnh nhau, cách 8px) tuỳ layout — xem chi tiết vị trí ở từng section mục 3.
- Trên mobile: ẩn nút mũi tên, thay bằng scroll ngang chạm tay (`overflow-x: auto; scroll-snap-type: x mandatory;`), mỗi item `scroll-snap-align: start`.

### 2.7 Form Booking
- Layout 2 cột trên desktop (label trên, input dưới, 2 input/hàng), 1 cột trên mobile.
- Input: nền `--bg-elevated-2`, border 1px `--border-subtle`, radius 14px, padding 12px 16px, chữ `--text-primary`, placeholder `--text-muted`.
- Focus state: border đổi `--primary`, thêm `--glow-primary` nhẹ.
- Select (Loại show) và Date picker (Ngày dự kiến): style đồng bộ input text, icon chevron/calendar bên phải trong input.
- Textarea (Ghi chú nhanh): min-height 100px, resize dọc only.
- Text hướng dẫn nhỏ dưới field Email: `--text-muted`, font 13px (VD "Vui lòng nhập ít nhất Số điện thoại/Zalo hoặc Email.")
- Nút submit: full-width trên cột form, Primary button, chữ "Gửi yêu cầu booking".
- (Không cần submit thật — onSubmit chỉ preventDefault + hiển thị toast/alert giả "Đã gửi yêu cầu (demo)".)

### 2.8 Floating Action Buttons (Gọi / Zalo / Email / Book Âm thanh)
- Vị trí: xuất hiện lặp lại ở cuối mỗi trang ngay trong khu vực footer (hàng ngang, bên phải phần thông tin brand) — giống bản gốc, KHÔNG cần fixed đè lên nội dung khi cuộn (trừ khi bạn muốn thêm 1 phiên bản fixed rút gọn cho mobile, xem mục 2.9).
- 4 nút hình tròn/pill lớn (đường kính ~72-80px nếu tròn, hoặc pill dài nếu có chữ + icon), xếp ngang cách đều 12-16px:
  1. "Gọi" — nổi bật nhất, nền đen/tím rất đậm gần đen, chữ/icon trắng, có thể thêm `--glow-accent` nhẹ để thu hút mắt nhất.
  2. "Zalo" — nền trong suốt, viền `--border-subtle`, icon Zalo + chữ.
  3. "Email" — tương tự Zalo.
  4. "Book Âm thanh" — tương tự Zalo/Email, có thể rộng hơn 1 chút vì chữ dài hơn.

### 2.9 Mobile Floating Bar (bổ sung hợp lý cho UX mobile, không có trong ảnh gốc nhưng nên thêm)
- Trên mobile, thêm 1 thanh fixed đáy màn hình (`position: fixed; bottom:0;`) gồm 4 icon nhỏ tương ứng Gọi/Zalo/Email/Book Âm thanh, nền `--bg-elevated` + blur, để người dùng luôn bấm được nhanh mà không cần cuộn xuống footer. (Đây là gợi ý UX hợp lý, có thể bỏ nếu muốn giữ tối giản đúng bản gốc.)

---

## 3. CHI TIẾT BỐ CỤC TỪNG TRANG (grid, tỉ lệ, thứ tự — làm đúng để tránh hiểu lầm)

> Lưu ý áp dụng chung: mỗi "Section" là 1 block full-width có `padding-block: 96px` (desktop) `56px` (mobile), bên trong là 1 `container` giới hạn `max-width:1280px`. Trước mỗi section (trừ hero) thường có 1 badge nhỏ (mục 2.4) rồi đến heading H2, có thể kèm link/nút ở góc phải cùng hàng với heading (dùng flex `justify-content: space-between; align-items: flex-end;`).

### 3.1 TRANG CHỦ = "Xem trình diễn"

**A. Hero Section**
- 1 card lớn full-width trong container, tỉ lệ chiều cao ~ `min-height: 640px` desktop / `480px` mobile, radius 28px, ảnh nền cover + overlay gradient tối chéo góc (đậm hơn ở góc trái nơi có chữ, nhạt dần sang phải).
- Padding trong card: 56px desktop / 24px mobile.
- Bố cục nội dung: căn trái, chiếm tối đa 55% chiều rộng card trên desktop (để phần ảnh bên phải — vd cận cảnh đàn guitar/ánh sáng — vẫn lộ ra), full-width trên mobile.
- Thứ tự dọc: Badge → H1 (5 dòng, mỗi dòng có thể xuống dòng thủ công để kiểm soát ngắt câu như bản gốc) → đoạn mô tả (max-width ~460px) → hàng 2 nút (Primary + Secondary, cách nhau 12px) → link "Book Âm thanh" nhỏ bên dưới (8px cách nút) → hàng social icon (4 icon, cách nhau 16px, size 18px, màu `--text-secondary`, hover `--text-primary`) → cách ra rồi tới nút tròn "Live sample" (pill, icon play tròn nhỏ bên trong nền trắng/kính mờ + chữ "Live sample" bên cạnh, đặt lệch trái dưới cùng, hơi tách khỏi khối text phía trên bằng margin-top ~24px).
- Watermark "GALAXY" chữ khổng lồ (font-size ~180-220px desktop) nằm phía sau, canh giữa-phải card, bị ảnh/overlay che bớt, opacity thấp (mô tả ở mục 1.3).

**B. Section "Galaxy Band diễn ở đâu?"**
- Header row: Badge "SHOWREEL" bên trái phía trên heading; H2 "Galaxy Band diễn ở đâu?" bên trái; link "Xem tất cả media →" bên phải cùng hàng baseline với H2.
- Grid 4 cột đều nhau (desktop), gap 20px. Mỗi card: ảnh nền chiếm khoảng 60% chiều cao card (tỉ lệ ảnh trong card ~ 4:3), phần dưới ảnh (hoặc overlay dưới đáy ảnh) là nền `--bg-elevated` chứa: tiêu đề H3 (2 dòng) + mô tả Body nhỏ (2 dòng, có thể `line-clamp:2`). Toàn bộ card có thể là 1 khối ảnh full-bleed với overlay gradient dưới đáy chứa chữ (giống ảnh mẫu) — chọn cách này để giữ đúng phong cách ảnh gốc.
- Responsive: tablet 2 cột x 2 hàng; mobile carousel ngang scroll-snap 1.1 card/viewport (hé lộ mép card kế tiếp ~10% để gợi ý có thể vuốt).
- Ngay dưới grid, cách 48px: 3 cột đều nhau (desktop) / xếp dọc (mobile), mỗi cột: label nhỏ đậm (VD "Gu nhạc") + nội dung text thường bên dưới, cột 1 dài nhất (danh sách thể loại nối bằng dấu `·`), cột 2-3 ngắn hơn (1-2 câu).

**C. Section khách hàng**
- Text nhỏ căn giữa "Các khách hàng của Galaxy Band" phía trên.
- Dải logo: flex-wrap căn giữa hoặc marquee auto-scroll ngang vô hạn (duplicate list để loop mượt), mỗi logo trong khung vuông/chữ nhật bo góc nhỏ nền `--bg-elevated`, logo desaturate/opacity 70-80%, hover full màu + opacity 100%.

**D. Section Vocal Showcase (neo "Vocal")**
- `id="vocal"`, `scroll-margin-top: 88px`.
- Header row: Badge "VOCAL SHOWCASE" + H2 "Đa dạng vocal cho nhiều format và thể loại nhạc" (H2 có thể xuống 3 dòng, max-width ~640px) bên trái; link "Xem vocal media →" bên phải, canh cùng hàng với dòng đầu H2 (top-align, không phải bottom-align như section trước — vì heading ở đây dài 3 dòng).
- Bên dưới, cách 40px: grid 2 cột không đều — cột trái rộng ~42%, cột phải rộng ~58% (hoặc ngược lại tuỳ ảnh, theo ảnh mẫu cột ảnh poster hẹp hơn cột info) — thực tế theo ảnh: cột trái (poster) và cột phải (info) gần tương đương, khoảng 45/55. Gap giữa 2 cột 24px.
  - **Cột trái (poster):** card poster lớn tỉ lệ ảnh ~3:4, có 2 nút mũi tên tròn nhỏ đặt chồng lên mép trái/phải ảnh, canh giữa theo chiều dọc ảnh (giữa mép, không phải đáy). Nút play "Xem video" pill nhỏ góc dưới-trái ảnh.
  - **Cột phải (info panel):** nền `--bg-elevated`, radius 20px, padding 24px, chứa: badge nhỏ "Xem vocal" trên cùng; sau đó 3 khối info dạng "label nhỏ mờ ở trên - value đậm ở dưới", mỗi khối cách nhau bằng divider mảnh `--border-subtle` (label: "Show/format hợp", "Mood/vibe", "Thể loại/gu hát"); cuối panel là 2 thumbnail video nhỏ xếp ngang cạnh nhau (tỉ lệ 16:9 hoặc 4:3, mỗi thumbnail có icon play tròn giữa ảnh + caption tên bài hát bên dưới ảnh, font nhỏ).
- Cách 32px bên dưới toàn khối: hàng carousel avatar ca sĩ — avatar tròn 56-64px + tên bên cạnh (không phải bên dưới) trong 1 pill nền `--bg-elevated` bo tròn hoàn toàn ôm sát avatar+tên, item đang active có viền `--primary` sáng hơn các item khác (item khác mờ hơn, opacity ~70%). 2 nút mũi tên nhỏ ở 2 đầu hàng carousel (hoặc 1 cặp nút gộp bên phải).

**E. Section "Đội hình" (neo "Nhạc công")**
- `id="nhac-cong"`, `scroll-margin-top: 88px`.
- Header row: Badge "ĐỘI HÌNH" + H2 "Chắc tay, kinh nghiệm" bên trái + đoạn text nhỏ phụ "Vuốt hoặc bấm để xem từng vị trí rõ hơn" ngay dưới H2 (không phải link, chỉ là caption `--text-secondary`) — link/nút điều hướng carousel (2 mũi tên tròn) đặt bên phải cùng hàng với H2.
- Carousel ngang 4 card hiển thị cùng lúc trên desktop (không cuộn hết màn hình, chỉ hiển thị đúng 4, có thể kéo xem thêm nếu >4 người), mỗi poster card (mục 2.5, card nhỏ), gap 20px. Trên tablet hiện 2-3 card, mobile hiện 1.2 card scroll-snap.

**F. Section Booking Form (neo "Contact")**
- `id="contact"`, `scroll-margin-top: 88px`.
- Toàn section có thể có nền hơi khác 1 chút (VD `--bg-elevated` phủ nhẹ full-width thay vì `--bg-base`) để tách biệt thị giác trước khi vào footer, kèm 1-2 nebula blob mờ ở góc.
- Grid 2 cột ~ 40/60 (trái hẹp hơn), gap 40px, đảo ngược thành 1 cột (nội dung trước, form sau) trên mobile.
  - **Cột trái:** Badge "BOOKING" → H2 lớn (có thể 5-6 dòng ngắn, font Display nhỏ hơn hero 1 chút, ~36px) "Để lại thông tin để Galaxy Band tư vấn và báo giá phù hợp nhé!" → đoạn mô tả ngắn `--text-secondary` → hàng 4 link nhanh ngang (Gọi, Zalo, Email, Book Âm thanh — dạng chữ gạch chân hoặc icon nhỏ + chữ, không cần to như floating buttons ở footer).
  - **Cột phải:** Card form (mục 2.7), nền `--bg-elevated`, radius 20-24px, padding 32px.

**G. Footer**
- `padding-block: 48px`, border-top 1px `--border-subtle`, nền `--bg-base`.
- Bố cục: trái là logo+tagline (max-width ~360px), khoảng giữa/phải là hàng social links, ngoài cùng phải là cụm 4 floating action buttons (mục 2.8). Trên mobile: xếp dọc, brand trước, social giữa, 4 nút actions cuối cùng full-width mỗi nút hoặc 2x2 grid.

---

### 3.2 TRANG "Lịch show"
- Không có hero ảnh lớn — chỉ có: Badge "LỊCH SHOW" → H1 "Lịch diễn Galaxy Band" (size H2 lớn, ~40px) → subtext `--text-secondary` 1 dòng.
- Cách 40px: list dọc các card lịch, mỗi card full-width, `padding: 20px 24px`, nền `--bg-elevated`, radius 16px, margin-bottom 12px giữa các card.
- Bố cục ngang trong mỗi card (flex, 3 vùng): 
  1. Trái: "Thứ" (VD "Chủ Nhật") — font đậm 20px, width cố định ~120px để các card thẳng hàng.
  2. Giữa (flex:1): tên show (H3 18-20px đậm) → dòng địa điểm (`--text-secondary`) → dòng giờ diễn (`--text-muted`, nhỏ hơn).
  3. Phải: nút "Map" (Secondary button nhỏ, chỉ padding 8px 20px).
- Divider mảnh giữa cột trái và cột giữa có thể thêm (border-left 1px `--border-subtle`, padding-left 20px cho cột giữa) để phân tách rõ như bản gốc.
- Mobile: cột "Thứ" chuyển lên trên cùng dạng badge nhỏ thay vì cột trái cố định, "Map" chuyển xuống full-width bên dưới hoặc icon nhỏ góc phải trên.
- Footer giống trang chủ.

---

### 3.3 TRANG "Dịch vụ" (con: "Thuê ban nhạc Event, Sự kiện tại TP.HCM")

**A. Hero riêng (nhỏ hơn hero trang chủ)**
- Card nền tối (ảnh sự kiện: ánh sáng sân khấu, đám đông mờ phía sau) tỉ lệ chiều cao thấp hơn hero trang chủ (~420px desktop).
- Nội dung căn trái: H1 (36-40px) "Cho thuê ban nhạc Event, Sự kiện tại TP.HCM" → mô tả ngắn → 2 nút (Primary "Nhận báo giá" + Secondary "Xem video").
- Ngay dưới hero card, cách 32px: dải logo khách hàng nhỏ (component giống mục 3.1.C nhưng thu gọn chiều cao).

**B. Section "Mỗi sự kiện cần một đội hình band khác nhau."**
- H2 căn trái, không cần badge nếu muốn gọn (tuỳ chọn thêm badge "LOẠI SỰ KIỆN").
- Grid 2x2 (desktop 2 cột 2 hàng, đúng như ảnh — KHÔNG phải 4 cột 1 hàng), gap 20px. Mỗi card: ảnh bên trái (tỉ lệ vuông ~1:1, width cố định ~40% card) + nội dung bên phải (tiêu đề H3 + mô tả 2 dòng + link nhỏ "Xem show mẫu →" cuối cùng), layout ngang trong từng card (flex row), height card đều nhau.
- Mobile: ảnh lên trên, nội dung xuống dưới (đổi flex-direction column), xếp 1 cột.

**C. Section "Chọn đội hình theo sân khấu, số khách và mức năng lượng."**
- Grid 3 cột đều (desktop), gap 20px. Mỗi card: ảnh trên (tỉ lệ 4:3) + tiêu đề H3 bên dưới + badge nhỏ góc trên ảnh hoặc dưới tiêu đề ghi số người (VD "4-5 người · Tham khảo").
- Ngay dưới, cách 40px: 1 video thumbnail lớn full-width (tỉ lệ 16:9), icon play lớn giữa, caption tên video dưới góc trái ảnh dạng overlay.

**D. Section bảng giá "Bảng giá tham khảo cho Gala Dinner"**
- H2 căn trái. Bên dưới: 2 bảng (table) đặt cạnh nhau (desktop, mỗi bảng 50% width, gap 24px) / xếp dọc (mobile).
- Mỗi bảng: tiêu đề bảng (H3, phía trên table) → table với header row nền `--bg-elevated-2` (Số người | Nhạc cụ tiêu biểu | Đơn giá tham khảo), các dòng dữ liệu cách dòng bằng border-bottom mảnh `--border-subtle`, hover dòng đổi nền nhẹ. Dưới table: 1 dòng ghi chú nhỏ `--text-muted`.

**E. Section "Xem media Event của Galaxy Band"**
- Header row: H2 trái + link "Xem tất cả media →" phải.
- Grid 3 cột x 2 hàng (6 ảnh/video), gap 16px, tỉ lệ ảnh 4:3 hoặc 1:1 đồng nhất, mỗi ảnh có badge nhỏ góc trên (loại event) và có thể icon play nếu là video.

**F. Section quy trình 4 mốc chương trình**
- H2 + mô tả ngắn phía trên.
- 4 cột ngang đều nhau (desktop) mỗi cột: icon tròn nhỏ trên cùng (số thứ tự 1-4 hoặc icon minh hoạ) → tên mốc (H3 nhỏ) → mô tả ngắn. Có thể nối 4 cột bằng 1 đường line ngang mảnh chạy qua giữa các icon (timeline style). Mobile: xếp dọc, line dọc bên trái nối các icon.

**G. Section "Chi phí thuê ban nhạc Event tại TP.HCM"**
- H2 + đoạn mô tả ngắn → list bullet 2-3 dòng giá tham khảo theo số người (mỗi dòng: label trái, giá phải, dùng flex justify-content space-between, border-bottom mảnh ngăn cách) → nút Primary "Nhận báo giá đủ 3 mức giá" full-width hoặc căn trái tuỳ, cách list 24px.

**H. Section "Một brief rõ giúp band và ekip chạy chương trình mượt mà hơn."**
- H2 + mô tả ngắn → grid 2 cột (desktop) / 1 cột (mobile): cột "Gửi brief" (icon nhỏ + tiêu đề + list bullet có icon check) và cột "Nhận phương án" (tương tự) → nút "Nhận Brief mẫu" bên dưới, căn giữa hoặc căn trái toàn section.

**I. Section "Thuê ban nhạc sự kiện nên lưu ý những gì?"**
- Grid 2 cột không đều (~55/45): trái là đoạn văn bản dài hơn (paragraph thường), phải là 1 card nền `--bg-elevated` chứa tiêu đề nhỏ "Gửi 6 thông tin này để nhận báo giá sát nhất" + checklist 6 dòng (icon check nhỏ đầu dòng + text).

**J. Video thumbnail lớn thứ 2** (giống mục C phần dưới, full-width, tỉ lệ 16:9)

**K. FAQ Section**
- H2 "Những câu hỏi thường gặp khi thuê ban nhạc Event, YEP và tiệc công ty."
- Accordion list dọc, mỗi item: hàng ngang flex (câu hỏi trái, icon +/chevron phải), toàn hàng có thể bấm (cursor pointer), nền `--bg-elevated` bo góc 14px, khi mở: expand xuống dưới hiện đoạn trả lời (padding-top 12px, `--text-secondary`), border-bottom mảnh phân cách các câu hỏi nếu không dùng card riêng biệt từng câu.

**L. Booking Form + Footer** (dùng lại y hệt component mục 3.1.F và 3.1.G)

---

### 3.4 TRANG "Blog"
- Badge "BLOG" → H1 "Bài viết về show, setlist và kinh nghiệm book band." (size lớn giống H1 trang Lịch show, có thể xuống 3 dòng).
- Cách 40px: Grid 3 cột x 3 hàng (9 bài/trang), gap 24px. Responsive: tablet 2 cột, mobile 1 cột.
- Mỗi card bài viết:
  - Ảnh thumbnail tỉ lệ 4:3, có overlay gradient tối dưới đáy chứa: badge nhỏ "GALAXY BAND BLOG" (góc trên ảnh, riêng biệt không đè vào overlay dưới) + tiêu đề bài viết đè lên phần overlay dưới đáy ảnh (chữ trắng đậm, tối đa 2 dòng, `line-clamp:2`).
  - Dưới ảnh (ngoài ảnh): ngày đăng (`--text-muted`, nhỏ) → tiêu đề bài viết lặp lại rõ hơn dạng H3 đậm (không đè lên ảnh, để đọc dễ hơn — giữ đúng như bản gốc có cả tiêu đề đè ảnh và tiêu đề dạng text bên dưới) → đoạn trích ngắn 3 dòng `line-clamp:3` kết thúc bằng "[...]".
  - Toàn card hover: ảnh scale nhẹ, tiêu đề dưới đổi màu sang `--primary`.
- Pagination: căn trái ngay dưới grid, cách 40px, các số trang dạng hình tròn nhỏ (36x36px), trang hiện tại nền `--gradient-primary` chữ trắng, các trang khác nền trong suốt viền `--border-subtle`; dấu "..." ở giữa nếu nhiều trang; nút "Trang sau →" dạng pill riêng biệt bên phải cùng hàng.
- Footer giống trang chủ.

---

## 4. NỘI DUNG THẬT (Content) — dùng thay cho placeholder

> Đây là dữ liệu thật của Galaxy Band, dùng để đổ vào đúng các vị trí đã mô tả ở mục 3 (Section Vocal Showcase và Section "Đội hình" ở trang chủ). Không bịa thêm thành viên khác ngoài danh sách này.

**Giới thiệu chung (dùng cho câu mô tả ngắn ở footer / meta description nếu cần):**
> Tất cả thành viên Galaxy Band đều được đào tạo bài bản, chuyên nghiệp qua trường lớp, tốt nghiệp hoặc đang theo học tại các trung tâm/đại học nghệ thuật, nhạc viện; dày dạn kinh nghiệm biểu diễn acoustic, show sự kiện và concert.

### 4.1 Vocalist — đổ vào Section "Vocal Showcase" (3 avatar carousel + poster lớn khi được chọn)

**1. Ngọc Giàu**
- Vai trò: Vocalist nữ
- Chất giọng: Khỏe, trẻ trung, sôi động
- Sở trường: Hát tốt cả Rock và Ballad
- Gợi ý field "Thể loại/gu hát" khi poster này active: `Rock · Ballad · Pop`
- Gợi ý field "Mood/vibe": `Sôi động, trẻ trung, năng lượng, mạnh mẽ`
- Gợi ý field "Show/format hợp": `Live band sân khấu lớn, Rock night, Ballad đêm nhạc, Acoustic mạnh`

**2. Louis Nguyễn**
- Vai trò: Vocalist nam
- Chất giọng: Cuốn hút, cá tính
- Sở trường: Hát tốt Indie và Pop
- Gợi ý field "Thể loại/gu hát": `Indie Việt · Pop · Indie Pop`
- Gợi ý field "Mood/vibe": `Cá tính, cuốn hút, chill, có chiều sâu`
- Gợi ý field "Show/format hợp": `Acoustic café, Indie night, Dinner set nhẹ nhàng`

**3. Trang Halley**
- Vai trò: Vocalist nữ
- Chất giọng: Quyến rũ, lả lơi
- Sở trường: Hát tốt US/UK, nhạc điện tử, Remix sôi động
- Gợi ý field "Thể loại/gu hát": `US/UK Hits · Electronic · Remix/EDM`
- Gợi ý field "Mood/vibe": `Quyến rũ, sôi động, gợi cảm, bùng nổ`
- Gợi ý field "Show/format hợp": `Bar/Club night, Event sôi động, Remix set, After party`

**Cấu trúc dữ liệu mẫu (gợi ý dùng làm mock data JSON trong code, đặt tên biến `vocalists`):**
```json
[
  {
    "name": "Ngọc Giàu",
    "role": "Vocalist",
    "gender": "female",
    "voiceStyle": "Khỏe, trẻ trung, sôi động",
    "genres": ["Rock", "Ballad", "Pop"],
    "mood": ["Sôi động", "Trẻ trung", "Năng lượng", "Mạnh mẽ"],
    "showFormat": ["Live band sân khấu lớn", "Rock night", "Ballad đêm nhạc", "Acoustic mạnh"]
  },
  {
    "name": "Louis Nguyễn",
    "role": "Vocalist",
    "gender": "male",
    "voiceStyle": "Cuốn hút, cá tính",
    "genres": ["Indie Việt", "Pop", "Indie Pop"],
    "mood": ["Cá tính", "Cuốn hút", "Chill", "Có chiều sâu"],
    "showFormat": ["Acoustic café", "Indie night", "Dinner set nhẹ nhàng"]
  },
  {
    "name": "Trang Halley",
    "role": "Vocalist",
    "gender": "female",
    "voiceStyle": "Quyến rũ, lả lơi",
    "genres": ["US/UK Hits", "Electronic", "Remix/EDM"],
    "mood": ["Quyến rũ", "Sôi động", "Gợi cảm", "Bùng nổ"],
    "showFormat": ["Bar/Club night", "Event sôi động", "Remix set", "After party"]
  }
]
```

### 4.2 Nhạc công — đổ vào Section "Đội hình" (poster card carousel, mỗi card có badge nhạc cụ + caption)

**1. Trần Khuê — Drummer**
- Badge nhạc cụ trên card: `DRUMMER`
- Caption dưới card: `Drums / Percussion`
- Mô tả vai trò (dùng nếu poster có mô tả dài hơn hoặc trang chi tiết sau này): Người giữ nhịp cho cả band, có khả năng chuyển sắc thái bài hát từ buồn bã sang sôi động, điều phối "lửa" xuyên suốt các bài hát.

**2. Nhật Hào — Guitarist**
- Badge nhạc cụ trên card: `GUITARIST`
- Caption dưới card: `Acoustic/Electric Guitar`
- Mô tả vai trò: Khả năng cảm nhạc cực tốt, làm chủ nhạc cụ, phô diễn kỹ thuật xuất sắc trong bài hát, dễ dàng tôn giọng hát của các vocalist lên cao.

**3. Hùng Trọng — Bassist**
- Badge nhạc cụ trên card: `BASSIST`
- Caption dưới card: `Bass Guitar`
- Mô tả vai trò: Người kết nối các nhạc cụ và vocalist lại với nhau, kiểm soát âm tần trầm, tạo độ vang và lắng đọng trong bài nhạc.

**4. Tuấn Duy — Keyboardist/Pianist**
- Badge nhạc cụ trên card: `KEYBOARDIST`
- Caption dưới card: `Keyboard / Piano`
- Mô tả vai trò: Người ấn định màu sắc của bản nhạc, góp phần cho bài hát thêm có hồn, mang đậm tính nghệ thuật.

**Cấu trúc dữ liệu mẫu (mock data JSON, đặt tên biến `musicians`):**
```json
[
  {
    "name": "Trần Khuê",
    "instrumentBadge": "DRUMMER",
    "caption": "Drums / Percussion",
    "description": "Người giữ nhịp cho cả band, có khả năng chuyển sắc thái bài hát từ buồn bã sang sôi động, điều phối lửa xuyên suốt các bài hát."
  },
  {
    "name": "Nhật Hào",
    "instrumentBadge": "GUITARIST",
    "caption": "Acoustic/Electric Guitar",
    "description": "Khả năng cảm nhạc cực tốt, làm chủ nhạc cụ, phô diễn kỹ thuật xuất sắc, dễ dàng tôn giọng hát của các vocalist lên cao."
  },
  {
    "name": "Hùng Trọng",
    "instrumentBadge": "BASSIST",
    "caption": "Bass Guitar",
    "description": "Người kết nối các nhạc cụ và vocalist lại với nhau, kiểm soát âm tần trầm, tạo độ vang và lắng đọng trong bài nhạc."
  },
  {
    "name": "Tuấn Duy",
    "instrumentBadge": "KEYBOARDIST",
    "caption": "Keyboard / Piano",
    "description": "Người ấn định màu sắc của bản nhạc, góp phần cho bài hát thêm có hồn, mang đậm tính nghệ thuật."
  }
]
```

### 4.3 Ghi chú khi đổ nội dung vào layout
- Section "Vocal Showcase" (mục 3.1.D): carousel avatar dưới cùng hiển thị đúng 3 người theo thứ tự Ngọc Giàu → Louis Nguyễn → Trang Halley (thứ tự có thể tự do sắp lại nếu muốn nhấn giọng nữ trước). Khi bấm 1 avatar, poster lớn bên trên + info panel bên phải phải đổi đúng theo dữ liệu của người đó (genres/mood/showFormat).
- Section "Đội hình" (mục 3.1.E): carousel hiển thị đúng 4 người theo thứ tự Trần Khuê (Drummer) → Nhật Hào (Guitarist) → Hùng Trọng (Bassist) → Tuấn Duy (Keyboardist) — đây cũng là thứ tự hợp lý theo vai trò "giữ nhịp → dẫn dắt giai điệu → kết nối/nền trầm → định hình màu sắc".
- Vì band chỉ có 7 người cố định (3 vocalist + 4 nhạc công), **không cần thiết kế carousel dạng "xem thêm nhiều trang"** — hiển thị đủ toàn bộ member trong 1 vòng carousel là đủ, nút mũi tên trái/phải chỉ để lặp vòng (loop) qua lại giữa các thành viên.
- Ảnh đại diện từng thành viên: hiện chưa có ảnh thật → dùng ảnh placeholder tỉ lệ đúng theo mục 2.5 (3:4), có thể để avatar dạng khối màu gradient tím-hồng kèm chữ cái đầu tên (VD "NG" cho Ngọc Giàu) làm placeholder tạm, dễ thay ảnh thật sau.
- Câu mô tả vai trò dài (phần "Mô tả vai trò" ở mục 4.2) có thể dùng làm tooltip/nội dung mở rộng khi hover hoặc khi có trang chi tiết thành viên sau này — hiện tại ở bản UI-only chỉ cần cố định caption ngắn (badge + instrument) là đủ theo đúng bố cục bản gốc.

---

## 6. TƯƠNG THÍCH ĐA THIẾT BỊ (BẮT BUỘC) — Mobile (Android/iOS) + PC/Laptop

> Đây là yêu cầu **cực kỳ quan trọng, không được bỏ qua**: website phải chạy mượt, hiển thị đúng và thao tác được thoải mái trên **cả di động (Android, iOS/Safari) lẫn máy tính (Windows/macOS, các trình duyệt Chrome/Edge/Firefox/Safari)**. Không chỉ resize layout theo breakpoint (đã nêu ở mục 1.1) mà còn phải xử lý đúng các đặc thù riêng của từng nền tảng như bên dưới.

### 6.1 Thiết lập nền tảng bắt buộc
- Thẻ viewport chuẩn trong `<head>`: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` — bắt buộc có `viewport-fit=cover` để hỗ trợ các thiết bị iOS có tai thỏ/Dynamic Island/thanh home indicator.
- Dùng đơn vị `100dvh` (dynamic viewport height) thay vì `100vh` cho các khối full-height (VD hero section, overlay menu mobile) — vì `100vh` trên Safari iOS bị tính sai do thanh địa chỉ ẩn/hiện co giãn.
- Áp dụng `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)` cho các phần tử fixed/sticky (header, thanh floating action bar mobile ở mục 2.9) để không bị tai thỏ/thanh home indicator che mất nội dung hoặc nút bấm.
- `box-sizing: border-box` toàn cục, `overflow-x: hidden` ở `html, body` để chặn triệt để hiện tượng tràn ngang (một lỗi rất hay gặp khi có phần tử width cố định px trên mobile).
- Font size gốc tối thiểu 16px cho input/textarea (đặc biệt trên iOS Safari): nếu input nhỏ hơn 16px, Safari sẽ tự động zoom vào khi người dùng bấm vào ô nhập liệu — gây trải nghiệm giật, xấu. Giữ đúng font input ≥16px để tránh auto-zoom.

### 6.2 Vùng chạm (Touch target) & thao tác cảm ứng
- Mọi phần tử có thể bấm (nút, link, icon, tab menu, carousel arrow, avatar carousel item, accordion header, dropdown item...) phải có vùng chạm tối thiểu **44x44px** (chuẩn Apple HIG) hoặc **48x48px** (chuẩn Material Design Android) — kể cả khi icon hiển thị nhỏ hơn, vẫn phải padding thêm để đủ vùng chạm, tránh bấm nhầm.
- Khoảng cách tối thiểu giữa 2 phần tử có thể bấm liền kề: ≥ 8px, để ngón tay không bấm nhầm sang nút bên cạnh (đặc biệt ở hàng social icon, hàng floating action buttons, các nút mũi tên carousel).
- Loại bỏ hover-only interaction trên mobile: bất kỳ hiệu ứng/nội dung nào chỉ hiện khi `:hover` trên desktop (VD overlay thông tin chỉ hiện khi hover ảnh) đều phải có cách tương đương để xem được trên cảm ứng (tap để hiện, hoặc hiển thị sẵn luôn trên mobile mà không cần hover).
- Carousel/slider: dùng `touch-action: pan-y` cho container cuộn ngang để không xung đột với cuộn dọc trang; bật `scroll-snap-type: x mandatory` + `-webkit-overflow-scrolling: touch` để cuộn mượt kiểu native trên iOS Safari.
- Không dùng sự kiện chỉ có trên desktop làm điều kiện bắt buộc để thao tác (VD right-click, double-click, hover để lộ nút) — mọi chức năng chính phải thao tác được bằng 1 lần tap.
- Input dạng date (Ngày dự kiến): trên mobile nên tận dụng input native `type="date"` để hệ điều hành tự hiện lịch chọn ngày quen thuộc (giao diện lịch xoay bánh xe trên iOS, calendar picker trên Android) thay vì tự vẽ lịch custom phức tạp — vừa nhẹ vừa quen thuộc với người dùng.

### 6.3 Thanh trình duyệt & thanh điều hướng hệ điều hành
- Header sticky/fixed: kiểm tra kỹ trên Safari iOS khi thanh địa chỉ ẩn/hiện lúc cuộn — header không được bị "nhảy" giật hoặc đè sai vị trí; test bằng `position: sticky` (ưu tiên hơn `fixed` khi có thể) để trình duyệt tự xử lý tốt hơn.
- Floating action bar mobile (mục 2.9) và các nút fixed đáy màn hình: phải chừa khoảng trống bên dưới bằng `env(safe-area-inset-bottom)` để không bị thanh gesture-nav của Android hoặc home indicator của iPhone (các dòng không có nút Home vật lý) che mất/khó bấm.
- Trên Android, một số trình duyệt (Chrome) có thanh toolbar co giãn tương tự — áp dụng cùng nguyên tắc `100dvh` như mục 6.1.

### 6.4 Hiệu năng & hình ảnh (đặc biệt quan trọng cho mobile 4G/3G)
- Dùng thẻ `<picture>` hoặc thuộc tính `srcset`/`sizes` để phục vụ ảnh độ phân giải phù hợp theo kích thước màn hình (ảnh hero/poster không cần load bản full HD trên màn hình 375px).
- Tất cả ảnh (trừ ảnh trong khung nhìn đầu tiên/above-the-fold) dùng `loading="lazy"`.
- Định dạng ảnh ưu tiên: WebP/AVIF (có fallback JPEG/PNG nếu cần) để giảm dung lượng, tải nhanh hơn trên mạng di động.
- Giảm/tắt bớt hiệu ứng nặng (nebula blob blur lớn, particle sao động, backdrop-filter blur) ở mobile nếu phát hiện thiết bị yếu hoặc dùng `prefers-reduced-motion` để tắt animation cho người dùng có bật chế độ giảm chuyển động trong hệ điều hành (cả iOS lẫn Android đều có setting này) — vừa tôn trọng accessibility vừa đỡ giật lag.
- Video demo/thumbnail (Live sample, video event...): không autoplay có tiếng trên mobile (các trình duyệt mobile chặn autoplay có âm thanh); nếu autoplay chỉ nên autoplay muted + loop dạng preview ngắn, có nút bấm để phát đầy đủ có tiếng.

### 6.5 Test ma trận thiết bị/trình duyệt tối thiểu (checklist bắt buộc trước khi bàn giao)
| Thiết bị/Trình duyệt | Cần kiểm tra |
|---|---|
| iPhone (Safari iOS) — mọi kích thước từ SE (màn nhỏ) đến Pro Max | Header sticky, safe-area, input không bị auto-zoom, scroll mượt, dvh hoạt động đúng |
| Android phone (Chrome Android) — mẫu màn hình phổ thông ~360-412px width | Touch target đủ lớn, floating bar không bị thanh gesture-nav che, carousel vuốt mượt |
| Tablet (iPad Safari, Android tablet) | Layout 2 cột đúng breakpoint tablet, không bị vỡ grid, header không quá chật |
| Desktop Chrome/Edge (Windows) | Hover state hoạt động đúng, layout wide ≥1440px căn giữa đúng, dropdown "Dịch vụ" mở đúng vị trí |
| macOS Safari + Chrome | Font rendering, gradient/glow hiển thị đúng, không bị lỗi `backdrop-filter` |
| Xoay ngang (landscape) trên mobile | Header/hero không bị vỡ khi chiều cao màn hình rất thấp, nội dung vẫn cuộn được bình thường |

### 6.6 Ghi chú riêng cho iOS vs Android (khác biệt hay bị bỏ sót)
- **iOS Safari:** cẩn thận `position: fixed` kết hợp bàn phím ảo khi focus vào input trong form booking (có thể làm layout bị đẩy lệch) — nên test kỹ phần form khi bàn phím hiện lên, đảm bảo nút submit vẫn kéo lên được, không bị bàn phím che khuất vĩnh viễn. Bo góc lớn + shadow cần kiểm tra không bị vỡ pixel ở màn hình Retina.
- **Android Chrome:** kiểm tra `backdrop-filter: blur()` (dùng cho header, floating bar) có fallback nền đặc màu (VD `background-color` với alpha thấp) cho các bản Android/WebView cũ chưa hỗ trợ tốt blur, tránh trường hợp header bị trong suốt hoàn toàn không đọc được chữ.
- Cả 2 nền tảng: test kỹ chế độ tối/sáng của **hệ điều hành** không được tự động ép theme website đổi theo (website tự quản lý dark/light riêng qua toggle + localStorage như đã nêu ở mục 1.3, không phụ thuộc `prefers-color-scheme` trừ khi muốn set giá trị mặc định ban đầu dựa theo đó — nhưng người dùng vẫn phải toggle được độc lập).

---

## 7. Checklist hoàn thiện UI (dùng để tự kiểm tra trước khi báo xong)
- [ ] Toggle dark/light hoạt động, đổi đúng toàn bộ token màu ở mục 1.2/1.3, có transition mượt, có lưu trạng thái localStorage.
- [ ] Header sticky đúng chiều cao, dropdown "Dịch vụ" hoạt động, nút Book now luôn hiển thị.
- [ ] Click "Vocal" / "Nhạc công" / "Contact" scroll mượt đúng section trong trang chủ, không chuyển route.
- [ ] "Xem trình diễn" hiển thị đúng trạng thái active (pill + chấm tròn).
- [ ] Tất cả carousel (showreel mobile, vocal avatar, đội hình, blog nếu cần) kéo/vuốt được trên mobile và có nút mũi tên trên desktop.
- [ ] Form booking có validate UI cơ bản, không cần submit thật.
- [ ] Accordion FAQ mở/đóng mượt, chỉ 1 hoặc nhiều item mở cùng lúc đều chấp nhận được (ưu tiên: cho phép mở nhiều item cùng lúc để đơn giản).
- [ ] Responsive đầy đủ 4 breakpoints ở mục 1.1, không bị vỡ layout, không bị tràn ngang (overflow-x) ở bất kỳ màn hình nào.
- [ ] Toàn bộ ảnh dùng placeholder hợp lý (unsplash-style hoặc solid color block ghi chú kích thước) nếu chưa có ảnh thật, đúng tỉ lệ đã quy định từng loại card.
- [ ] Không có phần nào gọi API thật, không có màn hình loading/spinner chờ backend — mọi tương tác là UI-only/mock.
- [ ] Đã test đúng ma trận thiết bị/trình duyệt ở mục 6.5 (iOS Safari, Android Chrome, tablet, desktop, xoay ngang mobile) — không tràn ngang, không vỡ layout, header/floating bar không bị che bởi tai thỏ/thanh gesture-nav.
- [ ] Vùng chạm mọi nút/link ≥44px, input form ≥16px font để không bị auto-zoom trên iOS, carousel vuốt mượt bằng ngón tay trên cả 2 hệ điều hành di động.
