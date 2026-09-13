const { Resend } = require('resend');

function display(value) {
  return value || 'Không cung cấp';
}

function bookingEmail({ fullName, phone, email, showType, eventDate, note, sourcePage, createdAt }) {
  const rows = [
    ['Tên / đơn vị', fullName],
    ['Số điện thoại / Zalo', display(phone)],
    ['Email', display(email)],
    ['Loại show', showType],
    ['Ngày dự kiến', display(eventDate)],
    ['Ghi chú', display(note)],
    ['Thời gian gửi', new Date(createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })],
    ['Trang nguồn', display(sourcePage)]
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('');
  return { text, html: `<h2>Có booking mới từ Galaxy Band</h2>${html}` };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendBookingEmail(booking) {
  const { RESEND_API_KEY, BOOKING_NOTIFY_EMAIL, BOOKING_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !BOOKING_NOTIFY_EMAIL || !BOOKING_FROM_EMAIL) {
    throw new Error('Resend environment variables are not configured.');
  }

  const resend = new Resend(RESEND_API_KEY);
  const content = bookingEmail(booking);
  const { error } = await resend.emails.send({
    from: BOOKING_FROM_EMAIL,
    to: [BOOKING_NOTIFY_EMAIL],
    subject: `[Booking mới] ${booking.showType} - ${booking.fullName}`,
    ...content
  });

  if (error) throw new Error(error.message || 'Resend could not send the notification.');
}

module.exports = { sendBookingEmail };
