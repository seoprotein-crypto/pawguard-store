/* PawGuard custom sections behaviour */
(function () {
  if (window.__pawguardInit) return;
  window.__pawguardInit = true;

  function tomorrowLabel() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  function initTabs(root) {
    root.querySelectorAll('[data-tabs]').forEach(function (wrap) {
      var tabs = wrap.querySelectorAll('[data-tab]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var key = tab.getAttribute('data-tab');
          tabs.forEach(function (t) {
            var on = t === tab;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          wrap.querySelectorAll('[data-panel]').forEach(function (p) {
            var on = p.getAttribute('data-panel') === key;
            p.classList.toggle('is-active', on);
            p.hidden = !on;
          });
        });
      });
    });
  }

  function initDialogs(root) {
    root.querySelectorAll('[data-dialog-open]').forEach(function (btn) {
      var dlg = document.getElementById(btn.getAttribute('data-dialog-open'));
      if (!dlg || !dlg.showModal) return;
      btn.addEventListener('click', function () { dlg.showModal(); });
      dlg.querySelectorAll('[data-dialog-close]').forEach(function (c) {
        c.addEventListener('click', function () { dlg.close(); });
      });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    });
  }

  function initHero(hero) {
    var form = hero.querySelector('.pg-form');
    if (!form) return;
    var variantInput = form.querySelector('[data-variant-input]');
    var planInput = form.querySelector('[data-plan-input]');
    var atcPrice = form.querySelector('[data-atc-price]');
    var bundles = form.querySelectorAll('[data-bundle]');
    var ptypes = form.querySelectorAll('input[name^="pg-ptype"]');

    function showMedia(id) {
      if (!id) return;
      var imgs = hero.querySelectorAll('.pg-gallery__img');
      var found = false;
      imgs.forEach(function (img) { if (img.getAttribute('data-media-id') === String(id)) found = true; });
      if (!found) return;
      imgs.forEach(function (img) { img.classList.toggle('is-active', img.getAttribute('data-media-id') === String(id)); });
      hero.querySelectorAll('[data-thumb]').forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('data-thumb') === String(id)); });
    }

    function isSub() {
      var s = form.querySelector('input[name^="pg-ptype"]:checked');
      return s && s.value === 'sub';
    }

    function update() {
      var active = form.querySelector('[data-bundle].is-active');
      if (!active) return;
      variantInput.value = active.getAttribute('data-variant-id');
      var planId = active.getAttribute('data-plan-id');
      var sub = isSub() && planId;
      if (planInput) {
        planInput.disabled = !sub;
        planInput.value = sub ? planId : '';
      }
      bundles.forEach(function (b) {
        var priceEl = b.querySelector('[data-bundle-price]');
        var pp = b.getAttribute('data-plan-price');
        priceEl.textContent = (isSub() && pp) ? pp : b.getAttribute('data-price');
      });
      if (atcPrice) atcPrice.textContent = sub ? active.getAttribute('data-plan-price') : active.getAttribute('data-price');
      ptypes.forEach(function (p) { p.closest('.pg-purchase__opt').classList.toggle('is-active', p.checked); });
    }

    bundles.forEach(function (b) {
      b.addEventListener('click', function () {
        bundles.forEach(function (x) { x.classList.toggle('is-active', x === b); });
        b.querySelector('input').checked = true;
        showMedia(b.getAttribute('data-media-id'));
        update();
      });
    });
    ptypes.forEach(function (p) { p.addEventListener('change', update); });

    hero.querySelectorAll('[data-thumb]').forEach(function (t) {
      t.addEventListener('click', function () { showMedia(t.getAttribute('data-thumb')); });
    });

    hero.querySelectorAll('[data-ship-date]').forEach(function (el) { el.textContent = tomorrowLabel(); });
    update();
  }

  function initReviews(root) {
    root.querySelectorAll('[data-reviews-more]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sec = btn.closest('.pg-reviews');
        sec.querySelectorAll('.pg-rv.is-hidden').forEach(function (r) { r.classList.remove('is-hidden'); });
        btn.parentNode.removeChild(btn);
      });
    });
  }

  function init() {
    initReviews(document);
    initTabs(document);
    initDialogs(document);
    document.querySelectorAll('.pg-hero').forEach(initHero);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', function (e) {
    window.__pawguardInit = true;
    initTabs(e.target); initDialogs(e.target); initReviews(e.target);
    e.target.querySelectorAll('.pg-hero').forEach(initHero);
  });
})();
