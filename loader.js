(function() {
  'use strict';

  // =====================
  // 1. APPLY SAVED THEME
  // =====================
  function applyTheme() {
    var existing = document.getElementById('cliqlabs-css');
    if (existing) existing.remove();

    var saved = localStorage.getItem('cliqlabs_theme');
    if (!saved) return;

    try {
      var s = JSON.parse(saved);
      var primary = s.primary || '#673de6';
      var sidebar = s.sidebar || '#1a1a2e';
      var icons   = s.icons   || '#ffffff';
      var header  = s.header  || '#ffffff';

      var css = `
        /* TheCliqLabs Theme */
        #sidebar-v2,
        .default-bg-color {
          background-color: ${sidebar} !important;
        }
        #sidebar-v2 a[id^="sb_"] .nav-title,
        #sidebar-v2 a[id^="sb_"] span.nav-title {
          color: ${icons} !important;
        }
        #sidebar-v2 a[id^="sb_"].active,
        #sidebar-v2 a[id^="sb_"].exact-active {
          background: ${primary}25 !important;
          border-left: 3px solid ${primary} !important;
        }
        #sidebar-v2 a[id^="sb_"].active .nav-title,
        #sidebar-v2 a[id^="sb_"].exact-active .nav-title {
          color: ${primary} !important;
        }
        #location-switcher-sidbar-v2 {
          background: rgba(255,255,255,0.07) !important;
          border-radius: 8px !important;
        }
        #globalSearchOpener {
          background: rgba(255,255,255,0.07) !important;
          border-radius: 6px !important;
        }
        #quickActions {
          background: rgba(255,255,255,0.07) !important;
          border-radius: 6px !important;
        }
        .search-placeholder {
          color: rgba(255,255,255,0.45) !important;
        }
        #sidebar-v2 .divider p {
          border-color: rgba(255,255,255,0.08) !important;
        }
        HEADER.hl_header {
          background-color: ${header} !important;
        }
        .n-button--primary-type,
        .hr-button--primary-type,
        .hr-button--primary {
          background-color: ${primary} !important;
        }
        .n-button--tertiary-type,
        .hr-button--tertiary-type {
          background-color: ${primary}20 !important;
          color: ${primary} !important;
        }
        a.topmenu-navitem.active {
          color: ${primary} !important;
          border-bottom-color: ${primary} !important;
        }
        .n-pagination-item--active {
          color: ${primary} !important;
          border-color: ${primary} !important;
        }
        #hl_header--help-icon {
          background-color: ${primary} !important;
        }
        svg.text-primary-600,
        svg.h-5.w-5.text-primary-600 {
          color: ${primary} !important;
        }
        .tabulator-page.active {
          color: ${primary} !important;
          border-color: ${primary} !important;
        }
        #conv-menu-item-team-inbox.active {
          color: ${primary} !important;
        }
        #new-conversation-btn-collapsed,
        #add-record-btn,
        #data-create-opportunity,
        #new-appointment-button,
        #hl-media-upload,
        #create-new-button {
          background-color: ${primary} !important;
        }
      `;

      var style = document.createElement('style');
      style.id = 'cliqlabs-css';
      style.textContent = css;
      document.head.appendChild(style);

    } catch(e) {
      console.log('CliqLabs theme error:', e);
    }
  }

  // =====================
  // 2. ADD SIDEBAR MENU
  // =====================
  function addSidebarMenu() {
    if (document.getElementById('cliqlabs-nav-btn')) return;

    var nav = document.querySelector('.hl_nav-settings');
    if (!nav) return;

    var btn = document.createElement('a');
    btn.id = 'cliqlabs-nav-btn';
    btn.href = 'https://cdn.thecliqlabs.com';
    btn.target = '_blank';
    btn.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      text-decoration: none;
      opacity: 0.85;
      transition: opacity 0.2s;
      width: 100%;
    `;
    btn.innerHTML = `
      <span style="font-size:16px; min-width:20px; text-align:center;">⚡</span>
      <span class="nav-title" style="
        font-size:14px;
        font-weight:600;
        font-family:Inter,sans-serif;
        color:inherit;
      ">CliqLabs</span>
      <span style="
        background:#673de6;
        color:white;
        font-size:9px;
        font-weight:800;
        padding:2px 6px;
        border-radius:3px;
        margin-left:auto;
        letter-spacing:0.5px;
      ">NEW</span>
    `;

    btn.addEventListener('mouseenter', function() { this.style.opacity = '1'; });
    btn.addEventListener('mouseleave', function() { this.style.opacity = '0.85'; });

    nav.parentNode.insertBefore(btn, nav);
  }

  // =====================
  // 3. INIT
  // =====================
  applyTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(addSidebarMenu, 2000);
    });
  } else {
    setTimeout(addSidebarMenu, 2000);
  }

  // Re-inject on GHL page navigation (SPA)
  var lastUrl = location.href;
  new MutationObserver(function() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      applyTheme();
      setTimeout(addSidebarMenu, 1500);
    }
  }).observe(document, { subtree: true, childList: true });

  // Listen for theme updates from control panel
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'cliqlabs-save-theme') {
      localStorage.setItem('cliqlabs_theme', JSON.stringify(e.data.settings));
      applyTheme();
    }
  });

})();
