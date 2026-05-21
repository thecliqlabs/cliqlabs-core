(function () {

  if (window.cliqlabsLoaded) return;
  window.cliqlabsLoaded = true;

  const THEMES = [
    {
      id: "midnight",
      name: "Midnight",
      file: "https://cdn.thecliqlabs.com/themes/midnight.css"
    },
    {
      id: "glass",
      name: "Glass",
      file: "https://cdn.thecliqlabs.com/themes/glass.css"
    },
    {
      id: "executive",
      name: "Executive",
      file: "https://cdn.thecliqlabs.com/themes/executive.css"
    },
    {
      id: "dark-pro",
      name: "Dark Pro",
      file: "https://cdn.thecliqlabs.com/themes/dark-pro.css"
    }
  ];

  function removeThemes() {
    document.querySelectorAll(".cliqlabs-theme").forEach(el => el.remove());
  }

  function applyTheme(url) {
    removeThemes();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url + "?v=" + Date.now();
    link.className = "cliqlabs-theme";

    document.head.appendChild(link);
  }

  function createButton() {

    const btn = document.createElement("div");

    btn.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        gap:10px;
        font-size:14px;
        font-weight:600;
      ">
        <span style="font-size:16px;">✦</span>
        <span>CliqLabs</span>
      </div>
    `;

    btn.style.cssText = `
      position:fixed;
      left:14px;
      bottom:110px;
      z-index:999999;
      background:#111827;
      color:white;
      padding:12px 16px;
      border-radius:12px;
      cursor:pointer;
      box-shadow:0 10px 30px rgba(0,0,0,0.25);
      font-family:Inter,sans-serif;
      transition:all .2s ease;
    `;

    btn.onmouseenter = () => {
      btn.style.transform = "translateY(-2px)";
    };

    btn.onmouseleave = () => {
      btn.style.transform = "translateY(0)";
    };

    document.body.appendChild(btn);

    return btn;
  }

  function createPanel() {

    const panel = document.createElement("div");

    panel.id = "cliqlabs-panel";

    panel.style.cssText = `
      position:fixed;
      top:0;
      right:-420px;
      width:400px;
      height:100vh;
      background:#ffffff;
      z-index:999999;
      transition:all .3s ease;
      overflow-y:auto;
      box-shadow:-10px 0 40px rgba(0,0,0,0.15);
      font-family:Inter,sans-serif;
    `;

    panel.innerHTML = `
      <div style="
        padding:24px;
        border-bottom:1px solid #e5e7eb;
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        <div>
          <div style="
            font-size:24px;
            font-weight:700;
            color:#111827;
          ">
            CliqLabs
          </div>

          <div style="
            color:#6b7280;
            margin-top:4px;
            font-size:14px;
          ">
            Premium GoHighLevel Themes
          </div>
        </div>

        <div id="cliqlabs-close"
          style="
            cursor:pointer;
            font-size:24px;
            color:#6b7280;
          ">
          ×
        </div>
      </div>

      <div id="cliqlabs-theme-list"
        style="
          padding:20px;
          display:flex;
          flex-direction:column;
          gap:20px;
        ">
      </div>
    `;

    document.body.appendChild(panel);

    return panel;
  }

  function addThemes() {

    const container = document.getElementById("cliqlabs-theme-list");

    THEMES.forEach(theme => {

      const card = document.createElement("div");

      card.style.cssText = `
        border:1px solid #e5e7eb;
        border-radius:18px;
        overflow:hidden;
        background:white;
      `;

      card.innerHTML = `
        <div style="
          height:120px;
          background:#111827;
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-size:24px;
          font-weight:700;
        ">
          ${theme.name}
        </div>

        <div style="padding:18px;">

          <div style="
            font-size:18px;
            font-weight:600;
            color:#111827;
          ">
            ${theme.name}
          </div>

          <div style="
            color:#6b7280;
            font-size:14px;
            margin-top:6px;
          ">
            Professional dashboard styling.
          </div>

          <button
            style="
              margin-top:16px;
              width:100%;
              height:48px;
              border:none;
              border-radius:12px;
              background:#111827;
              color:white;
              font-size:15px;
              font-weight:600;
              cursor:pointer;
            "
          >
            Apply Theme
          </button>

        </div>
      `;

      card.querySelector("button").onclick = () => {
        applyTheme(theme.file);
      };

      container.appendChild(card);

    });

  }

  const button = createButton();
  const panel = createPanel();

  addThemes();

  button.onclick = () => {
    panel.style.right = "0";
  };

  document.getElementById("cliqlabs-close").onclick = () => {
    panel.style.right = "-420px";
  };

})();
