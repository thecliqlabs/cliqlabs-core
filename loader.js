/* ================================================
   TheCliqLabs Loader v2.0
   Paste in: GHL Agency Settings > Company > Custom JS
   ================================================ */

/* SVG Injector — converts IMG icons to SVG for CSS coloring */
(function() {
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/svg-injector/1.1.3/svg-injector.min.js';
  script.integrity = 'sha512-LpKoEmPyokcDYSjRJ/7WgybgdAYFsKtCrGC9m+VBwcefe1vHXyUnD9fTQb3nXVJda6ny1J84UR+iBtEYm3OQmQ==';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
})();

/* Re-inject SVG icons on every GHL page navigation */
window.addEventListener('routeChangeEvent', function(e) {
  if (e.detail && e.detail.to && e.detail.to.name === 'company-settings-v2') return;

  var navIconInterval = setInterval(function() {
    var navSVG = document.querySelectorAll('#sidebar-v2 nav svg');
    if (navSVG === true) return;

    var nav = document.querySelectorAll('nav')[0];
    if (!nav) return;

    var navIcons = nav.querySelectorAll('nav img');
    var iconsArray = Array.from(navIcons);

    if (iconsArray.length !== 0 && window.SVGInjector) {
      clearInterval(navIconInterval);
      iconsArray.forEach(function(icon) {
        SVGInjector(icon);
      });
      /* Re-add CliqLabs menu after navigation */
      setTimeout(addCliqLabsMenu, 300);
    }
  }, 200);
});

/* Add CliqLabs menu item to GHL sidebar */
function addCliqLabsMenu() {
  if (document.getElementById('cliqlabs-nav-btn')) return;
  var nav = document.querySelector('.hl_nav-settings');
  if (!nav) return;

  var btn = document.createElement('a');
  btn.id = 'cliqlabs-nav-btn';
  btn.href = 'https://cdn.thecliqlabs.com';
  btn.target = '_blank';
  btn.style.cssText = [
    'display:flex',
    'align-items:center',
    'gap:8px',
    'padding:8px 12px',
    'cursor:pointer',
    'text-decoration:none',
    'opacity:0.85',
    'transition:opacity 0.2s',
    'width:100%',
    'margin-top:5px'
  ].join(';');

  btn.innerHTML = [
    '<span style="font-size:16px;min-width:20px;text-align:center;">⚡</span>',
    '<span class="nav-title" style="font-size:14px;font-weight:600;font-family:Inter,sans-serif;">CliqLabs</span>',
    '<span style="background:#673de6;color:white;font-size:9px;font-weight:800;padding:2px 6px;border-radius:3px;margin-left:auto;letter-spacing:0.5px;">NEW</span>'
  ].join('');

  btn.onmouseenter = function() { this.style.opacity = '1'; };
  btn.onmouseleave = function() { this.style.opacity = '0.85'; };
  nav.parentNode.insertBefore(btn, nav);
}

/* Wait for sidebar to load then inject */
var menuInterval = setInterval(function() {
  if (document.querySelector('.hl_nav-settings')) {
    clearInterval(menuInterval);
    addCliqLabsMenu();
  }
}, 300);

setTimeout(function() { clearInterval(menuInterval); }, 15000);
