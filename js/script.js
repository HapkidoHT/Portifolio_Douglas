document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar a');
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  menuBtn?.addEventListener('click', () => {
    navbar.classList.toggle('active');

    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      const icon = menuBtn?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('main section[id]');

  const activateMenu = () => {
    const scrollPosition = window.scrollY + 140;
    let currentSection = 'home';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentSection}`
      );
    });
  };

  window.addEventListener('scroll', activateMenu, { passive: true });
  activateMenu();
});
