/* Centre Dream PH — editorial site interactions */
(function () {
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');

  /* solid nav after leaving the hero */
  var hero = document.querySelector('.hero');
  function onScroll() {
    var threshold = hero ? hero.offsetHeight - 90 : 120;
    nav.classList.toggle('is-solid', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  function closeMenu() {
    links.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  /* La Carte — horizontal scroll carousel (arrows + drag) */
  var track = document.getElementById('carteTrack');
  if (track) {
    var prev = document.getElementById('cartePrev');
    var next = document.getElementById('carteNext');
    function step() {
      var card = track.querySelector('.carte__card');
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 24;
      return card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    }
    function updateArrows() {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 8;
    }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();

    /* drag-to-scroll (pointer) */
    var down = false, startX = 0, startLeft = 0, moved = 0;
    track.addEventListener('pointerdown', function (e) {
      down = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    track.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved = Math.abs(dx);
      track.scrollLeft = startLeft - dx;
    });
    function endDrag() { down = false; track.classList.remove('is-dragging'); updateArrows(); }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);
    /* swallow the click that ends a real drag so it doesn't open the lightbox */
    track.addEventListener('click', function (e) { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
  }

  /* lightbox for La Carte posters */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbClose = document.getElementById('lightboxClose');
  if (lb) {
    document.querySelectorAll('.carte__card img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(function () { lbImg.src = ''; }, 400);
    }
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  }

  /* scroll-reveal */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // safety net — never leave content hidden
    setTimeout(function () {
      reveals.forEach(function (el) { if (!el.classList.contains('in')) el.classList.add('in'); });
    }, 4000);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
