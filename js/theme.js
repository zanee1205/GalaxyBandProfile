/* ==========================================================================
   GALAXY BAND - THEME SWITCHER (theme.js)
   ========================================================================== */

(function() {
  const THEME_STORAGE_KEY = 'galaxy_band_theme';
  const htmlElement = document.documentElement;

  // Initialize theme on load (Dark mode as default)
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  function setTheme(theme) {
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      updateThemeIcons('light');
    } else {
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      updateThemeIcons('dark');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  function updateThemeIcons(currentTheme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      if (currentTheme === 'light') {
        // Show Moon icon (to switch to dark)
        btn.innerHTML = `
          <svg class="theme-icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        btn.setAttribute('title', 'Chuyển sang chế độ tối (Space Dark)');
        btn.setAttribute('aria-label', 'Chuyển sang chế độ tối');
      } else {
        // Show Sun icon (to switch to light)
        btn.innerHTML = `
          <svg class="theme-icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        btn.setAttribute('title', 'Chuyển sang chế độ sáng (Cosmic Light)');
        btn.setAttribute('aria-label', 'Chuyển sang chế độ sáng');
      }
    });
  }

  // Setup Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Export for global access
  window.GalaxyTheme = {
    toggle: toggleTheme,
    set: setTheme
  };
})();
