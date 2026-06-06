var modal = document.getElementById("Modal");
var span = document.getElementsByClassName("close")[0];

function openModal() {
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

if (span) {
  span.onclick = closeModal;
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && modal && modal.style.display === "flex") {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('a[href="#"]').forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      openModal();
    });
  });

  openModal();
});

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

  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.nav-links li',
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }
})();
