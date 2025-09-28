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
  });
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
/* ========= Per-card preview scale from data-scale ========= */


document.querySelectorAll('.card[data-scale]').forEach(function (card) {
  var scale = parseFloat(card.dataset.scale || '0.72');
  var iframe = card.querySelector('iframe');
  if (iframe) iframe.style.setProperty('--scale', scale);
});