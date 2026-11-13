/* PawGuard home: ingredient pop-up + quiz teaser */
(function () {
  if (window.__pawguardHomeInit) return; // script tag appears in several sections
  window.__pawguardHomeInit = true;
  function initIngredients(root) {
    root.querySelectorAll('[data-pgh-ingr]').forEach(function (sec) {
      var dlg = sec.querySelector('dialog');
      var btns = Array.prototype.slice.call(sec.querySelectorAll('[data-ing]'));
      if (!dlg || !dlg.showModal || !btns.length) return;
      var idx = 0;
      function show(i) {
        idx = (i + btns.length) % btns.length;
        var b = btns[idx];
        var img = dlg.querySelector('[data-dlg-img]');
        var src = b.getAttribute('data-img');
        img.hidden = !src;
        if (src) img.querySelector('img').src = src;
        dlg.querySelector('[data-dlg-tag]').textContent = b.getAttribute('data-tag');
        dlg.querySelector('[data-dlg-name]').textContent = b.getAttribute('data-name');
        dlg.querySelector('[data-dlg-text]').textContent = b.getAttribute('data-text');
        if (!dlg.open) dlg.showModal();
      }
      btns.forEach(function (b, i) { b.addEventListener('click', function () { show(i); }); });
      dlg.querySelector('[data-dlg-next]').addEventListener('click', function () { show(idx + 1); });
      dlg.querySelector('[data-dlg-x]').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    });
  }
  function initQuiz(root) {
    root.querySelectorAll('[data-pgh-qz]').forEach(function (card) {
      var go = card.querySelector('[data-qz-go]');
      var base = go.getAttribute('href');
      card.querySelectorAll('[data-qz-opt]').forEach(function (b) {
        b.addEventListener('click', function () {
          var on = b.getAttribute('aria-pressed') !== 'true';
          var picked = card.querySelectorAll('[data-qz-opt][aria-pressed="true"]').length;
          if (on && picked >= 3) return;
          b.setAttribute('aria-pressed', on);
          var ids = Array.prototype.map.call(card.querySelectorAll('[data-qz-opt][aria-pressed="true"]'), function (x) { return x.getAttribute('data-qz-opt'); });
          go.setAttribute('href', ids.length ? base + (base.indexOf('?') > -1 ? '&' : '?') + 'concerns=' + ids.join(',') : base);
        });
      });
    });
  }
  function init(root) { initIngredients(root); initQuiz(root); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(document); });
  else init(document);
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
