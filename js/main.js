/* ==========================================================================
   GALAXY BAND - MAIN APPLICATION ORCHESTRATOR (main.js)
   ========================================================================== */

(function() {
  window.GalaxyApp = {
    // 1. Toast Notification Manager
    showToast: function(message, type = 'info') {
      let toastContainer = document.querySelector('.toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement('div');
      toast.className = `toast-message toast-${type}`;
      
      const icon = type === 'error' ? '⚠️' : (type === 'success' ? '✨' : '🎵');
      toast.innerHTML = `
        <span style="font-size: 18px;">${icon}</span>
        <span>${message}</span>
      `;

      toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    // 2. Video Preview Modal Manager
    openVideoModal: function(title, previewImage) {
      let modal = document.querySelector('.modal-backdrop');
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
          <div class="modal-container">
            <button class="modal-close-btn" aria-label="Đóng">&times;</button>
            <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
              <img id="modal-video-poster" src="${previewImage || 'Band on stage 1.jpg'}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.65;">
              <div style="position: absolute; text-align: center; padding: 20px; z-index: 2;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: var(--glow-accent);">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <h3 id="modal-video-title" style="color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 6px;">${title}</h3>
                <p style="color: var(--accent-cyan); font-size: 14px; font-weight: 600;">(Demo Player — Galaxy Band Live Session 4K)</p>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-close-btn').addEventListener('click', () => {
          modal.classList.remove('is-open');
        });

        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.classList.remove('is-open');
        });
      } else {
        const titleEl = modal.querySelector('#modal-video-title');
        const posterEl = modal.querySelector('#modal-video-poster');
        if (titleEl) titleEl.textContent = title;
        if (posterEl && previewImage) posterEl.src = previewImage;
      }

      modal.classList.add('is-open');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Copyright Year
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
  });
})();
