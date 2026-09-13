/* ==========================================================================
   GALAXY BAND - DATA SOURCE (data.js)
   ========================================================================== */

const GALAXY_DATA = {
  // 1. Dữ liệu Vocalists (Mục 4.1)
  vocalists: [
    {
      id: "ngoc-giau",
      name: "Ngọc Giàu",
      role: "Vocalist Nữ",
      gender: "female",
      photo: "vocalist - Ngọc Giàu.jpg",
      voiceStyle: "Khỏe, trẻ trung, sôi động",
      genres: ["Rock", "Ballad", "Pop"],
      mood: ["Sôi động", "Trẻ trung", "Năng lượng", "Mạnh mẽ"],
      showFormat: ["Live band sân khấu lớn", "Rock night", "Ballad đêm nhạc", "Acoustic mạnh"],
      demoVideos: [
        { title: "Để Mị Nói Cho Mà Nghe (Live Rock ver)", duration: "03:45", views: "14.2K" },
        { title: "Nơi Tình Yêu Bắt Đầu (Acoustic Power)", duration: "04:12", views: "28.5K" }
      ]
    },
    {
      id: "louis-nguyen",
      name: "Louis Nguyễn",
      role: "Vocalist Nam",
      gender: "male",
      photo: "vocalist - Louis Nguyễn.jpg",
      voiceStyle: "Cuốn hút, cá tính",
      genres: ["Indie Việt", "Pop", "Indie Pop"],
      mood: ["Cá tính", "Cuốn hút", "Chill", "Có chiều sâu"],
      showFormat: ["Acoustic café", "Indie night", "Dinner set nhẹ nhàng"],
      demoVideos: [
        { title: "Bao Tiền Một Mớ Bình Yên (Live Indie)", duration: "03:30", views: "32.1K" },
        { title: "Một Đêm Say (Acoustic Chill Out)", duration: "03:55", views: "19.8K" }
      ]
    },
    {
      id: "trang-halley",
      name: "Trang Halley",
      role: "Vocalist Nữ",
      gender: "female",
      photo: "vocalist - Trang Halley.jpg",
      voiceStyle: "Quyến rũ, lả lơi",
      genres: ["US/UK Hits", "Electronic", "Remix/EDM"],
      mood: ["Quyến rũ", "Sôi động", "Gợi cảm", "Bùng nổ"],
      showFormat: ["Bar/Club night", "Event sôi động", "Remix set", "After party"],
      demoVideos: [
        { title: "Levitating x Don't Start Now (Live Medley)", duration: "04:05", views: "45.0K" },
        { title: "Waiting For You (Club Remix Set)", duration: "03:40", views: "38.2K" }
      ]
    }
  ],

  // 2. Dữ liệu Nhạc công (Mục 4.2)
  musicians: [
    {
      id: "tran-khue",
      name: "Trần Khuê",
      role: "Drummer",
      instrumentBadge: "DRUMMER",
      caption: "Drums / Percussion",
      photo: "drummer - Trần Khuê.jpg",
      description: "Người giữ nhịp cho cả band, có khả năng chuyển sắc thái bài hát từ buồn bã sang sôi động, điều phối lửa xuyên suốt các bài hát."
    },
    {
      id: "nhat-hao",
      name: "Nhật Hào",
      role: "Guitarist",
      instrumentBadge: "GUITARIST",
      caption: "Acoustic/Electric Guitar",
      photo: "guitarist - Nhật Hào.JPG",
      description: "Khả năng cảm nhạc cực tốt, làm chủ nhạc cụ, phô diễn kỹ thuật xuất sắc trong bài hát, dễ dàng tôn giọng hát của các vocalist lên cao."
    },
    {
      id: "hung-trong",
      name: "Hùng Trọng",
      role: "Bassist",
      instrumentBadge: "BASSIST",
      caption: "Bass Guitar",
      photo: "bassist - Hùng Trọng.jpg",
      description: "Người kết nối các nhạc cụ và vocalist lại với nhau, kiểm soát âm tần trầm, tạo độ vang và lắng đọng trong bài nhạc."
    },
    {
      id: "tuan-duy",
      name: "Tuấn Duy",
      role: "Keyboardist / Pianist",
      instrumentBadge: "KEYBOARDIST",
      caption: "Keyboard / Piano",
      photo: "keyboardist - Tuấn Duy.jpg",
      description: "Người ấn định màu sắc của bản nhạc, góp phần cho bài hát thêm có hồn, mang đậm tính nghệ thuật."
    }
  ],

  // 3. Dữ liệu Showreel (Địa điểm diễn)
  showreels: [
    {
      title: "Gala Dinner & Year End Party",
      category: "SỰ KIỆN DOANH NGHIỆP",
      desc: "Âm nhạc sang trọng khai tiệc và bùng nổ năng lượng ở phần tiệc chính.",
      photo: "Band on stage 1.jpg"
    },
    {
      title: "Tiệc Cưới & Lễ Kỷ Niệm Cao Cấp",
      category: "WEDDING & PRIVATE",
      desc: "Giai điệu lãng mạn, acoustic ballad sâu lắng dẫn lối cảm xúc trọn vẹn.",
      photo: "Band on stage 2.jpg"
    },
    {
      title: "Acoustic Lounge & Cafe Show",
      category: "LIVE LOUNGE & CAFE",
      desc: "Không gian mộc mạc, gần gũi với khán giả qua các bản tình ca ấm áp.",
      photo: "vocalist - Louis Nguyễn.jpg"
    },
    {
      title: "Concert & Festival Ngoài Trời",
      category: "OUTDOOR FESTIVAL",
      desc: "Dàn dựng hoành tráng, hòa âm rock/pop phối mới đốt cháy sân khấu lớn.",
      photo: "Band on stage 1.jpg"
    }
  ],

  // 4. Dữ liệu Khách hàng / Đối tác
  clients: [
    "Vingroup", "Novaland", "FPT Software", "Shopee Vietnam", "Masan Group", "Viettel Telecom", "Sun Life Vietnam", "Heineken Silver"
  ],

  // 5. Dữ liệu Lịch Show Diễn
  schedules: [
    {
      day: "Thứ Sáu",
      dateStr: "19.09.2026",
      showName: "Galaxy Acoustic Night — Đêm Tình Ca & Mùa Thu",
      venue: "Hard Rock Cafe, Quận 1, TP.HCM",
      time: "20:30 - 22:45",
      isFeatured: true
    },
    {
      day: "Thứ Bảy",
      dateStr: "20.09.2026",
      showName: "Gala Dinner 'Bứt Phá Vươn Xa' — Techcombank Corp",
      venue: "Trung tâm Hội nghị GEM Center, Quận 1, TP.HCM",
      time: "18:30 - 21:30",
      isFeatured: false
    },
    {
      day: "Chủ Nhật",
      dateStr: "21.09.2026",
      showName: "Live Set & Cocktail Chillout",
      venue: "Rooftop 9 Lounge, Quận 3, TP.HCM",
      time: "20:00 - 22:00",
      isFeatured: false
    },
    {
      day: "Thứ Tư",
      dateStr: "24.09.2026",
      showName: "Lễ Kỷ Niệm Thành Lập Doanh Nghiệp Viễn Thông",
      venue: "White Palace Hoàng Văn Thụ, Phú Nhuận, TP.HCM",
      time: "18:00 - 21:00",
      isFeatured: false
    },
    {
      day: "Thứ Bảy",
      dateStr: "27.09.2026",
      showName: "Galaxy Rock & Pop Night Show",
      venue: "Yoko Cafe Live Music, Quận 3, TP.HCM",
      time: "21:00 - 23:30",
      isFeatured: true
    }
  ],

  // 6. Dữ liệu Bài viết Blog (9 bài viết chuẩn)
  blogs: [
    {
      id: 1,
      title: "Kinh nghiệm chọn format ban nhạc phù hợp cho Gala Dinner công ty",
      category: "KINH NGHIỆM BOOK BAND",
      date: "10 Tháng 9, 2026",
      excerpt: "Bí quyết cân đối giữa không gian đón khách nhẹ nhàng và phần tiệc bùng nổ cuối chương trình để khách mời hòa mình trọn vẹn...",
      thumb: "Band on stage 1.jpg"
    },
    {
      id: 2,
      title: "Gợi ý 20 bài hát acoustic tiếng Anh & tiếng Việt cực hay cho tiệc cưới",
      category: "SETLIST TIỆC CƯỚI",
      date: "06 Tháng 9, 2026",
      excerpt: "Tổng hợp các bản tình ca ngọt ngào, giai điệu êm dịu giúp nghi thức lễ và tiệc rượu thêm phần lãng mạn khó quên...",
      thumb: "Band on stage 2.jpg"
    },
    {
      id: 3,
      title: "Cách lập Brief chuẩn cho ban nhạc sự kiện để nhận báo giá sát nhất",
      category: "HƯỚNG DẪN BOOKING",
      date: "01 Tháng 9, 2026",
      excerpt: "Nắm rõ 6 thông tin cốt lõi ban nhạc cần biết trước khi gửi phương án biểu diễn và setup âm thanh chuẩn xác...",
      thumb: "guitarist - Nhật Hào.JPG"
    },
    {
      id: 4,
      title: "Hậu trường luyện tập của các thành viên Galaxy Band trước thềm mùa show",
      category: "CHUYỆN HẬU TRƯỜNG",
      date: "25 Tháng 8, 2026",
      excerpt: "Hành trình tập luyện phối mới các bản hit đình đám với tinh thần làm chủ sân khấu và tôn vinh cảm xúc người nghe...",
      thumb: "drummer - Trần Khuê.jpg"
    },
    {
      id: 5,
      title: "Tại sao nên thuê trọn gói Ban nhạc và Hệ thống Âm thanh chuyên nghiệp?",
      category: "ÂM THANH SỰ KIỆN",
      date: "18 Tháng 8, 2026",
      excerpt: "Lợi ích khi đội ngũ soundman hiểu rõ gu âm thanh và thông số nhạc cụ của từng thành viên trong ban nhạc...",
      thumb: "bassist - Hùng Trọng.jpg"
    },
    {
      id: 6,
      title: "Xu hướng âm nhạc sự kiện 2026: Từ Indie hoài niệm đến EDM bùng nổ",
      category: "XU HƯỚNG ÂM NHẠC",
      date: "12 Tháng 8, 2026",
      excerpt: "Sự kết hợp ăn ý giữa phong cách mộc mạc acoustic và những đoạn drop cao trào được giới trẻ cực kỳ yêu thích...",
      thumb: "keyboardist - Tuấn Duy.jpg"
    },
    {
      id: 7,
      title: "Top 5 địa điểm tổ chức tiệc live music lý tưởng nhất tại trung tâm TP.HCM",
      category: "ĐỊA ĐIỂM SỰ KIỆN",
      date: "05 Tháng 8, 2026",
      excerpt: "Đánh giá chi tiết về không gian, hệ thống tiêu âm và tính tiện lợi của các khán phòng sự kiện hàng đầu...",
      thumb: "Band on stage 1.jpg"
    },
    {
      id: 8,
      title: "Phỏng vấn Vocalist Trang Halley: 'Mỗi bài hát là một nguồn năng lượng sống'",
      category: "GẶP GỠ NGHỆ SĨ",
      date: "28 Tháng 7, 2026",
      excerpt: "Chia sẻ chân thật về phong cách biểu diễn quyến rũ và bí quyết giữ lửa giọng hát qua hàng chục show diễn liên tục...",
      thumb: "vocalist - Trang Halley.jpg"
    },
    {
      id: 9,
      title: "Checklist 8 bước chuẩn bị âm nhạc trước giờ khai tiệc sự kiện 2 tiếng",
      category: "KINH NGHIỆM ĐIỀU PHỐI",
      date: "20 Tháng 7, 2026",
      excerpt: "Quy trình soundcheck, kiểm tra line mic và khớp kịch bản chi tiết cùng MC và ekip sân khấu...",
      thumb: "vocalist - Ngọc Giàu.jpg"
    }
  ],

  // 7. Dữ liệu FAQ (Câu hỏi thường gặp)
  faqs: [
    {
      question: "Galaxy Band có thể biểu diễn theo danh sách bài hát (setlist) do khách hàng yêu cầu không?",
      answer: "Hoàn toàn được! Galaxy Band luôn sẵn sàng tiếp nhận danh sách các bài hát yêu thích hoặc bài hát thương hiệu của doanh nghiệp. Bạn chỉ cần gửi trước 5-7 ngày để ban nhạc hòa âm phối khí và tập luyện chỉn chu nhất."
    },
    {
      question: "Chi phí thuê ban nhạc đã bao gồm hệ thống âm thanh, ánh sáng chưa?",
      answer: "Báo giá cơ bản dành riêng cho ban nhạc và nhạc cụ biểu diễn. Nếu quý khách có nhu cầu, Galaxy Band cung cấp gói combo trọn gói gồm Âm thanh - Ánh sáng biểu diễn chuyên nghiệp với mức giá ưu đãi và sự đồng bộ tuyệt đối."
    },
    {
      question: "Ban nhạc có thể biểu diễn ở các tỉnh thành ngoài TP.HCM không?",
      answer: "Có. Galaxy Band thường xuyên lưu diễn tại Bình Dương, Đồng Nai, Vũng Tàu, Đà Lạt, Phan Thiết, Phú Quốc và các tỉnh miền Tây. Chi phí công tác sẽ được tính toán hợp lý và báo rõ ràng trong hợp đồng."
    },
    {
      question: "Thời gian biểu diễn của một set nhạc sự kiện thường kéo dài bao lâu?",
      answer: "Thông thường một show sự kiện bao gồm 2-3 set diễn (khoảng 60 - 90 phút tổng thời lượng diễn thực tế), phân bổ linh hoạt giữa đón khách, khai tiệc trang trọng và bùng nổ giao lưu sau tiệc."
    },
    {
      question: "Quy trình đặt cọc và thanh toán như thế nào?",
      answer: "Sau khi thống nhất phương án và ngày diễn, hai bên ký hợp đồng dịch vụ. Khách hàng đặt cọc 30-50% để giữ lịch, phần còn lại thanh toán sau khi ban nhạc hoàn thành xuất sắc buổi diễn."
    }
  ]
};
