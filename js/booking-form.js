/* ==========================================================================
   GALAXY BAND - BOOKING FORM VALIDATION & HANDLING (booking-form.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForms = document.querySelectorAll('.galaxy-booking-form');

  bookingForms.forEach(form => {
    // Set minimum date to today for date input
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="fullname"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const emailInput = form.querySelector('[name="email"]');
      const eventTypeSelect = form.querySelector('[name="event_type"]');
      const eventDateInput = form.querySelector('[name="event_date"]');

      // Validation: Name is required
      if (nameInput && !nameInput.value.trim()) {
        window.GalaxyApp?.showToast('Vui lòng nhập họ và tên của bạn.', 'error');
        nameInput.focus();
        return;
      }

      // Validation: At least Phone or Email
      const hasPhone = phoneInput && phoneInput.value.trim().length >= 9;
      const hasEmail = emailInput && emailInput.value.trim().includes('@');

      if (!hasPhone && !hasEmail) {
        window.GalaxyApp?.showToast('Vui lòng nhập ít nhất Số điện thoại/Zalo hoặc Email hợp lệ.', 'error');
        phoneInput?.focus();
        return;
      }

      // Successful Demo Feedback
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" class="spin-icon">
            <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"></circle>
          </svg>
          Đang gửi...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.innerHTML = originalText;
          form.reset();
          window.GalaxyApp?.showToast('🎉 Gửi yêu cầu thành công! Galaxy Band sẽ liên hệ đến quý khách hàng trong thời gian sớm nhất.', 'success');
        }, 800);
      }
    });
  });
});
