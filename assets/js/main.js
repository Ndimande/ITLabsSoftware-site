// IT Lab Software Consult — small page behaviours
(function () {
  const nav = document.getElementById('mainNav');
  const navLinks = document.getElementById('navLinks');

  // Solid navbar once the page scrolls past the top of the hero
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Dark background while the mobile menu is open, and close it after a tap
  navLinks.addEventListener('show.bs.collapse', () => nav.classList.add('menu-open'));
  navLinks.addEventListener('hidden.bs.collapse', () => nav.classList.remove('menu-open'));
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(navLinks).hide();
    })
  );

  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form: opens the visitor's email app with the message filled in
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#cName').value.trim();
    const email = form.querySelector('#cEmail').value.trim();
    const type = form.querySelector('#cType').value;
    const msg = form.querySelector('#cMsg').value.trim();

    if (!name || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = 'Please add your name, a valid email and a few project details.';
      note.classList.add('error');
      return;
    }
    note.classList.remove('error');

    const subject = `Project enquiry: ${type}`;
    const body = `Name: ${name}\nEmail: ${email}\nNeed: ${type}\n\n${msg}`;
    window.location.href =
      'mailto:ITLabsSoftware@chessalot.co.za?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Your email app should open with the message ready to send.';
  });

  // Fade sections in as they enter the viewport
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealTargets = document.querySelectorAll(
      '.service, .product, .steps li, .contact-wrap, .founder-photo, #about .col-lg-7'
    );
    revealTargets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  }
})();
