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
    openVideoModal: function(title, previewImage, videoSrc) {
      let modal = document.querySelector('.modal-backdrop');
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
          <div class="modal-container">
            <button class="modal-close-btn" aria-label="Đóng">&times;</button>
            <div class="modal-video-wrapper" style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;"></div>
          </div>
        `;
        document.body.appendChild(modal);

        const closeModal = () => {
          modal.classList.remove('is-open');
          const videoEl = modal.querySelector('video');
          if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0;
          }
        };

        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
      }

      const wrapper = modal.querySelector('.modal-video-wrapper');
      if (videoSrc) {
        wrapper.innerHTML = `
          <video controls autoplay playsinline poster="${previewImage || ''}" style="width: 100%; height: 100%; object-fit: contain; background: #000;">
            <source src="${encodeURI(videoSrc)}" type="video/mp4">
            Trình duyệt của bạn không hỗ trợ phát video HTML5.
          </video>
        `;
      } else {
        wrapper.innerHTML = `
          <img id="modal-video-poster" src="${previewImage || 'images/Band on stage 1.jpg'}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.65;">
          <div style="position: absolute; text-align: center; padding: 20px; z-index: 2;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: var(--glow-accent);">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <h3 id="modal-video-title" style="color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 6px;">${title}</h3>
            <p style="color: var(--accent-cyan); font-size: 14px; font-weight: 600;">(Demo Player — Galaxy Band Live Session 4K)</p>
          </div>
        `;
      }

      modal.classList.add('is-open');
    },

    // 3. TikTok-Style Vertical Video Feed Modal
    openTikTokFeed: function(videoList, artistName = 'Trang Halley') {
      if (!videoList || !videoList.length) return;

      let modal = document.querySelector('.tiktok-modal-backdrop');
      if (modal) modal.remove(); // Rebuild fresh feed for clean state

      modal = document.createElement('div');
      modal.className = 'tiktok-modal-backdrop';

      const totalVideos = videoList.length;
      let currentIndex = -1;
      // Muted autoplay is required for reliable playback on iOS and Android.
      let isMuted = true;

      const slidesHtml = videoList.map((item, idx) => `
        <div class="tiktok-slide" data-index="${idx}">
          <video class="tiktok-video" data-src="${encodeURI(item.src)}" poster="${item.poster || ''}" playsinline loop muted preload="none"></video>
          
          <div class="tiktok-play-state-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>

          <div class="tiktok-bottom-overlay">
            <div class="tiktok-audio-tag">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              <span>Live Music • Galaxy Band</span>
            </div>
            <h3 class="tiktok-video-title">${item.title}</h3>
            ${item.desc ? `<p class="tiktok-video-desc">${item.desc}</p>` : ''}
          </div>
        </div>
      `).join('');

      modal.innerHTML = `
        <div class="tiktok-phone-container">
          <!-- Top Header -->
          <div class="tiktok-top-bar">
            <div class="tiktok-artist-badge">
              <span>🎤 ${artistName}</span>
              <span class="tiktok-counter-badge" id="tiktok-counter">1 / ${totalVideos}</span>
            </div>
            <button class="tiktok-close-btn" aria-label="Đóng">&times;</button>
          </div>

          <!-- Scroll Hint -->
          <div class="tiktok-scroll-hint" id="tiktok-hint">
            ↕ Cuộn lên / xuống để chuyển video
          </div>

          <!-- Vertical Feed Wrapper -->
          <div class="tiktok-feed-wrapper" id="tiktok-feed">
            ${slidesHtml}
          </div>

          <!-- Right Floating Controls -->
          <div class="tiktok-actions-sidebar">
            <button class="tiktok-action-btn btn-nav-up" title="Video trước (Phím Lên)" aria-label="Video trước">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
            <button class="tiktok-action-btn btn-nav-down" title="Video tiếp theo (Phím Xuống)" aria-label="Video tiếp">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button class="tiktok-action-btn btn-mute-toggle" title="Bật/Tắt âm thanh" aria-label="Âm thanh">
              <svg class="icon-unmuted" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const feedWrapper = modal.querySelector('#tiktok-feed');
      const slides = modal.querySelectorAll('.tiktok-slide');
      const counterEl = modal.querySelector('#tiktok-counter');
      const hintEl = modal.querySelector('#tiktok-hint');
      const muteBtn = modal.querySelector('.btn-mute-toggle');
      const upBtn = modal.querySelector('.btn-nav-up');
      const downBtn = modal.querySelector('.btn-nav-down');
      const closeBtn = modal.querySelector('.tiktok-close-btn');

      // Auto fade hint after 2.5s
      setTimeout(() => {
        if (hintEl) hintEl.style.opacity = '0';
      }, 2500);

      // Only attach a media source to the visible slide. This prevents mobile
      // browsers from buffering and decoding every large video in the feed.
      const loadVideo = (video) => {
        if (!video.src) {
          video.src = video.dataset.src;
          video.load();
        }
      };

      const unloadVideo = (video) => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      };

      // Play / pause management for the active slide only.
      const playSlide = (index) => {
        if (index === currentIndex) return;

        slides.forEach((slide, idx) => {
          const video = slide.querySelector('video');
          if (!video) return;
          if (idx === index) {
            loadVideo(video);
            video.muted = isMuted;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            unloadVideo(video);
          }
        });
        if (counterEl) counterEl.textContent = `${index + 1} / ${totalVideos}`;
        currentIndex = index;
      };

      // Intersection Observer to detect active video on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = parseInt(entry.target.getAttribute('data-index'), 10);
            playSlide(idx);
          }
        });
      }, {
        root: feedWrapper,
        threshold: 0.6
      });

      slides.forEach(slide => observer.observe(slide));

      // Tap on slide to toggle Play/Pause
      slides.forEach(slide => {
        const video = slide.querySelector('video');
        const playIcon = slide.querySelector('.tiktok-play-state-icon');
        slide.addEventListener('click', (e) => {
          if (e.target.closest('.tiktok-actions-sidebar') || e.target.closest('.tiktok-top-bar')) return;
          loadVideo(video);
          if (video.paused) {
            video.play().catch(() => {});
            if (playIcon) playIcon.classList.remove('show');
          } else {
            video.pause();
            if (playIcon) {
              playIcon.classList.add('show');
              setTimeout(() => playIcon.classList.remove('show'), 800);
            }
          }
        });
      });

      // Up/Down navigation buttons
      const scrollToSlide = (idx) => {
        if (idx < 0) idx = 0;
        if (idx >= totalVideos) idx = totalVideos - 1;
        slides[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      upBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToSlide(currentIndex - 1);
      });

      downBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToSlide(currentIndex + 1);
      });

      // Mute / Unmute
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMuted = !isMuted;
        const activeVideo = slides[currentIndex]?.querySelector('video');
        if (activeVideo) activeVideo.muted = isMuted;
        muteBtn.innerHTML = isMuted
          ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
          : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      });

      // Close handling
      const closeTikTok = () => {
        modal.classList.remove('is-open');
        slides.forEach(slide => {
          const v = slide.querySelector('video');
          if (v) {
            unloadVideo(v);
          }
        });
        observer.disconnect();
        document.removeEventListener('keydown', keyHandler);
        setTimeout(() => modal.remove(), 350);
      };

      const keyHandler = (e) => {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeTikTok();
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          scrollToSlide(currentIndex + 1);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          scrollToSlide(currentIndex - 1);
        }
        if (e.key === ' ') {
          e.preventDefault();
          const curVideo = slides[currentIndex]?.querySelector('video');
          if (curVideo) {
            loadVideo(curVideo);
            if (curVideo.paused) curVideo.play().catch(() => {});
            else curVideo.pause();
          }
        }
      };

      document.addEventListener('keydown', keyHandler);
      closeBtn.addEventListener('click', closeTikTok);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTikTok();
      });

      // Open modal
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
        playSlide(0);
      });
    },

    // 4. Vocalist Video Trigger Helper
    openVocalVideos: function(vocalistId) {
      const dataList = (typeof GALAXY_DATA !== 'undefined' && GALAXY_DATA.vocalists) ? GALAXY_DATA.vocalists : [];
      const vocalist = dataList.find(v => v.id === vocalistId);

      if (vocalist && vocalist.videos && vocalist.videos.length > 0) {
        this.openTikTokFeed(vocalist.videos, vocalist.name);
      } else {
        const name = vocalist ? vocalist.name : 'ca sĩ';
        this.showToast(`Video trình diễn của ${name} đang được hoàn thiện và sẽ sớm cập nhật!`, 'info');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Copyright Year
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
  });
})();
