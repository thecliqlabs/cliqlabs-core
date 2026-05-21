(function () {

  console.log("CLIQ Loader Started");

  // Prevent duplicate loading
  if (document.getElementById("cliq-theme-loader")) return;

  const marker = document.createElement("meta");
  marker.id = "cliq-theme-loader";
  document.head.appendChild(marker);

  // THEME
  const activeTheme =
    localStorage.getItem("cliq_theme") || "neon";

  // LOAD CSS
  function loadTheme(themeName) {

    const oldTheme = document.getElementById("cliq-theme");

    if (oldTheme) {
      oldTheme.remove();
    }

    const link = document.createElement("link");

    link.id = "cliq-theme";
    link.rel = "stylesheet";

    link.href =
      "https://cdn.thecliqlabs.com/themes/" +
      themeName +
      ".css?v=" +
      Date.now();

    document.head.appendChild(link);

    console.log("Theme Loaded:", themeName);
  }

  // LOAD PANEL
  function loadPanel() {

    if (document.getElementById("cliq-panel-script")) return;

    const script = document.createElement("script");

    script.id = "cliq-panel-script";

    script.src =
      "https://cdn.thecliqlabs.com/js/panel.js?v=" +
      Date.now();

    document.head.appendChild(script);
  }

  // INIT
  loadTheme(activeTheme);

  window.addEventListener("load", () => {
    loadPanel();
  });

})();
