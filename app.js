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

  // Close menu after clicking any nav link (including hash links)
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

/* ========= One-at-a-time accordion (desktop & mobile) ========= */
(function oneAtATimeAccordion() {
  const toggles = Array.from(document.querySelectorAll('.tool__toggle'));
  if (!toggles.length) return;

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      const willOpen = btn.getAttribute('aria-expanded') !== 'true';

      // Close all panels
      toggles.forEach(b => {
        const p = document.getElementById(b.getAttribute('aria-controls'));
        b.setAttribute('aria-expanded', 'false');
        if (p) p.hidden = true;
      });

      // Open selected if it was closed, otherwise all stay closed
      if (willOpen && panel) {
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
})();

/* ========= Per-card preview scale from data-scale ========= */
document.querySelectorAll('.card[data-scale]').forEach(card => {
  const scale = parseFloat(card.dataset.scale || '0.72');
  const iframe = card.querySelector('iframe');
  if (iframe) iframe.style.setProperty('--scale', scale);
});
