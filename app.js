// Year
document.getElementById('y').textContent = new Date().getFullYear();

/* ========= Mobile burger + close on link ========= */
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('is-open', !open);
  });

  navMenu.querySelectorAll('a.navlink').forEach(a => {
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    });
  });
}

/* ========= Auto-hide topbar on scroll down ========= */
(function autoHideTopbar() {
  const bar = document.getElementById('topbar');
  if (!bar) return;
  let lastY = window.scrollY, ticking = false;

  function onScroll() {
    const cur = window.scrollY;
    const goingDown = cur > lastY && cur > 32;
    bar.classList.toggle('topbar--hidden', goingDown);
    lastY = cur;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();

/* ========= Per-card preview scale from data-scale ========= */
document.querySelectorAll('.card[data-scale]').forEach(card => {
  const scale = parseFloat(card.dataset.scale || '0.72');
  const iframe = card.querySelector('iframe');
  if (iframe) iframe.style.setProperty('--scale', scale);
});
