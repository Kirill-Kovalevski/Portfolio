"use strict";

// Year
document.getElementById('y').textContent = new Date().getFullYear();
/* ========= Mobile burger + close on link ========= */

var burger = document.getElementById('burger');
var navMenu = document.getElementById('navMenu');

if (burger && navMenu) {
  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('is-open', !open);
  }); // Close menu after clicking any nav link (including hash links)

  navMenu.querySelectorAll('a.navlink').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    });
  });
}
/* ========= Auto-hide topbar on scroll down ========= */


(function autoHideTopbar() {
  var bar = document.getElementById('topbar');
  if (!bar) return;
  var lastY = window.scrollY,
      ticking = false;

  function onScroll() {
    var cur = window.scrollY;
    var goingDown = cur > lastY && cur > 32;
    bar.classList.toggle('topbar--hidden', goingDown);
    lastY = cur;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, {
    passive: true
  });
})();
/* ========= One-at-a-time accordion (desktop & mobile) ========= */


(function oneAtATimeAccordion() {
  var toggles = Array.from(document.querySelectorAll('.tool__toggle'));
  if (!toggles.length) return;
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('aria-controls');
      var panel = document.getElementById(id);
      var willOpen = btn.getAttribute('aria-expanded') !== 'true'; // Close all panels

      toggles.forEach(function (b) {
        var p = document.getElementById(b.getAttribute('aria-controls'));
        b.setAttribute('aria-expanded', 'false');
        if (p) p.hidden = true;
      }); // Open selected if it was closed, otherwise all stay closed

      if (willOpen && panel) {
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
})();
/* ========= Per-card preview scale from data-scale ========= */


document.querySelectorAll('.card[data-scale]').forEach(function (card) {
  var scale = parseFloat(card.dataset.scale || '0.72');
  var iframe = card.querySelector('iframe');
  if (iframe) iframe.style.setProperty('--scale', scale);
});