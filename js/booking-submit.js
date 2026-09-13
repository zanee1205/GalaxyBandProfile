/*
 * Booking API integration. This is intentionally separate from the existing
 * booking-form.js so existing UI files do not need to be changed.
 */
document.addEventListener('DOMContentLoaded', () => {
  const bookingForms = document.querySelectorAll('.galaxy-booking-form');

  bookingForms.forEach((form) => {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.autocomplete = 'off';
    honeypot.tabIndex = -1;
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
    form.appendChild(honeypot);

    // Capture phase prevents the legacy demo submit handler from also firing.
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const fullName = form.querySelector('[name="fullname"]')?.value.trim() || '';
      const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
      const email = form.querySelector('[name="email"]')?.value.trim() || '';
      const showType = form.querySelector('[name="event_type"]')?.value.trim() || '';
      const eventDate = form.querySelector('[name="event_date"]')?.value || '';
      const note = form.querySelector('[name="notes"]')?.value.trim() || '';

      const submitButton = form.querySelector('button[type="submit"]');
      const originalLabel = submitButton?.innerHTML;
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            showType,
            eventDate,
            note,
            sourcePage: window.location.pathname.includes('dich-vu.html') ? 'dich-vu' : 'home',
            honeypot: honeypot.value
          })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success) throw new Error(result.error || 'Không thể gửi yêu cầu.');

        form.reset();
        window.GalaxyApp?.showToast('🎉 Gửi yêu cầu thành công! Galaxy Band sẽ liên hệ tư vấn trong 15 phút.', 'success');
      } catch (error) {
        window.GalaxyApp?.showToast(error.message || 'Có lỗi xảy ra, vui lòng thử lại.', 'error');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalLabel;
        }
      }
    }, true);
  });
});
