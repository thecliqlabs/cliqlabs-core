(function() {

  // Apply saved theme on load
  var saved = localStorage.getItem('cliqlabs_settings');
  if (saved) {
    try {
      var s = JSON.parse(saved);
      var style = document.createElement('style');
      style.id = 'cliqlabs-css';
      style.textContent = `
        #sidebar-v2, .default-bg-color { background-color: ${s.sidebar || '#1a1a2e'} !important; }
        .n-button--primary-type, .hr-button--primary-type { background-color: ${s.primary || '#673de6'} !important; }
        a.topmenu-navitem.active { color: ${s.primary || '#673de6'} !important; border-bottom-color: ${s.primary || '#673de6'} !important; }
      `;
      document.head.appendChild(style);
    } catch(e) {}
  }

  // Add CliqLabs to sidebar
  function addMenu() {
    if (document.getElementById('cliqlabs-btn')) return;
    var nav = document.querySelector('.hl_nav-settings');
    if (!nav) return;

    var btn = document.createElement('a');
    btn.id = 'cliqlabs-btn';
    btn.href = 'https://cdn.thecliqlabs.com';
    btn.target = '_blank';
    btn.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;text-decoration:none;opacity:0.85;';
    btn.innerHTML = `
      <span style="font-size:16px;">⚡</span>
      <span class="nav-title" style="font-size:14px;font-weight:600;font-family:Inter,sans-serif;">CliqLabs</span>
      <span style="background:#673de6;color:white;font-size:9px;font-weight:800;padding:2px 5px;border-radius:3px;margin-left:auto;">NEW</span>
    `;
    nav.parentNode.insertBefore(btn, nav);
  }

  setTimeout(addMenu, 2000);
  setInterval(addMenu, 3000);

})();
