(function() {
  'use strict';

  // ============================================
  // TheCliqLabs Loader v1.0
  // ============================================

  var PANEL_URL = 'https://thecliqlabs.netlify.app';

  // Wait for any element to appear in DOM
  function waitFor(selector, callback, maxWait) {
    var waited = 0;
    var interval = setInterval(function() {
      var el = document.querySelector(selector);
      if (el) { clearInterval(interval); callback(el); }
      waited += 300;
      if (waited >= (maxWait || 15000)) clearInterval(interval);
    }, 300);
  }

  // ============================================
  // STEP 1 — Inject CliqLabs into GHL sidebar
  // ============================================
  function injectSidebarMenu() {
    if (document.getElementById('cliqlabs-nav-item')) return;

    waitFor('.hl_nav-settings', function(navSettings) {
      if (document.getElementById('cliqlabs-nav-item')) return;

      var menuItem = document.createElement('a');
      menuItem.id = 'cliqlabs-nav-item';
      menuItem.href = '#';
      menuItem.className = 'w-full group px-3 flex items-center justify-start lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer py-2 md:py-2';
      menuItem.style.cssText = 'opacity:0.85; transition:opacity 0.2s;';
      menuItem.innerHTML = `
        <span style="
          display:flex;
          align-items:center;
          gap:8px;
          font-size:14px;
          font-weight:600;
          font-family:Inter,sans-serif;
          width:100%;
        ">
          <span style="font-size:16px;">⚡</span>
          <span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block">
            CliqLabs
          </span>
          <span style="
            background:#673de6;
            color:white;
            font-size:9px;
            font-weight:800;
            padding:2px 5px;
            border-radius:3px;
            margin-left:auto;
            letter-spacing:0.5px;
          ">NEW</span>
        </span>
      `;

      menuItem.addEventListener('mouseenter', function() { this.style.opacity = '1'; });
      menuItem.addEventListener('mouseleave', function() { this.style.opacity = '0.85'; });
      menuItem.addEventListener('click', function(e) {
        e.preventDefault();
        openControlPanel();
      });

      navSettings.parentNode.insertBefore(menuItem, navSettings);
    });
  }

  // ============================================
  // STEP 2 — Open Control Panel as full page
  // ============================================
  function openControlPanel() {
    if (document.getElementById('cliqlabs-panel-container')) return;

    // Get GHL main content area
    var mainContent = document.querySelector('.w-full.h-full') ||
                      document.querySelector('[class*="hl_wrapper"]') ||
                      document.querySelector('#app > div > div:last-child') ||
                      document.body;

    var container = document.createElement('div');
    container.id = 'cliqlabs-panel-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 160px;
      right: 0;
      bottom: 0;
      z-index: 9999;
      background: white;
    `;

    var iframe = document.createElement('iframe');
    iframe.src = PANEL_URL;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;

    container.appendChild(iframe);
    document.body.appendChild(container);

    // Listen for close message from panel
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'cliqlabs-close-panel') {
        closeControlPanel();
      }
      if (e.data && e.data.type === 'cliqlabs-apply-theme') {
        applyThemeCSS(e.data.settings);
      }
    });
  }

  function closeControlPanel() {
    var container = document.getElementById('cliqlabs-panel-container');
    if (container) container.remove();
  }

  // ============================================
  // STEP 3 — Apply Theme CSS to GHL
  // ============================================
  function applyThemeCSS(settings) {
    var existing = document.getElementById('cliqlabs-theme-css');
    if (existing) existing.remove();

    var primary = settings.primaryColor || '#673de6';
    var sidebar = settings.sidebarColor || '#1a1a2e';
    var iconColor = settings.iconColor || '#ffffff';

    var css = `
      /* TheCliqLabs Theme */
      #sidebar-v2, .default-bg-color {
        background-color: ${sidebar} !important;
      }
      #sidebar-v2 a[id^="sb_"] .nav-title,
      #sidebar-v2 a[id^="sb_"] span {
        color: ${iconColor} !important;
      }
      #sidebar-v2 a[id^="sb_"].active,
      #sidebar-v2 a[id^="sb_"].exact-active {
        background: ${primary}22 !important;
        border-left: 3px solid ${primary} !important;
      }
      #location-switcher-sidbar-v2 {
        background: rgba(255,255,255,0.08) !important;
        border-radius: 8px !important;
      }
      #globalSearchOpener, #quickActions {
        background: rgba(255,255,255,0.08) !important;
        border-radius: 6px !important;
      }
      .n-button--primary-type,
      .hr-button--primary-type,
      #new-appointment-button,
      #add-record-btn,
      #data-create-opportunity,
      #new-conversation-btn-collapsed,
      #hl-media-upload,
      #create-new-button {
        background-color: ${primary} !important;
      }
      a.topmenu-navitem.active {
        color: ${primary} !important;
        border-bottom-color: ${primary} !important;
      }
      .n-button--tertiary-type,
      .hr-button--tertiary-type {
        background-color: ${primary}22 !important;
        color: ${primary} !important;
      }
      .n-pagination-item--active {
        color: ${primary} !important;
        border-color: ${primary} !important;
      }
      #hl_header--help-icon {
        background-color: ${primary} !important;
      }
      .tabulator-page.active {
        color: ${primary} !important;
        border-color: ${primary} !important;
      }
      svg.text-primary-600,
      svg.h-5.w-5.text-primary-600 {
        color: ${primary} !important;
      }
    `;

    var style = document.createElement('style');
    style.id = 'cliqlabs-theme-css';
    style.textContent = css;
    document.head.appendChild(style);

    // Save to localStorage
    localStorage.setItem('cliqlabs_settings', JSON.stringify(settings));
  }

  // ============================================
  // STEP 4 — Auto-load saved theme on page load
  // ============================================
  function loadSavedTheme() {
    var saved = localStorage.getItem('cliqlabs_settings');
    if (saved) {
      try {
        var settings = JSON.parse(saved);
        applyThemeCSS(settings);
      } catch(e) {}
    }
  }

  // ============================================
  // STEP 5 — Handle GHL SPA navigation
  // ============================================
  var lastUrl = location.href;
  new MutationObserver(function() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(injectSidebarMenu, 1500);
      setTimeout(loadSavedTheme, 500);
    }
  }).observe(document, { subtree: true, childList: true });

  // ============================================
  // INIT
  // ============================================
  loadSavedTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(injectSidebarMenu, 2000);
    });
  } else {
    setTimeout(injectSidebarMenu, 2000);
  }

})();
