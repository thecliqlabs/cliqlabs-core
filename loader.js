/* ================================================
   TheCliqLabs Loader v3.0
   Embedded Runtime Panel Version
   ================================================ */

/* SVG Injector */
(function() {
  var script = document.createElement('script');

  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/svg-injector/1.1.3/svg-injector.min.js';

  script.integrity =
    'sha512-LpKoEmPyokcDYSjRJ/7WgybgdAYFsKtCrGC9m+VBwcefe1vHXyUnD9fTQb3nXVJda6ny1J84UR+iBtEYm3OQmQ==';

  script.crossOrigin = 'anonymous';

  document.head.appendChild(script);
})();

/* Re-inject SVG icons on every GHL page navigation */
window.addEventListener('routeChangeEvent', function(e) {

  if (
    e.detail &&
    e.detail.to &&
    e.detail.to.name === 'company-settings-v2'
  ) return;

  var navIconInterval = setInterval(function() {

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

/* ================================================
   Add CliqLabs Sidebar Menu
   ================================================ */

function addCliqLabsMenu() {

  if (document.getElementById('cliqlabs-nav-btn')) return;

  var nav = document.querySelector('.hl_nav-settings');

  if (!nav) return;

  var btn = document.createElement('a');

  btn.id = 'cliqlabs-nav-btn';

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
    'margin-top:5px',
    'color:white',
    'font-family:Inter,sans-serif'
  ].join(';');

  btn.innerHTML = [
    '<span style="font-size:16px;min-width:20px;text-align:center;">⚡</span>',
    '<span class="nav-title" style="font-size:14px;font-weight:600;">CliqLabs</span>',
    '<span style="background:#673de6;color:white;font-size:9px;font-weight:800;padding:2px 6px;border-radius:3px;margin-left:auto;">NEW</span>'
  ].join('');

  btn.onmouseenter = function() {
    this.style.opacity = '1';
  };

  btn.onmouseleave = function() {
    this.style.opacity = '0.85';
  };

  btn.onclick = function() {
    openCliqLabsPanel();
  };

  nav.parentNode.insertBefore(btn, nav);
}

/* ================================================
   Open Embedded Panel
   ================================================ */

function openCliqLabsPanel() {

  if (document.getElementById('cliqlabs-panel')) return;

  /* Overlay */
  var overlay = document.createElement('div');

  overlay.id = 'cliqlabs-overlay';

  overlay.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.45);
    z-index:999999;
    backdrop-filter:blur(2px);
  `;

  overlay.onclick = closeCliqLabsPanel;

  /* Panel */
  var panel = document.createElement('div');

  panel.id = 'cliqlabs-panel';

  panel.style.cssText = `
    position:fixed;
    top:0;
    right:0;
    width:540px;
    max-width:100%;
    height:100vh;
    background:#ffffff;
    z-index:1000000;
    box-shadow:-10px 0 30px rgba(0,0,0,0.25);
    overflow:hidden;
    animation:cliqSlideIn .25s ease;
    border-top-left-radius:18px;
    border-bottom-left-radius:18px;
  `;

  panel.innerHTML = `
    <div style="
      height:64px;
      background:#111827;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 20px;
      color:white;
      font-family:Inter,sans-serif;
      font-weight:700;
      font-size:16px;
    ">

      <div style="
        display:flex;
        align-items:center;
        gap:10px;
      ">
        <span style="font-size:20px;">⚡</span>
        <span>TheCliqLabs</span>
      </div>

      <button id="close-cl-panel" style="
        background:none;
        border:none;
        color:white;
        font-size:26px;
        cursor:pointer;
      ">×</button>
    </div>

    <iframe
      src="https://cdn.thecliqlabs.com"
      style="
        width:100%;
        height:calc(100vh - 64px);
        border:none;
        background:#ffffff;
      "
    ></iframe>
  `;

  document.body.appendChild(overlay);

  document.body.appendChild(panel);

  document
    .getElementById('close-cl-panel')
    .onclick = closeCliqLabsPanel;

  /* Animation */
  if (!document.getElementById('cliqlabs-anim-style')) {

    var style = document.createElement('style');

    style.id = 'cliqlabs-anim-style';

    style.innerHTML = `
      @keyframes cliqSlideIn {
        from {
          transform:translateX(100%);
        }
        to {
          transform:translateX(0);
        }
      }
    `;

    document.head.appendChild(style);
  }
}

/* ================================================
   Close Panel
   ================================================ */

function closeCliqLabsPanel() {

  var panel = document.getElementById('cliqlabs-panel');

  var overlay = document.getElementById('cliqlabs-overlay');

  if (panel) panel.remove();

  if (overlay) overlay.remove();
}

/* ================================================
   Wait For Sidebar Then Inject
   ================================================ */

var menuInterval = setInterval(function() {

  if (document.querySelector('.hl_nav-settings')) {

    clearInterval(menuInterval);

    addCliqLabsMenu();
  }

}, 300);

setTimeout(function() {
  clearInterval(menuInterval);
}, 15000);
