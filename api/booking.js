const { getSupabaseAdmin } = require('../lib/supabaseAdmin');
const { sendBookingEmail } = require('../lib/bookingEmail');

const LIMITS = { fullName: 200, phone: 40, email: 254, showType: 100, eventDate: 10, note: 2000, sourcePage: 80, honeypot: 200 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[-()\s.\d]{9,40}$/;

function json(response, status, body) {
  response.status(status).json(body);
}

function clean(value, limit) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, limit);
}

function validDate(value) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

module.exports = async function bookingHandler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { success: false, error: 'Method not allowed' });
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {};
  const fullName = clean(body.fullName, LIMITS.fullName);
  const phone = clean(body.phone, LIMITS.phone);
  const email = clean(body.email, LIMITS.email).toLowerCase();
  const showType = clean(body.showType, LIMITS.showType);
  const eventDate = clean(body.eventDate, LIMITS.eventDate);
  const note = clean(body.note, LIMITS.note);
  const sourcePage = clean(body.sourcePage, LIMITS.sourcePage);
  const honeypot = clean(body.honeypot, LIMITS.honeypot);

  // Do not reveal the honeypot to bots; accept without writing or emailing.
  if (honeypot) return json(response, 200, { success: true });

  if (!fullName || !showType || (!phone && !email)) {
    return json(response, 400, { success: false, error: 'Thiếu thông tin bắt buộc.' });
  }
  if (phone && !PHONE_PATTERN.test(phone)) {
    return json(response, 400, { success: false, error: 'Số điện thoại không hợp lệ.' });
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    return json(response, 400, { success: false, error: 'Email không hợp lệ.' });
  }
  if (!validDate(eventDate)) {
    return json(response, 400, { success: false, error: 'Ngày dự kiến không hợp lệ.' });
  }

  const booking = {
    full_name: fullName,
    phone: phone || null,
    email: email || null,
    show_type: showType,
    event_date: eventDate || null,
    note: note || null,
    source_page: sourcePage || null
  };

  let saved;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('bookings').insert(booking).select().single();
    if (error) throw error;
    saved = data;
  } catch (error) {
    console.error('Booking database insert failed:', error);
    return json(response, 500, { success: false, error: 'Không thể lưu yêu cầu booking. Vui lòng thử lại.' });
  }

  try {
    await sendBookingEmail({
      fullName: saved.full_name, phone: saved.phone, email: saved.email,
      showType: saved.show_type, eventDate: saved.event_date, note: saved.note,
      sourcePage: saved.source_page, createdAt: saved.created_at
    });
    const { error } = await getSupabaseAdmin().from('bookings').update({ email_sent: true, email_error: null }).eq('id', saved.id);
    if (error) console.error('Could not mark notification as sent:', error);
  } catch (error) {
    const emailError = String(error.message || error).slice(0, 1000);
    console.error('Booking notification email failed:', emailError);
    const { error: updateError } = await getSupabaseAdmin().from('bookings').update({ email_error: emailError }).eq('id', saved.id);
    if (updateError) console.error('Could not save notification error:', updateError);
  }

  return json(response, 200, { success: true });
};
