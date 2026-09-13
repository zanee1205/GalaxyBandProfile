/* ==========================================================================
   GALAXY BAND - NAVIGATION & HEADER LOGIC (navigation.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const langToggleBtn = document.querySelector('.lang-select-btn');

  // 1. Sticky Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }
  }, { passive: true });

  // 2. Mobile Drawer Menu Toggle
  if (hamburgerBtn && mobileMenuOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenuOverlay.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
      
      // Toggle Hamburger Icon / Close Icon
      if (isOpen) {
        hamburgerBtn.innerHTML = `
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        hamburgerBtn.innerHTML = `
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburgerBtn.innerHTML = `
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      });
    });

    // Close button inside mobile drawer
    const mobileCloseBtn = document.querySelector('.mobile-menu-close-btn');
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.innerHTML = `
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      });
    }
  }

  // 3. Smooth Scroll to In-Page Anchors with 88px offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 88;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Language Selector Toggle (VI / EN UI simulator)
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = langToggleBtn.dataset.lang || 'VI';
      const newLang = currentLang === 'VI' ? 'EN' : 'VI';
      langToggleBtn.dataset.lang = newLang;
      langToggleBtn.innerHTML = `
        <span>${newLang}</span>
        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
      if (window.GalaxyApp?.showToast) {
        window.GalaxyApp.showToast(`Đã chuyển ngôn ngữ giao diện sang ${newLang}`);
      }
    });
  }
});
