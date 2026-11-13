/* PawGuard Gut Check quiz — recommends a Parasite Cleanse Drops bundle from the owner's answers. */
(function () {
  var root = document.getElementById('pg-quiz');
  var cfgEl = document.getElementById('pg-quiz-config');
  if (!root || !cfgEl) return;
  var CFG = JSON.parse(cfgEl.textContent);
  var V = CFG.product.variants;
  var stage = root.querySelector('[data-q-stage]');
  var foot = root.querySelector('[data-q-foot]');
  var backBtn = root.querySelector('[data-q-back]');
  var bar = root.querySelector('[data-q-bar]');
  var count = root.querySelector('[data-q-count]');

  // Each answer adds "gut points" (pts). Total decides 1, 2 or 3 bottles. "why" lines explain the match.
  var STEPS = {
    name: { type: 'text', q: "Let's start with your dog's name", sub: 'We’ll shape the plan around them.', ph: 'e.g. Max',
      tip: 'Every dog is a little different. Answer a few quick questions and we’ll suggest the routine that suits {dog}.' },
    age: { type: 'single', q: 'How old is {dog}?', opts: [
      { id: 'puppy', label: 'Younger than 1 year', pts: 2, why: '{Dog} is still a puppy — young dogs pick up gut troubles most easily' },
      { id: 'young', label: '1 to 3 years' },
      { id: 'adult', label: '4 to 7 years' },
      { id: 'senior', label: '8 years or more', pts: 1, why: 'Older dogs often need a little more digestive support' } ],
      tip: 'Age shapes what the gut needs — puppies and seniors usually need the most support.' },
    size: { type: 'single', grid: true, q: 'What does {dog} weigh?', opts: [
      { id: 'toy', label: 'Under 10 lbs', sub: 'Toy', crop: [30, 300, 210] },
      { id: 'small', label: '10–35 lbs', sub: 'Small to medium', crop: [200, 200, 250] },
      { id: 'medium', label: '35–75 lbs', sub: 'Medium to large', crop: [400, 60, 340] },
      { id: 'large', label: 'Over 75 lbs', sub: 'Large', crop: [740, 0, 390] } ],
      tip: 'Weight sets the daily serving, so the plan will show exactly how much {dog} needs.' },
    concerns: { type: 'multi', max: 3, q: 'What would you most like to improve for {dog}?', sub: 'Choose up to 3.', opts: [
      { id: 'itch', ill: 'itch', label: 'Scratching, itching or paw licking', pts: 2, why: 'You chose itching and licking as a top concern' },
      { id: 'scoot', ill: 'grass', label: 'Scooting, worms or grass eating', pts: 3, why: 'Scooting and grass eating are classic signs of an unsettled gut' },
      { id: 'tummy', ill: 'tummy', label: 'Loose stools or tummy trouble', pts: 3, why: 'You chose tummy trouble as a top concern' },
      { id: 'coat', ill: 'coat', label: 'Dull coat or extra shedding', pts: 1, why: 'A dull coat often reflects what’s going on in the gut' },
      { id: 'energy', ill: 'energy', label: 'Low energy or restless nights', pts: 1, why: 'Low energy and broken sleep can start with digestive discomfort' },
      { id: 'wellness', ill: 'heart', label: 'Nothing in particular — just staying healthy', why: 'You want a simple daily routine to keep {dog}’s gut on track' } ],
      tip: 'Pick what bothers {dog} most. We’ll ask one short follow-up for each.' },
    f_itch: { type: 'multi', q: 'Where does {dog} scratch or lick most?', sub: 'Select all that apply.', opts: [
      { id: 'paws', label: 'Paws', pts: 1, why: '{Dog} licks or chews their paws' },
      { id: 'rear', label: 'Rear end or base of the tail', pts: 2, why: 'Itching around the rear is often a gut issue rather than a skin one' },
      { id: 'ears', label: 'Ears or face', pts: 1 },
      { id: 'all', label: 'All over', pts: 1 } ],
      tip: 'Where the itch is says a lot — itching at the rear is often linked to the gut.' },
    f_scoot: { type: 'multi', q: 'Have you noticed any of these in {dog}?', sub: 'Select all that apply.', opts: [
      { id: 'scooting', label: 'Scooting along the floor', pts: 1, why: '{Dog} scoots — a common sign of gut irritation' },
      { id: 'grass', label: 'Eating grass a lot', pts: 1, why: 'Frequent grass eating can point to an unsettled stomach' },
      { id: 'worms', label: 'Worms or rice-like bits in the stool', pts: 3, vet: true, why: 'You’ve seen signs in the stool — please also check in with your vet' },
      { id: 'hungry', label: 'Always hungry but not gaining weight', pts: 1 },
      { id: 'none', label: 'None of these', exclusive: true } ],
      tip: 'Many gut signs look like everyday habits. Scooting and grass eating are the ones owners miss most.' },
    f_tummy: { type: 'multi', q: 'What does {dog}’s tummy trouble look like?', sub: 'Select all that apply.', opts: [
      { id: 'loose', label: 'Loose or changing stools', pts: 1, why: '{Dog} has loose or inconsistent stools' },
      { id: 'gas', label: 'Gas or bloating', pts: 1, why: 'Gas and bloating suggest the gut is out of balance' },
      { id: 'vomit', label: 'Occasional vomiting', pts: 1 },
      { id: 'sensitive', label: 'Sensitive to new foods', pts: 1 } ],
      tip: 'Most tummy trouble comes down to gut balance — that’s where a daily routine helps.' },
    exposure: { type: 'single', q: 'How often does {dog} spend time with other dogs, at parks or daycare?', opts: [
      { id: 'rare', label: 'Hardly ever' },
      { id: 'weekly', label: 'Most weeks', pts: 1 },
      { id: 'daily', label: 'Nearly every day', pts: 2, why: '{Dog} is around other dogs and shared spaces almost daily' } ],
      tip: 'Parks, daycare and shared water bowls are where most dogs pick things up.' },
    diet: { type: 'single', q: 'What does {dog} eat most of the time?', opts: [
      { id: 'kibble', label: 'Dry food (kibble)' },
      { id: 'wet', label: 'Wet or fresh food' },
      { id: 'raw', label: 'Raw food', pts: 2, why: 'Raw diets can carry a higher risk of gut parasites' },
      { id: 'home', label: 'Home-cooked meals' },
      { id: 'mix', label: 'A mix of these' } ],
      tip: 'Diet affects gut balance — raw diets in particular call for a little extra care.' },
    email: { type: 'email' }
  };
  var ICONS = {
    itch: '<path d="M12 21c-3 0-5-2-5-4.5S9.5 12 12 12s5 2 5 4.5S15 21 12 21z"/><circle cx="6" cy="9" r="2"/><circle cx="10" cy="5.5" r="2"/><circle cx="14" cy="5.5" r="2"/><circle cx="18" cy="9" r="2"/><path d="M2 14l2 1M2 18l2-.5M22 14l-2 1M22 18l-2-.5"/>',
    grass: '<path d="M4 21c0-6 2-10 5-13M9 21c0-5 1-9 3-12M14 21c0-4 2-8 6-11M19 21c0-3 .5-5 2-7M2 21h20"/>',
    tummy: '<path d="M9 3v4c0 2-3 3-3 7a6 6 0 0 0 12 0c0-3-2-4-4-4h-1"/><path d="M10 14c1 1.5 3 1.5 4 0"/>',
    coat: '<path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    energy: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    heart: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>'
  };
  function icon(k) { return ICONS[k] ? '<span class="pgq-ill" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</svg></span>' : ''; }
  // Crop a square [x, y, size] out of the dosing-chart photo (1178 x 666), shown as a background image.
  function art(c) {
    if (!c || !CFG.sizeImage) return '';
    var W = 1178, H = 666, x = c[0], y = c[1], w = c[2];
    var size = (W / w * 100).toFixed(1) + '% ' + (H / w * 100).toFixed(1) + '%';
    var pos = (x / (W - w) * 100).toFixed(1) + '% ' + (H - w > 0 ? (y / (H - w) * 100).toFixed(1) : 0) + '%';
    return '<span class="pgq-art" aria-hidden="true" style="background-image:url(' + esc(CFG.sizeImage) + ');background-size:' + size + ';background-position:' + pos + '"></span>';
  }
  var FOLLOW = { itch: 'f_itch', scoot: 'f_scoot', tummy: 'f_tummy' };
  var DOSE = { toy: '0.5 ml', small: '1 ml', medium: '2 ml', large: '3 ml' };
  var WEIGHT = { toy: 'Under 10 lbs', small: '10–35 lbs', medium: '35–75 lbs', large: 'Over 75 lbs' };
  var AGE = { puppy: 'Under 1 year', young: '1–3 years', adult: '4–7 years', senior: '8+ years' };
  var SHORT = { itch: 'Itching', scoot: 'Scooting', tummy: 'Tummy', coat: 'Coat', energy: 'Energy', wellness: 'Everyday health' };

  var state = { name: '', answers: {}, flow: [], i: 0, email: '' };
  var buyMode = 'sub';

  function flow() {
    var f = ['name', 'age', 'size', 'concerns'];
    (state.answers.concerns || []).forEach(function (c) { if (FOLLOW[c]) f.push(FOLLOW[c]); });
    state.flow = f.concat(['exposure', 'diet', 'email']);
  }
  flow();
  // Pre-select concerns passed from the home page teaser, e.g. ?concerns=scoot,itch
  try {
    var pre = new URLSearchParams(window.location.search).get('concerns');
    if (pre) {
      var okIds = STEPS.concerns.opts.map(function (o) { return o.id; });
      var preList = pre.split(',').filter(function (x, i, a) { return okIds.indexOf(x) > -1 && a.indexOf(x) === i; }).slice(0, 3);
      if (preList.length) { state.answers.concerns = preList; flow(); }
    }
  } catch (e) { }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function dog() { return state.name || 'your dog'; }
  function fill(s) { var n = dog(); return String(s || '').replace(/\{Dog\}/g, n.charAt(0).toUpperCase() + n.slice(1)).replace(/\{dog\}/g, n); }
  function money(c) { var v = (c / 100).toFixed(2); return (CFG.money || '${{amount}}').replace(/\{\{\s*amount\s*\}\}/, v).replace(/\{\{\s*amount_no_decimals\s*\}\}/, Math.round(c / 100)); }
  function tip(t) { return '<div class="pgq-tip"><span aria-hidden="true">🐾</span><div><b>' + esc(CFG.team || 'The PawGuard team') + '</b><p>' + esc(fill(t)) + '</p></div></div>'; }
  function setFoot(html) { foot.innerHTML = html || ''; foot.hidden = !html; }
  function top() { try { window.scrollTo({ top: root.offsetTop - 20, behavior: 'smooth' }); } catch (e) { } }

  function progress() {
    var total = state.flow.length - 1, on = state.i < total;
    count.textContent = on ? (state.i + 1) + ' / ' + total : '';
    bar.style.width = Math.round(Math.min(state.i, total) / total * 100) + '%';
    backBtn.hidden = state.i === 0;
  }

  function render() {
    root.setAttribute('data-mode', 'q'); progress();
    var key = state.flow[state.i], s = STEPS[key];
    if (s.type === 'text') return renderName(s);
    if (s.type === 'email') return renderEmail();
    renderChoice(key, s);
  }

  function renderName(s) {
    stage.innerHTML = '<div class="pgq-step"><p class="pgq-eyebrow">The Gut Check · takes about a minute</p><h1 class="pgq-q">' + esc(s.q) + '</h1><p class="pgq-sub">' + esc(s.sub) +
      '</p><label class="pgq-sr" for="pgq-name">Dog’s name</label><input id="pgq-name" class="pgq-input" type="text" maxlength="24" autocomplete="off" placeholder="' + esc(s.ph) + '" value="' + esc(state.name) + '">' + tip(s.tip) + '</div>';
    setFoot('<button type="button" class="pgq-cta" data-next>Continue</button>');
    var input = stage.querySelector('input'), btn = foot.querySelector('[data-next]');
    function sync() { btn.disabled = !input.value.trim(); }
    function go() { var v = input.value.trim().slice(0, 24); state.name = v.charAt(0).toUpperCase() + v.slice(1); next(); }
    input.addEventListener('input', sync);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && input.value.trim()) go(); });
    btn.addEventListener('click', go); sync();
  }

  function renderChoice(key, s) {
    var multi = s.type === 'multi', sel = state.answers[key] || (multi ? [] : null);
    var opts = s.opts.map(function (o) {
      var on = multi ? sel.indexOf(o.id) > -1 : sel === o.id;
      return '<button type="button" class="pgq-opt" data-id="' + o.id + '" aria-pressed="' + on + '">' + art(o.crop) + icon(o.ill) + '<span class="pgq-opt-t">' + esc(fill(o.label)) + (o.sub ? '<small>' + esc(o.sub) + '</small>' : '') + '</span><span class="pgq-tick" aria-hidden="true"></span></button>';
    }).join('');
    stage.innerHTML = '<div class="pgq-step"><h1 class="pgq-q">' + esc(fill(s.q)) + '</h1>' + (s.sub ? '<p class="pgq-sub">' + esc(s.sub) + '</p>' : '') +
      '<div class="pgq-opts' + (s.grid ? ' pgq-opts--2' : '') + (s.opts.some(function (o) { return o.crop; }) ? ' pgq-opts--art' : '') + '" role="group" aria-label="' + esc(fill(s.q)) + '">' + opts + '</div>' + (s.max ? '<p class="pgq-hint" data-hint></p>' : '') + tip(s.tip) + '</div>';
    var btn = null;
    if (multi) {
      setFoot('<button type="button" class="pgq-cta" data-next>Continue</button>');
      btn = foot.querySelector('[data-next]');
      btn.addEventListener('click', function () { if (key === 'concerns') flow(); next(); });
    } else setFoot('');
    function sync() {
      if (!btn) return;
      var l = state.answers[key] || []; btn.disabled = !l.length;
      var h = stage.querySelector('[data-hint]'); if (h) h.textContent = l.length >= s.max ? 'That’s 3 — unselect one to swap.' : '';
    }
    stage.querySelectorAll('.pgq-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-id');
        if (!multi) {
          state.answers[key] = id;
          stage.querySelectorAll('.pgq-opt').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          setTimeout(next, 200); return;
        }
        var list = (state.answers[key] || []).slice(), opt = s.opts.filter(function (o) { return o.id === id; })[0], i = list.indexOf(id);
        if (i > -1) list.splice(i, 1);
        else {
          list = opt.exclusive ? [] : list.filter(function (x) { return !s.opts.some(function (o) { return o.id === x && o.exclusive; }); });
          if (s.max && list.length >= s.max) return;
          list.push(id);
        }
        state.answers[key] = list;
        stage.querySelectorAll('.pgq-opt').forEach(function (x) { x.setAttribute('aria-pressed', list.indexOf(x.getAttribute('data-id')) > -1); });
        sync();
      });
    });
    sync();
  }

  function renderEmail() {
    stage.innerHTML = '<div class="pgq-step"><p class="pgq-eyebrow">' + esc(fill('{Dog}’s plan is ready')) + '</p><h1 class="pgq-q">' + esc(fill('Want {dog}’s plan by email?')) +
      '</h1><p class="pgq-sub">We’ll send the plan and the dosing guide so you always have it to hand.</p><label class="pgq-sr" for="pgq-email">Email</label><input id="pgq-email" class="pgq-input" type="email" inputmode="email" autocomplete="email" placeholder="you@email.com" value="' + esc(state.email) +
      '"><p class="pgq-fine">By entering your email you agree to receive emails from PawGuard. You can unsubscribe at any time.</p></div>';
    setFoot('<button type="button" class="pgq-cta" data-send>Email me the plan</button><button type="button" class="pgq-link" data-skip>Skip — just show me the plan</button>');
    var input = stage.querySelector('input'), send = foot.querySelector('[data-send]');
    function ok() { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim()); }
    function sync() { send.disabled = !ok(); }
    function go() { state.email = input.value.trim(); subscribe(state.email); loading(); }
    input.addEventListener('input', sync);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && ok()) go(); });
    send.addEventListener('click', go);
    foot.querySelector('[data-skip]').addEventListener('click', loading); sync();
  }

  // Adds the email to Shopify Customers (accepts marketing) using the standard newsletter form endpoint.
  function subscribe(email) {
    try {
      var fd = new FormData();
      fd.append('form_type', 'customer'); fd.append('utf8', '✓');
      fd.append('contact[email]', email); fd.append('contact[tags]', 'newsletter,gut-check');
      fd.append('contact[first_name]', state.name ? state.name + '’s owner' : '');
      fetch('/contact', { method: 'POST', body: fd, credentials: 'same-origin' }).catch(function () { });
    } catch (e) { }
  }

  function next() { if (state.i < state.flow.length - 1) { state.i++; render(); top(); } }
  backBtn.addEventListener('click', function () { if (state.i > 0) { state.i--; render(); top(); } });

  function score() {
    var pts = 0, why = [], vet = false;
    state.flow.forEach(function (key) {
      var s = STEPS[key], a = state.answers[key];
      if (!s || !s.opts || a == null) return;
      var ids = Array.isArray(a) ? a : [a];
      s.opts.forEach(function (o) {
        if (ids.indexOf(o.id) === -1) return;
        pts += o.pts || 0;
        if (o.vet) vet = true;
        if (o.why && why.indexOf(o.why) === -1) why.push(o.why);
      });
    });
    var tier = pts >= 9 ? 3 : pts >= 5 ? 2 : 1;
    return { pts: pts, tier: tier, why: why, vet: vet };
  }

  var TIER = {
    1: { label: 'Mild signs', line: 'A steady 30-day routine is a great place to start.' },
    2: { label: 'Moderate signs', line: 'Two months gives the routine time to settle in — our most popular choice.' },
    3: { label: 'Strong signs', line: 'The full 90-day routine is what we recommend for clear, recurring signs.' }
  };

  function loading() {
    setFoot(''); root.setAttribute('data-mode', 'load');
    bar.style.width = '100%'; count.textContent = ''; backBtn.hidden = true;
    var lines = [fill('Going through {dog}’s answers'), 'Matching the signs you chose', 'Working out the daily serving for ' + (WEIGHT[state.answers.size] || fill('{dog}')).toLowerCase(), 'Choosing the right routine length'];
    stage.innerHTML = '<div class="pgq-step pgq-load">' + (CFG.loadingImage ? '<img class="pgq-load-img" src="' + esc(CFG.loadingImage) + '" alt="" width="450" height="450">' : '') +
      '<h1 class="pgq-q">' + esc(fill('Building {Dog}’s plan')) + '</h1><div class="pgq-dots" aria-hidden="true"><i></i><i></i><i></i></div><p class="pgq-status" role="status">' + esc(lines[0]) + '</p></div>';
    var st = stage.querySelector('.pgq-status');
    lines.slice(1).forEach(function (t, i) { setTimeout(function () { st.textContent = t; }, 1000 * (i + 1)); });
    setTimeout(results, 1000 * lines.length + 200); top();
  }

  function results() {
    var r = score(), v = V[r.tier - 1] || V[0], t = TIER[r.tier];
    root.setAttribute('data-mode', 'res');
    var once = v.price, sub = v.planPrice, hasSub = !!(v.plan && sub);
    if (!hasSub) buyMode = 'once';
    var facts = [AGE[state.answers.age], WEIGHT[state.answers.size]].filter(Boolean);
    var picks = (state.answers.concerns || []).map(function (c) { return SHORT[c]; }).filter(Boolean);
    var why = r.why.slice(0, 3).map(function (w) { return '<li>' + esc(fill(w)) + '</li>'; }).join('') +
      '<li>Black walnut, wormwood and Oregon grape with a probiotic blend — a daily gut cleanse in one dropper</li>';
    var rv = (CFG.reviews || []).map(function (x) {
      return '<figure class="pgq-review"><span class="pgq-stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>' + esc(x.text) + '</blockquote><figcaption><b>' + esc(x.name) + '</b>' + (x.date ? ' · ' + esc(x.date) : '') + ' · Verified buyer</figcaption></figure>';
    }).join('');
    var buy = hasSub ?
      '<div class="pgq-buy" role="radiogroup" aria-label="Purchase option">' +
      '<label class="pgq-po"><input type="radio" name="pgq-buy" value="sub"' + (buyMode === 'sub' ? ' checked' : '') + '><span class="pgq-po-t"><b>Subscribe & save 20%</b><small>Ships automatically · pause or cancel anytime</small></span><span class="pgq-po-p"><s>' + esc(money(once)) + '</s> <b>' + esc(money(sub)) + '</b></span></label>' +
      '<label class="pgq-po"><input type="radio" name="pgq-buy" value="once"' + (buyMode === 'once' ? ' checked' : '') + '><span class="pgq-po-t"><b>One-time purchase</b><small>' + esc(v.title) + '</small></span><span class="pgq-po-p">' + (v.compare > once ? '<s>' + esc(money(v.compare)) + '</s> ' : '') + '<b>' + esc(money(once)) + '</b></span></label></div>'
      : '<p class="pgq-total"><b>' + esc(money(once)) + '</b></p>';
    stage.innerHTML = '<div class="pgq-step pgq-res">' +
      '<div class="pgq-res-head"><p class="pgq-eyebrow">Your Gut Check results</p><h1 class="pgq-title">' + esc(fill('{Dog}’s plan is ready')) + '</h1><p class="pgq-lede">' + esc(fill('Based on your answers and sized for {dog}’s weight. Here’s where we’d begin.')) + '</p></div>' +
      '<section class="pgq-profile"><h2 class="pgq-h3">' + esc(fill('About {Dog}')) + '</h2><ul class="pgq-facts">' + facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
      (picks.length ? '<ul class="pgq-picks">' + picks.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' : '') +
      '<p class="pgq-level"><b>' + esc(t.label) + '</b> — ' + esc(t.line) + '</p></section>' +
      '<section class="pgq-plan"><div class="pgq-plan-media">' + (v.image ? '<img src="' + esc(v.image) + '" alt="' + esc(CFG.product.title + ' – ' + v.title) + '" width="400" height="400">' : '') + '</div>' +
      '<div class="pgq-plan-b"><p class="pgq-eyebrow">' + esc(fill('Recommended for {dog}')) + '</p><h2 class="pgq-h2">' + esc(CFG.product.title) + ' · ' + esc(v.title) + '</h2>' +
      '<p class="pgq-dose"><b>' + esc(fill('{Dog}’s daily serving:')) + '</b> ' + esc(DOSE[state.answers.size] ? DOSE[state.answers.size] + ' once a day, mixed into food' : 'by weight, once a day') + '</p>' +
      buy + (v.available ? '<button type="button" class="pgq-cta" data-checkout>' + esc(fill('Get {dog}’s plan')) + '</button><p class="pgq-note">Secure checkout' + (CFG.freeShipping ? ' · ' + esc(CFG.freeShipping) : '') + '</p>' : '<p class="pgq-unavail">Checkout is currently available for US delivery addresses only. If you’re in the US and see this, please refresh the page.</p>') +
      '<a class="pgq-more" href="' + esc(CFG.product.url) + '">See full product details</a></div></section>' +
      (r.vet ? '<div class="pgq-vet">⚠️ You mentioned worms or rice-like bits in the stool. Please also book a check-up with your vet — they can confirm what’s going on and advise on treatment.</div>' : '') +
      '<section class="pgq-why"><h2 class="pgq-h3">' + esc(fill('Why this fits {dog}')) + '</h2><ul>' + why + '</ul></section>' +
      '<section class="pgq-promise"><div><b>90-day money-back guarantee</b><p>Not the right fit? Email ' + esc(CFG.email) + ' and we’ll refund you in full.</p></div><div><b>Deliveries on your terms</b><p>Skip, pause or cancel your subscription anytime.</p></div>' + (CFG.freeShipping ? '<div><b>Fast shipping</b><p>' + esc(CFG.freeShipping) + '</p></div>' : '') + '</section>' +
      (rv ? '<section class="pgq-reviews"><h2 class="pgq-h3">What dog parents say</h2><div class="pgq-reviews-g">' + rv + '</div></section>' : '') +
      '<p class="pgq-disclaimer">This quiz offers general guidance and isn’t veterinary advice. If symptoms are severe or don’t improve, please talk to your vet.</p>' +
      '<button type="button" class="pgq-link" data-restart>Retake the Gut Check</button></div>';
    stage.querySelectorAll('input[name="pgq-buy"]').forEach(function (inp) { inp.addEventListener('change', function () { if (inp.checked) buyMode = inp.value; }); });
    var ck = stage.querySelector('[data-checkout]');
    if (ck) ck.addEventListener('click', function () { checkout(v, ck); });
    stage.querySelector('[data-restart]').addEventListener('click', function () { state = { name: state.name, answers: {}, flow: [], i: 0, email: state.email }; flow(); render(); top(); });
    top();
  }

  function checkout(v, btn) {
    btn.disabled = true; btn.textContent = 'Taking you to checkout…';
    var f = document.createElement('form');
    f.method = 'POST'; f.action = '/cart/add'; f.hidden = true;
    function field(n, val) { var i = document.createElement('input'); i.type = 'hidden'; i.name = n; i.value = val; f.appendChild(i); }
    field('id', v.id); field('quantity', 1);
    if (buyMode === 'sub' && v.plan) field('selling_plan', v.plan);
    field('properties[_source]', 'gut-check');
    field('return_to', '/checkout');
    document.body.appendChild(f); f.submit();
  }

  render();
})();
