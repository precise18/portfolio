// ============================================
// Paballo Precision Malepa — Portfolio Scripts
// ============================================
document.documentElement.classList.add('js');

// 1. Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '✕' : '☰';
}
menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// 2. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 3. Fade-in on scroll (content stays visible if JS is off)
const sections = document.querySelectorAll('.section');
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach(s => { s.classList.add('reveal'); reveal.observe(s); });
}

// 4. Highlight the current section in the nav
const links = [...navLinks.querySelectorAll('a[href^="#"]')];
const byId = id => links.find(l => l.getAttribute('href') === '#' + id);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = byId(entry.target.id);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
}

// 5. Back-to-top button
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => { toTop.hidden = window.scrollY < 600; }, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
