(function () {

  console.log("CLIQ Panel Loaded");

  // Prevent duplicate panel
  if (document.getElementById("cliq-theme-panel")) return;

  const panel = document.createElement("div");

  panel.id = "cliq-theme-panel";

  panel.innerHTML = `

  <div style="
    position:fixed;
    top:120px;
    right:20px;
    z-index:999999999;
    background:#111;
    border:1px solid #333;
    border-radius:14px;
    padding:16px;
    width:220px;
    box-shadow:0 0 30px rgba(0,0,0,.35);
    font-family:Arial,sans-serif;
  ">

    <div style="
      font-size:18px;
      font-weight:700;
      color:#8dc63f;
      margin-bottom:14px;
    ">
      CLIQ Themes
    </div>

    <button data-theme="dpc" class="cliq-btn">
      DPC Theme
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

  // BUTTON STYLES
  const style = document.createElement("style");

  style.innerHTML = `

    .cliq-btn{
      width:100%;
      margin-bottom:10px;
      border:none;
      padding:12px;
      border-radius:10px;
      background:#8dc63f;
      color:#000;
      font-weight:700;
      cursor:pointer;
      transition:.2s;
    }

    .cliq-btn:hover{
      transform:translateY(-2px);
      opacity:.9;
    }

  `;

  document.head.appendChild(style);

  // SWITCH THEME
  panel.querySelectorAll(".cliq-btn").forEach(btn => {

    btn.addEventListener("click", function () {

      const theme = this.dataset.theme;

      localStorage.setItem("cliq_theme", theme);

      const oldTheme = document.getElementById("cliq-theme");

      if (oldTheme) {
        oldTheme.remove();
      }

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
