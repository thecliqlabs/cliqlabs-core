(function () {

  console.log("CLIQ Panel Loaded");

  // Prevent duplicate panel
  if (document.getElementById("cliq-theme-panel")) return;

  // PANEL
  const panel = document.createElement("div");

  panel.id = "cliq-theme-panel";

  panel.innerHTML = `

  <div class="cliq-panel-wrap">

    <div class="cliq-panel-title">
      CLIQLABS THEMES
    </div>

    <button data-theme="dpc" class="cliq-btn active">
      DPC Green Black
    </button>

    <button data-theme="glass" class="cliq-btn">
      Glass Theme
    </button>

    <button data-theme="midnight" class="cliq-btn">
      Midnight Theme
    </button>

  </div>

  `;

  document.body.appendChild(panel);

  // PANEL CSS
  const style = document.createElement("style");

  style.innerHTML = `

    .cliq-panel-wrap{

      position:fixed;
      top:120px;
      right:20px;

      width:240px;

      background:#050505;

      border:1px solid rgba(255,255,255,.08);

      border-radius:18px;

      padding:18px;

      z-index:999999999;

      box-shadow:
      0 10px 40px rgba(0,0,0,.35);

      backdrop-filter:blur(14px);

      font-family:Inter,sans-serif;

    }

    .cliq-panel-title{

      color:#8dc63f;

      font-size:14px;

      font-weight:700;

      letter-spacing:1px;

      margin-bottom:16px;

    }

    .cliq-btn{

      width:100%;

      border:none;

      padding:14px;

      margin-bottom:12px;

      border-radius:12px;

      cursor:pointer;

      transition:all .25s ease;

      font-weight:600;

      font-size:14px;

      background:#111;

      color:#d7d7d7;

      border:1px solid rgba(255,255,255,.05);

    }

    .cliq-btn:hover{

      transform:translateY(-2px);

      background:#161616;

      color:#8dc63f;

      border-color:rgba(141,198,63,.35);

    }

    .cliq-btn.active{

      background:
      linear-gradient(
        135deg,
        rgba(141,198,63,.20),
        rgba(141,198,63,.08)
      );

      color:#8dc63f;

      border-color:rgba(141,198,63,.45);

      box-shadow:
      0 0 20px rgba(141,198,63,.15);

    }

  `;

  document.head.appendChild(style);

  // SWITCH THEME
  panel.querySelectorAll(".cliq-btn").forEach(btn => {

    btn.addEventListener("click", function () {

      // ACTIVE STATE
      panel.querySelectorAll(".cliq-btn").forEach(b => {
        b.classList.remove("active");
      });

      this.classList.add("active");

      const theme = this.dataset.theme;

      // SAVE
      localStorage.setItem("cliq_theme", theme);

      // REMOVE OLD THEME
      const oldTheme = document.getElementById("cliq-theme");

      if (oldTheme) {
        oldTheme.remove();
      }

      // LOAD NEW THEME
      const link = document.createElement("link");

      link.id = "cliq-theme";

      link.rel = "stylesheet";

      link.href =
        "https://cdn.thecliqlabs.com/themes/" +
        theme +
        ".css?v=" +
        Date.now();

      document.head.appendChild(link);

      console.log("Theme Switched:", theme);

    });

  });

})();
