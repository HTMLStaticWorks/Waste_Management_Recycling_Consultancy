/**
 * Theme Toggle Handler
 * Handles Light/Dark Theme Switch and syncs with localStorage
 */

(function () {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-theme');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = document.querySelectorAll('.theme-btn:not(.rtl-toggle-btn)');
  
  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
    
    // Broadcast event for external components (e.g. charts) to redraw
    const themeEvent = new CustomEvent('themeChanged', { 
      detail: { theme: isDark ? 'light' : 'dark' } 
    });
    window.dispatchEvent(themeEvent);
    
    updateToggleIcons();
  }

  function updateToggleIcons() {
    const isDark = document.body.classList.contains('dark-theme');
    themeToggleBtns.forEach(btn => {
      if (isDark) {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        `;
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        `;
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    });
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Initial update
  updateToggleIcons();
});

// RTL Layout Toggle Handler
(function () {
  const currentDir = localStorage.getItem('dir');
  if (currentDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl-mode');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');

  function toggleRtl() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-mode');
      localStorage.setItem('dir', 'ltr');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-mode');
      localStorage.setItem('dir', 'rtl');
    }
    
    // Dispatch custom event for general component updates
    window.dispatchEvent(new Event('layoutDirectionChanged'));
    updateRtlBtnText();
  }

  function updateRtlBtnText() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    rtlToggleBtns.forEach(btn => {
      btn.textContent = isRtl ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', isRtl ? 'Switch to LTR Layout' : 'Switch to RTL Layout');
    });
  }

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleRtl);
  });

  updateRtlBtnText();
});
