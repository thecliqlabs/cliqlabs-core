(function() {
  'use strict';

  // TheCliqLabs Loader v1.0
  var AGENCY_ID = document.currentScript && 
    document.currentScript.src.split('id=')[1] || 'default';
  
  function waitForElement(selector, callback, maxWait) {
    var waited = 0;
    var interval = setInterval(function() {
      var el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        callback(el);
      }
      waited += 200;
      if (waited >= (maxWait || 10000)) {
        clearInterval(interval);
      }
    }, 200);
  }

  function injectSidebarMenu() {
    waitForElement('.hl_nav-settings', function(navSettings) {
      
      // Don't inject twice
      if (document.getElementById('cliqlabs-menu-item')) return;

      var menuItem = document.createElement('a');
      menuItem.id = 'cliqlabs-menu-item';
      menuItem.href = '#';
      menuItem.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          padding: 8px 12px;
          cursor: pointer;
          opacity: 0.85;
          transition: opacity 0.2s;
        ">
          <img 
            src="https://cdn.thecliqlabs.com/assets/icon.png" 
            style="width:20px; height:20px; margin-right:8px; border-radius:3px;"
            onerror="this.style.display='none'"
          />
          <span style="
            font-size: 14px;
            font-weight: 600;
            font-family: Inter, sans-serif;
          ">CliqLabs</span>
        </div>
      `;

      menuItem.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
      });
      menuItem.addEventListener('mouseleave', function() {
        this.style.opacity = '0.85';
      });

      menuItem.addEventListener('click', function(e) {
        e.preventDefault();
        openControlPanel();
      });

      navSettings.parentNode.insertBefore(menuItem, navSettings);
    });
  }

  function openControlPanel() {
    // Don't open twice
    if (document.getElementById('cliqlabs-panel')) return;

    var overlay = document.createElement('div');
    overlay.id = 'cliqlabs-panel';
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.5);
    `;

    var panel = document.createElement('div');
    panel.style.cssText = `
      width: 900px;
      max-width: 95vw;
      height: 85vh;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
    `;

    var header = document.createElement('div');
    header.style.cssText = `
      background: #0a0a0a;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    header.innerHTML = `
      <span style="color:white; font-weight:900; font-size:18px; font-family:Arial Black, sans-serif;">
        TheCliq<span style="color:#5fc800;">Labs</span>
      </span>
      <button id="cliqlabs-close" style="
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
        padding: 0 4px;
      ">×</button>
    `;

    var iframe = document.createElement('iframe');
    iframe.src = 'https://thecliqlabs.netlify.app?agency=' + AGENCY_ID;
    iframe.style.cssText = `
      width: 100%;
      flex: 1;
      border: none;
    `;

    panel.appendChild(header);
    panel.appendChild(iframe);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    document.getElementById('cliqlabs-close').addEventListener('click', function() {
      overlay.remove();
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  // Wait for GHL to fully load then inject
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSidebarMenu);
  } else {
    setTimeout(injectSidebarMenu, 2000);
  }

  // Re-inject on GHL navigation (it's a SPA)
  var lastUrl = location.href;
  new MutationObserver(function() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(injectSidebarMenu, 1500);
    }
  }).observe(document, { subtree: true, childList: true });

})();
