/* ================================================
   TheCliqLabs — GHL Loader v1.0
   Paste in: GHL Agency Settings > Company > Custom JS
   ================================================ */
(function() {
  'use strict';

  // SVG icon injector for sidebar icons
  function loadSVGInjector(callback) {
    if (window.SVGInjector) { callback(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/svg-injector/1.1.3/svg-injector.min.js';
    s.onload = callback;
    document.head.appendChild(s);
  }

  // Inject SVG icons so CSS can color them
  function injectSVGIcons() {
    loadSVGInjector(function() {
      var nav = document.querySelector('nav');
      if (!nav) return;
      var icons = nav.querySelectorAll('img');
      icons.forEach(function(icon) {
        if (window.SVGInjector) SVGInjector(icon);
      });
    });
  }

  // Re-inject on GHL route changes
  window.addEventListener('routeChangeEvent', function(e) {
    if (e.detail && e.detail.to && e.detail.to.name === 'company-settings-v2') return;
    setTimeout(injectSVGIcons, 500);
    setTimeout(addSidebarMenu, 800);
  });

  // Add CliqLabs to GHL sidebar
  function addSidebarMenu() {
    if (document.getElementById('cliqlabs-nav-btn')) return;
    var nav = document.querySelector('.hl_nav-settings');
    if (!nav) return;

    var btn = document.createElement('a');
    btn.id = 'cliqlabs-nav-btn';
    btn.href = 'https://cdn.thecliqlabs.com';
    btn.target = '_blank';
    btn.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;text-decoration:none;opacity:0.85;transition:opacity 0.2s;width:100%;margin-top:5px;';
    btn.innerHTML = `
      <span style="font-size:16px;min-width:20px;text-align:center;">⚡</span>
      <span class="nav-title" style="font-size:14px;font-weight:600;font-family:Inter,sans-serif;">CliqLabs</span>
      <span style="background:#673de6;color:white;font-size:9px;font-weight:800;padding:2px 6px;border-radius:3px;margin-left:auto;">NEW</span>
    `;
    btn.addEventListener('mouseenter', function() { this.style.opacity='1'; });
    btn.addEventListener('mouseleave', function() { this.style.opacity='0.85'; });
    nav.parentNode.insertBefore(btn, nav);
  }

  // Wait for sidebar then inject
  function waitAndInject() {
    var interval = setInterval(function() {
      if (document.querySelector('.hl_nav-settings')) {
        clearInterval(interval);
        addSidebarMenu();
        injectSVGIcons();
      }
    }, 300);
    setTimeout(function() { clearInterval(interval); }, 15000);
  }

  // INIT
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(waitAndInject, 1500);
    });
  } else {
    setTimeout(waitAndInject, 1500);
  }

})();
