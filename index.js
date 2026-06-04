(function () {
  'use strict';

  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  var smoother = null;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', !expanded);

      if (smoother && window.innerWidth <= 768) {
        smoother.paused(!expanded);
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');

        if (smoother && window.innerWidth <= 768) {
          smoother.paused(false);
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');

        if (smoother && window.innerWidth <= 768) {
          smoother.paused(false);
        }

        hamburger.focus();
      }
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollSmoother !== 'undefined') {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true
    });
  }
})();
