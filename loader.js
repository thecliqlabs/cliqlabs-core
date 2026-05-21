(() => {
  // Prevent duplicate loading
  if (window.cliqLabsLoaded) return;
  window.cliqLabsLoaded = true;

  // =========================
  // CONFIG
  // =========================

  const CDN = "https://cdn.thecliqlabs.com/themes/";

  const THEMES = [
    {
      name: "Dark Pro",
      file: "dark-pro.css"
    },
    {
      name: "Midnight",
      file: "midnight.css"
    },
    {
      name: "Glass",
      file: "glass.css"
    },
    {
      name: "Executive",
      file: "executive.css"
    }
  ];

  // =========================
  // THEME APPLY
  // =========================

  function applyTheme(file) {
    let link = document.getElementById("cliq-theme");

    if (!link) {
      link = document.createElement("link");
      link.id = "cliq-theme";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = `${CDN}${file}?v=${Date.now()}`;

    localStorage.setItem("cliq-theme", file);
  }

  // =========================
  // LOAD SAVED THEME ONLY
  // =========================

  const savedTheme = localStorage.getItem("cliq-theme");

  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // =========================
  // PANEL
  // =========================

  const panel = document.createElement("div");

  panel.id = "cliq-panel";

  panel.innerHTML = `
    <div class="cliq-header">
      <h2>CliqLabs</h2>
      <p>Runtime Branding System</p>
    </div>

    <div class="cliq-themes"></div>
  `;

  document.body.appendChild(panel);

  // =========================
  // THEME CARDS
  // =========================

  const themesWrap = panel.querySelector(".cliq-themes");

  THEMES.forEach(theme => {
    const card = document.createElement("div");

    card.className = "cliq-card";

    card.innerHTML = `
      <div class="cliq-preview"></div>
      <div class="cliq-bottom">
        <span>${theme.name}</span>
      </div>
    `;

    card.onclick = () => {
      applyTheme(theme.file);
    };

    themesWrap.appendChild(card);
  });

  // =========================
  // TOGGLE BUTTON
  // =========================

  const toggle = document.createElement("button");

  toggle.id = "cliq-toggle";

  toggle.innerHTML = "🎨";

  document.body.appendChild(toggle);

  toggle.onclick = () => {
    panel.classList.toggle("open");
  };

  // =========================
  // PANEL CSS
  // =========================

  const style = document.createElement("style");

  style.innerHTML = `
    #cliq-panel{
      position:fixed;
      top:0;
      right:-340px;
      width:340px;
      height:100vh;
      background:#071225;
      z-index:999999;
      transition:.3s ease;
      overflow:auto;
      border-left:1px solid rgba(255,255,255,.08);
      font-family:Inter,sans-serif;
    }

    #cliq-panel.open{
      right:0;
    }

    .cliq-header{
      padding:24px;
      border-bottom:1px solid rgba(255,255,255,.08);
    }

    .cliq-header h2{
      color:#fff;
      margin:0;
      font-size:28px;
      font-weight:700;
    }

    .cliq-header p{
      color:#94a3b8;
      margin-top:6px;
      font-size:13px;
    }

    .cliq-themes{
      padding:18px;
      display:flex;
      flex-direction:column;
      gap:18px;
    }

    .cliq-card{
      background:#0f172a;
      border:1px solid rgba(255,255,255,.06);
      border-radius:18px;
      overflow:hidden;
      cursor:pointer;
      transition:.25s;
    }

    .cliq-card:hover{
      transform:translateY(-3px);
      border-color:#3b82f6;
    }

    .cliq-preview{
      height:90px;
      background:linear-gradient(135deg,#020617,#1e293b);
    }

    .cliq-card:nth-child(2) .cliq-preview{
      background:linear-gradient(135deg,#000,#001d68);
    }

    .cliq-card:nth-child(3) .cliq-preview{
      background:linear-gradient(135deg,#7c3aed,#06b6d4);
    }

    .cliq-card:nth-child(4) .cliq-preview{
      background:linear-gradient(135deg,#000,#374151);
    }

    .cliq-bottom{
      padding:18px;
    }

    .cliq-bottom span{
      color:#fff;
      font-size:16px;
      font-weight:600;
    }

    #cliq-toggle{
      position:fixed;
      right:22px;
      bottom:22px;
      width:58px;
      height:58px;
      border:none;
      border-radius:50%;
      background:#0f172a;
      color:#fff;
      font-size:24px;
      cursor:pointer;
      z-index:999999;
      box-shadow:0 10px 30px rgba(0,0,0,.3);
    }
  `;

  document.head.appendChild(style);
})();
