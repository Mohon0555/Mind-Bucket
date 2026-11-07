/* Mind Bucket cookie consent.
   Microsoft Clarity analytics is loaded only after a visitor chooses "Allow analytics".
   "No thanks" is just as easy, the choice can be changed at any time, and a browser's
   Global Privacy Control signal counts as "no". See /privacy for the full explanation. */
(function () {
  'use strict';
  var KEY = 'mindbucket.consent', VERSION = 1, CLARITY_ID = 'za116caklw';
  var gpc = navigator.globalPrivacyControl === true;
  var loaded = false, banner = null;

  function read() { try { var c = JSON.parse(localStorage.getItem(KEY) || 'null'); return c && c.v === VERSION ? c : null; } catch (e) { return null; } }
  function write(analytics) { try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: !!analytics, at: new Date().toISOString() })); } catch (e) {} }

  function loadClarity() {
    if (loaded) return; loaded = true;
    // Microsoft Clarity tag, as provided by Clarity.
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CLARITY_ID);
    // Tell Clarity this visitor allowed analytics. Mind Bucket shows no ads, so ad storage stays denied.
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  }
  function clearClarityCookies() {
    ['_clck', '_clsk'].forEach(function (n) {
      ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach(function (d) { document.cookie = n + '=; Max-Age=0; path=/' + d; });
    });
  }
  function stopClarity() {
    // Clarity deletes its cookies for this site and ends the session when consent is withdrawn.
    if (typeof window.clarity === 'function') window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    clearClarityCookies();
  }

  var saved = read();
  if (saved && saved.analytics && !gpc) loadClarity();
  else if (gpc || (saved && !saved.analytics)) clearClarityCookies();

  /* ---------- the notice ---------- */
  var CSS = '' +
    '.mbc{position:fixed;left:16px;bottom:calc(16px + var(--mbc-lift,0px) + env(safe-area-inset-bottom,0px));z-index:2147483000;width:min(440px,calc(100% - 32px));' +
    'box-sizing:border-box;padding:18px 18px 16px;border-radius:22px;background:var(--surface,#fff);color:var(--ink,#111);border:1px solid var(--line,#e2e2e2);' +
    'box-shadow:0 24px 60px -20px rgba(8,26,60,.45);font-family:"Urbanist",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:15px;font-weight:400;line-height:1.5;text-align:left}' +
    '.mbc h2{margin:0 0 6px;font-family:inherit;font-size:17px;font-weight:600;line-height:1.3}' +
    '.mbc p{margin:0;color:var(--ink-2,#4e4e4e)}' +
    '.mbc .mbc-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:14px}' +
    '.mbc button{flex:1 1 140px;height:42px;padding:0 16px;border-radius:999px;border:1.5px solid var(--ink,#111);background:var(--ink,#111);color:var(--canvas,#fff);font-family:inherit;font-size:15px;font-weight:600;line-height:1;cursor:pointer}' +
    '.mbc button:hover{opacity:.9}' +
    '.mbc button:focus-visible,.mbc a:focus-visible{outline:2px solid var(--ink,#111);outline-offset:3px}' +
    '.mbc a{display:inline-block;margin-top:10px;color:var(--ink,#111);font-weight:600}' +
    '.mbc .mbc-note{margin-top:10px;font-size:13px;color:var(--ink-3,#6b6b6b)}' +
    '@media (prefers-reduced-motion:no-preference){.mbc{animation:mbcIn .35s ease-out both}@keyframes mbcIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}}' +
    '@media print{.mbc{display:none}}';

  function hideBanner() { if (banner) { banner.remove(); banner = null; } }
  function showBanner(fromSettings) {
    hideBanner();
    if (!document.getElementById('mbc-css')) { var st = document.createElement('style'); st.id = 'mbc-css'; st.textContent = CSS; document.head.appendChild(st); }
    if (document.getElementById('dock')) document.documentElement.style.setProperty('--mbc-lift', '84px'); // clear the planner's quick-add bar
    var cur = read();
    banner = document.createElement('section');
    banner.className = 'mbc'; banner.setAttribute('aria-labelledby', 'mbc-title');
    banner.innerHTML =
      '<h2 id="mbc-title">Cookies and analytics</h2>' +
      '<p>Mind Bucket only stores what it needs to work, like your planner in this browser. With your OK, we also use Microsoft Clarity to see how people use the site, such as clicks and scrolling, so we can make it better. What you type in your planner is hidden from it.</p>' +
      (gpc ? '<p class="mbc-note">Your browser sends a Global Privacy Control signal, so analytics stays off.</p>' : '') +
      '<div class="mbc-row">' +
        '<button type="button" data-mbc="no">No thanks</button>' +
        (gpc ? '' : '<button type="button" data-mbc="yes">Allow analytics</button>') +
      '</div>' +
      (cur ? '<p class="mbc-note">Your current choice: analytics ' + (cur.analytics && !gpc ? 'allowed' : 'off') + '.</p>' : '') +
      '<a href="/privacy#cookies">Privacy &amp; cookies</a>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mbc]'); if (!b) return;
      api.set(b.getAttribute('data-mbc') === 'yes');
    });
    document.body.appendChild(banner);
    if (fromSettings) { var first = banner.querySelector('button'); if (first) first.focus(); }
  }

  var api = {
    /* { decided, analytics, gpc } */
    get: function () { var s = read(); return { decided: !!s, analytics: !!(s && s.analytics) && !gpc, gpc: gpc }; },
    set: function (allow) {
      allow = !!allow && !gpc;
      var wasLoaded = loaded;
      write(allow); hideBanner();
      if (allow) loadClarity();
      else clearClarityCookies(); // also removes any left from before this notice existed
      if (!allow && wasLoaded) { stopClarity(); setTimeout(function () { location.reload(); }, 150); return; } // reload so the analytics script is gone from this page too
      try { document.dispatchEvent(new CustomEvent('mb-consent', { detail: api.get() })); } catch (e) {}
    },
    open: function () { showBanner(true); }
  };
  window.MBConsent = api;

  function init() {
    if (!read() && !gpc) showBanner(false);
    document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('[data-consent-open]'); if (t) { e.preventDefault(); api.open(); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
