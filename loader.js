/* ================================================
   CliqLabs Runtime Loader v7
   GitHub Pages Edition
   ================================================ */

(function () {

  /* ================================================
     Inject CSS
     ================================================ */

  const cliqStyle = document.createElement('link');

  cliqStyle.rel = 'stylesheet';

  cliqStyle.href =
    'https://thecliqlabs.github.io/cliqlabs-core/theme.css?v=7';

  document.head.appendChild(cliqStyle);

  /* ================================================
     APPLY THEMES
     ================================================ */

  function applyCliqLabsTheme(theme) {

    const root = document.documentElement;

    const themes = {

      purple: {
        sidebar: '#581c87',
        text: '#ffffff',
        icon: '#ffffff',
        button: '#7c3aed',
        card: '#6d28d9'
      },

      blue: {
        sidebar: '#0f172a',
        text: '#ffffff',
        icon: '#38bdf8',
        button: '#0284c7',
        card: '#0369a1'
      },

      green: {
        sidebar: '#052e16',
        text: '#ffffff',
        icon: '#4ade80',
        button: '#16a34a',
        card: '#15803d'
      },

      dark: {
        sidebar: '#111827',
        text: '#ffffff',
        icon: '#9ca3af',
        button: '#374151',
        card: '#1f2937'
      }

    };

    const selected = themes[theme];

    if (!selected) return;

    root.style.setProperty('--cliqlabs-sidebar', selected.sidebar);
    root.style.setProperty('--cliqlabs-text', selected.text);
    root.style.setProperty('--cliqlabs-icon', selected.icon);
    root.style.setProperty('--cliqlabs-button', selected.button);
    root.style.setProperty('--cliqlabs-card', selected.card);

    localStorage.setItem(
      'cliqlabs-theme',
      theme
    );

  }

  /* ================================================
     LOAD SAVED THEME
     ================================================ */

  window.addEventListener('load', function () {

    const savedTheme =
      localStorage.getItem('cliqlabs-theme');

    if (savedTheme) {
      applyCliqLabsTheme(savedTheme);
    }

  });

  /* ================================================
     LISTEN FROM PANEL
     ================================================ */

  window.addEventListener('message', function (event) {

    if (
      event.data &&
      event.data.type === 'CLIQLABS_APPLY_THEME'
    ) {

      applyCliqLabsTheme(event.data.theme);

    }

  });

  /* ================================================
     OPEN PANEL
     ================================================ */

  function openCliqLabsPanel() {

    if (document.getElementById('cliqlabs-panel')) return;

    const overlay = document.createElement('div');

    overlay.id = 'cliqlabs-overlay';

    overlay.style.cssText = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.45);
      z-index:999999;
      backdrop-filter:blur(2px);
    `;

    overlay.onclick = closeCliqLabsPanel;

    const panel = document.createElement('div');

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
        src="https://thecliqlabs.github.io/cliqlabs-core/"
        style="
          width:100%;
          height:100%;
          border:none;
          background:white;
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
     ADD SIDEBAR BUTTON
     ================================================ */

  function addCliqLabsButton() {

    if (document.getElementById('cliqlabs-nav-btn')) return;

    const nav =
      document.querySelector('#sidebar-v2 nav');

    if (!nav) return;

    const btn = document.createElement('a');

    btn.id = 'cliqlabs-nav-btn';

    btn.style.cssText = `
      display:flex;
      align-items:center;
      gap:10px;
      width:100%;
      padding:10px 14px;
      margin-top:6px;
      border-radius:12px;
      cursor:pointer;
      text-decoration:none;
      color:white;
      font-family:Inter,sans-serif;
      transition:all .2s ease;
      opacity:.92;
    `;

    btn.innerHTML = `
      <span style="font-size:16px;">⚡</span>

      <span style="
        font-size:14px;
        font-weight:600;
        flex:1;
      ">
        CliqLabs
      </span>

      <span style="
        background:#7c3aed;
        color:white;
        font-size:9px;
        font-weight:800;
        padding:2px 6px;
        border-radius:5px;
      ">
        NEW
      </span>
    `;

    btn.onclick = function () {
      openCliqLabsPanel();
    };

    nav.appendChild(btn);

  }

  /* ================================================
     INIT
     ================================================ */

  const initInterval = setInterval(function () {

    const sidebar =
      document.querySelector('#sidebar-v2 nav');

    if (sidebar) {

      clearInterval(initInterval);

      addCliqLabsButton();

    }

  }, 500);

})();
