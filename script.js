
/* ===== Toggle menu responsive & set active link ===== */
(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    });

    // Đóng menu khi bấm link trên mobile
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest('.nav__link')) {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Mở menu');
      }
    });
  }

  // Set active theo đường dẫn hiện tại
  const links = document.querySelectorAll('.nav__link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const clean = (s) => s.replace(/\/+$/, '');
    if (clean(location.pathname) === clean(href)) {
      links.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
