(function () {
  console.log("CliqLabs Runtime Loaded");

  // Prevent duplicate loading
  if (window.cliqLabsLoaded) return;
  window.cliqLabsLoaded = true;

  // Inject base CSS
  const baseCSS = document.createElement("link");
  baseCSS.rel = "stylesheet";
  baseCSS.href = "https://cdn.thecliqlabs.com/theme.css?v=" + Date.now();
  document.head.appendChild(baseCSS);

  // Inject saved theme
  const savedTheme =
    localStorage.getItem("cliq-theme") || "dark-pro";

  const themeCSS = document.createElement("link");
  themeCSS.rel = "stylesheet";
  themeCSS.id = "cliq-theme-style";
  themeCSS.href =
    "https://cdn.thecliqlabs.com/themes/" +
    savedTheme +
    ".css?v=" +
    Date.now();

  document.head.appendChild(themeCSS);

  // Floating Button
  const btn = document.createElement("div");
  btn.id = "cliqlabs-floating-btn";
  btn.innerHTML = "🎨";
  document.body.appendChild(btn);

  // Panel
  const panel = document.createElement("div");
  panel.id = "cliqlabs-panel";

  panel.innerHTML = `
    <div class="cliq-header">
      <h2>CliqLabs</h2>
      <span>Runtime Branding System</span>
    </div>

    <div class="cliq-theme-list">

      <div class="cliq-theme-card" data-theme="dark-pro">
        <div class="cliq-preview dark-pro-preview"></div>
        <h3>Dark Pro</h3>
      </div>

      <div class="cliq-theme-card" data-theme="midnight">
        <div class="cliq-preview midnight-preview"></div>
        <h3>Midnight</h3>
      </div>

      <div class="cliq-theme-card" data-theme="glass">
        <div class="cliq-preview glass-preview"></div>
        <h3>Glass</h3>
      </div>

      <div class="cliq-theme-card" data-theme="executive">
        <div class="cliq-preview executive-preview"></div>
        <h3>Executive</h3>
      </div>

    </div>
  `;

  document.body.appendChild(panel);

  // Toggle Panel
  btn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  // Theme Switch
  document.querySelectorAll(".cliq-theme-card").forEach((card) => {
    card.addEventListener("click", () => {
      const theme = card.dataset.theme;

      localStorage.setItem("cliq-theme", theme);

      document.getElementById(
        "cliq-theme-style"
      ).href =
        "https://cdn.thecliqlabs.com/themes/" +
        theme +
        ".css?v=" +
        Date.now();
    });
  });
})();
