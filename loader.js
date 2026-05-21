(function() {
  'use strict';

  var PANEL_URL = 'https://thecliqlabs.netlify.app';
  var panelOpen = false;

  // Wait for element
  function waitFor(selector, callback, maxWait) {
    var waited = 0;
    var interval = setInterval(function() {
      var el = document.querySelector(selector);
      if (el) { clearInterval(interval); callback(el); }
      waited += 300;
      if (waited >= (maxWait || 15000)) clearInterval(interval);
    }, 300);
  }

  // Inject CliqLabs menu item into sidebar
  function injectSidebarMenu() {
    if (document.getElementById('cliqlabs-nav-item')) return;

    waitFor('.hl_nav-settings', function(navSettings) {
      if (document.getElementById('cliqlabs-nav-item')) return;

      var menuItem = document.createElement('a');
      menuItem.id = 'cliqlabs-nav-item';
      menuItem.href = '#';
      menuItem.className = 'w-full group px-3 flex items-center justify-start text-sm font-medium rounded-md cursor-pointer py-2 md:py-2';
      menuItem.style.cssText = 'opacity:0.85; transition:opacity 0.2s; text-decoration:none;';
      menuItem.innerHTML = `
        <span style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;font-family:Inter,sans-serif;width:100%;">
          <span style="font-size:16px;">⚡</span>
          <span class="nav-title">CliqLabs</span>
          <span style="background:#673de6;color:white;font-size:9px;font-weight:800;padding:2px 5px;border-radius:3px;margin-left:auto;">NEW</span>
        </span>
      `;

      menuItem.addEventListener('mouseenter', function() { this.style.opacity='1'; });
      menuItem.addEventListener('mouseleave', function() { this.style.opacity='0.85'; });
      menuItem.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (panelOpen) {
          closePanel();
        } else {
          openPanel();
        }
      });

      navSettings.parentNode.insertBefore(menuItem, navSettings);
    });
  }

  // Open panel ONLY in main content area
  function openPanel() {
    if (document.getElementById('cliqlabs-iframe-wrapper')) return;
    panelOpen = true;

    // Find GHL main content wrapper
    var mainWrapper = document.querySelector('.w-full.h-full') ||
                      document.querySelector('.hl_wrapper--inner') ||
                      document.querySelector('#app > .flex > div:last-child');

    if (!mainWrapper) return;

    // Hide existing content
    mainWrapper.style.display = 'none';

    // Create iframe wrapper
    var wrapper = document.createElement('div');
    wrapper.id = 'cliqlabs-iframe-wrapper';
    wrapper.style.cssText = `
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 160px;
      z-index: 9000;
      background: white;
    `;

    var iframe = document.createElement('iframe');
    iframe.id = 'cliqlabs-iframe';
    iframe.src = PANEL_URL;
    iframe.style.cssText = 'width:100%;height:100%;border:none;';

    wrapper.appendChild(iframe);
    document.body.appendChild(wrapper);

    // Listen for messages from panel
    window.addEventListener('message', handleMessage);

    // Close when any other GHL nav item clicked
    document.querySelectorAll('a[id^="sb_"]').forEach(function(link) {
      link.addEventListener('click', closePanel);
    });
  }

  // Close panel
  function closePanel() {
    panelOpen = false;
    var wrapper = document.getElementById('cliqlabs-iframe-wrapper');
    if (wrapper) wrapper.remove();

    // Restore GHL content
    var mainWrapper = document.querySelector('.w-full.h-full') ||
                      document.querySelector('.hl_wrapper--inner') ||
                      document.querySelector('#app > .flex > div:last-child');
    if (mainWrapper) mainWrapper.style.display = '';

    window.removeEventListener('message', handleMessage);
  }

  // Handle messages from panel iframe
  function handleMessage(e) {
    if (!e.data) return;

    if (e.data.type === 'cliqlabs-get-accounts') {
      sendSubAccounts();
    }

    if (e.data.type === 'cliqlabs-apply-theme') {
      applyThemeCSS(e.data.settings);
      localStorage.setItem('cliqlabs_settings', JSON.stringify(e.data.settings));
    }

    if (e.data.type === 'cliqlabs-close-panel') {
      closePanel();
    }
  }

  // Read sub-accounts from GHL DOM
  function sendSubAccounts() {
    var iframe = document.getElementById('cliqlabs-iframe');
    if (!iframe) return;

    // Try to get sub-accounts from GHL's sub-accounts page data
    var accounts = [];

    // Method 1: Read from GHL sub-accounts list if visible
    var subAccountLinks = document.querySelectorAll('[data-location-id]');
    subAccountLinks.forEach(function(el) {
      accounts.push({
        id: el.getAttribute('data-location-id'),
        name: el.textContent.trim(),
        active: true
      });
    });

    // Method 2: Read from window.__GHL__ or similar global
    if (accounts.length === 0 && window.__app) {
      try {
        var locations = window.__app.$store.state.agency.locations;
        if (locations) {
          locations.forEach(function(loc) {
            accounts.push({
              id: loc.id || loc._id,
              name: loc.name,
              active: true
            });
          });
        }
      } catch(e) {}
    }

    // Method 3: Try fetching from GHL internal API using existing auth
    if (accounts.length === 0) {
      var companyId = null;

      // Try to get company ID from URL or meta
      var urlMatch = window.location.href.match(/companyId=([^&]+)/);
      if (urlMatch) companyId = urlMatch[1];

      // Try from local storage
      if (!companyId) {
        try {
          var keys = Object.keys(localStorage);
          keys.forEach(function(key) {
            var val = localStorage.getItem(key);
            if (val && val.includes('"companyId"')) {
              var parsed = JSON.parse(val);
              if (parsed.companyId) companyId = parsed.companyId;
            }
          });
        } catch(e) {}
      }

      if (companyId) {
        // Send company ID to panel so it knows who this is
        iframe.contentWindow.postMessage({
          type: 'cliqlabs-load-accounts',
          accounts: [],
          companyId: companyId,
          message: 'Go to Sub-Accounts page in GHL first, then reopen CliqLabs'
        }, '*');
        return;
      }
    }

    // Send accounts to iframe
    iframe.contentWindow.postMessage({
      type: 'cliqlabs-load-accounts',
      accounts: accounts
    }, '*');
  }

  // Apply theme CSS to GHL
  function applyThemeCSS(settings) {
    var existing = document.getElementById('cliqlabs-theme-css');
    if (existing) existing.remove();

    var primary = settings.primaryColor || '#673de6';
    var sidebar = settings.sidebarColor || '#1a1a2e';
    var iconColor = settings.iconColor || '#ffffff';

    var css = `
      #sidebar-v2, .default-bg-color { background-color: ${sidebar} !important; }
      #sidebar-v2 a[id^="sb_"] .nav-title,
      #sidebar-v2 a[id^="sb_"] span { color: ${iconColor} !important; }
      #sidebar-v2 a[id^="sb_"].active,
      #sidebar-v2 a[id^="sb_"].exact-active {
        background: ${primary}22 !important;
        border-left: 3px solid ${primary} !important;
      }
      #location-switcher-sidbar-v2 { background: rgba(255,255,255,0.08) !important; border-radius: 8px !important; }
      #globalSearchOpener, #quickActions { background: rgba(255,255,255,0.08) !important; }
      .n-button--primary-type, .hr-button--primary-type { background-color: ${primary} !important; }
      a.topmenu-navitem.active { color: ${primary} !important; border-bottom-color: ${primary} !important; }
      .n-button--tertiary-type, .hr-button--tertiary-type { background-color: ${primary}22 !important; color: ${primary} !important; }
      .n-pagination-item--active { color: ${primary} !important; border-color: ${primary} !important; }
      #hl_header--help-icon { background-color: ${primary} !important; }
    `;

    var style = document.createElement('style');
    style.id = 'cliqlabs-theme-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Load saved theme on every page
  function loadSavedTheme() {
    var saved = localStorage.getItem('cliqlabs_settings');
    if (saved) {
      try { applyThemeCSS(JSON.parse(saved)); } catch(e) {}
    }
  }

  // Watch for GHL navigation changes (SPA)
  var lastUrl = location.href;
  new MutationObserver(function() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      // Close panel on navigation
      if (panelOpen) closePanel();
      setTimeout(injectSidebarMenu, 1500);
      loadSavedTheme();
    }
  }).observe(document, { subtree: true, childList: true });

  // INIT
  loadSavedTheme();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(injectSidebarMenu, 2000);
    });
  } else {
    setTimeout(injectSidebarMenu, 2000);
  }

})();
