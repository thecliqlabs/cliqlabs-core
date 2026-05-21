/* ================================================
   TheCliqLabs Runtime Loader v4.0
   Live Theme Engine
   ================================================ */

/* SVG Injector */
(function() {

  var script = document.createElement('script');

  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/svg-injector/1.1.3/svg-injector.min.js';

  document.head.appendChild(script);

})();

/* ================================================
   Runtime Theme Variables
   ================================================ */

function applyCliqTheme(theme) {

  const root = document.documentElement;

  if (theme === 'purple') {

    root.style.setProperty('--nav-menus-background-color', '#581c87');
    root.style.setProperty('--nav-menu-text-color', '#ffffff');
    root.style.setProperty('--nav-menu-icon-color', '#ffffff');
    root.style.setProperty('--button-background-color', '#7c3aed');
    root.style.setProperty('--card-header-background-color', '#6d28d9');

  }

  if (theme === 'blue') {

    root.style.setProperty('--nav-menus-background-color', '#0f172a');
    root.style.setProperty('--nav-menu-text-color', '#ffffff');
    root.style.setProperty('--nav-menu-icon-color', '#38bdf8');
    root.style.setProperty('--button-background-color', '#0284c7');
    root.style.setProperty('--card-header-background-color', '#0369a1');

  }

  if (theme === 'green') {

    root.style.setProperty('--nav-menus-background-color', '#052e16');
    root.style.setProperty('--nav-menu-text-color', '#ffffff');
    root.style.setProperty('--nav-menu-icon-color', '#4ade80');
    root.style.setProperty('--button-background-color', '#16a34a');
    root.style.setProperty('--card-header-background-color', '#15803d');

  }

  if (theme === 'dark') {

    root.style.setProperty('--nav-menus-background-color', '#111827');
    root.style.setProperty('--nav-menu-text-color', '#ffffff');
    root.style.setProperty('--nav-menu-icon-color', '#9ca3af');
    root.style.setProperty('--button-background-color', '#374151');
    root.style.setProperty('--card-header-background-color', '#1f2937');

  }

  localStorage.setItem(
    'cliqlabs-theme',
    theme
  );
}

/* ================================================
   Load Saved Theme
   ================================================ */

window.addEventListener('load', function() {

  const savedTheme =
    localStorage.getItem('cliqlabs-theme');

  if (savedTheme) {
    applyCliqTheme(savedTheme);
  }

});

/* ================================================
   Listen From iframe
   ================================================ */

window.addEventListener('message', function(event) {

  if (
    event.data &&
    event.data.type === 'APPLY_THEME'
  ) {

    applyCliqTheme(event.data.theme);

  }

});

/* ================================================
   Add Sidebar Button
   ================================================ */

function addCliqLabsMenu() {

  if (document.getElementById('cliqlabs-nav-btn')) return;

  var nav = document.querySelector('.hl_nav-settings');

  if (!nav) return;

  var btn = document.createElement('a');

  btn.id = 'cliqlabs-nav-btn';

  btn.style.cssText = `
    display:flex;
    align-items:center;
    gap:8px;
    padding:8px 12px;
    cursor:pointer;
    text-decoration:none;
    opacity:0.9;
    width:100%;
    margin-top:5px;
    color:inherit;
    border-radius:10px;
    font-family:Inter,sans-serif;
  `;

  btn.innerHTML = `
    <span style="font-size:16px;">⚡</span>

    <span style="
      font-size:14px;
      font-weight:600;
      display:inline-block;
    ">
      CliqLabs
    </span>

    <span style="
      background:#7c3aed;
      color:white;
      font-size:9px;
      font-weight:800;
      padding:2px 6px;
      border-radius:4px;
      margin-left:auto;
    ">
      NEW
    </span>
  `;

  btn.onclick = function() {
    openCliqLabsPanel();
  };

  nav.parentNode.insertBefore(btn, nav);
}

/* ================================================
   Open Panel
   ================================================ */

function openCliqLabsPanel() {

  if (document.getElementById('cliqlabs-panel')) return;

  var overlay = document.createElement('div');

  overlay.id = 'cliqlabs-overlay';

  overlay.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.45);
    z-index:999999;
  `;

  overlay.onclick = closeCliqLabsPanel;

  var panel = document.createElement('div');

  panel.id = 'cliqlabs-panel';

  panel.style.cssText = `
    position:fixed;
    top:0;
    right:0;
    width:540px;
    max-width:100%;
    height:100vh;
    background:white;
    z-index:1000000;
    overflow:hidden;
    box-shadow:-10px 0 30px rgba(0,0,0,0.2);
  `;

  panel.innerHTML = `
    <iframe
      src="https://cdn.thecliqlabs.com"
      style="
        width:100%;
        height:100%;
        border:none;
      "
    ></iframe>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);
}

function closeCliqLabsPanel() {

  const panel =
    document.getElementById('cliqlabs-panel');

  const overlay =
    document.getElementById('cliqlabs-overlay');

  if (panel) panel.remove();
  if (overlay) overlay.remove();
}

/* ================================================
   Init
   ================================================ */

var menuInterval = setInterval(function() {

  if (document.querySelector('.hl_nav-settings')) {

    clearInterval(menuInterval);

    addCliqLabsMenu();
  }

}, 300);
