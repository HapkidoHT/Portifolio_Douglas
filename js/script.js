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

// =========================================================
// DG DATA GRID V2 — FUNDO DE REDE / SINAPSES DE DADOS
// Canvas leve, responsivo e com redução automática no mobile.
// =========================================================
(() => {
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  let nodes = [];
  let raf = null;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const baseCount = width < 700 ? 34 : width < 1200 ? 52 : 72;
    nodes = Array.from({ length: baseCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * (reduceMotion ? 0 : .14),
      vy: (Math.random() - .5) * (reduceMotion ? 0 : .14),
      r: Math.random() * 1.25 + .55,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function drawCircuitPulse(t) {
    const y = height * .72;
    const travel = ((t * .025) % (width + 220)) - 110;

    ctx.save();
    ctx.strokeStyle = 'rgba(58, 205, 255, .06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width * .18, y);
    ctx.lineTo(width * .22, y - 34);
    ctx.lineTo(width * .48, y - 34);
    ctx.lineTo(width * .52, y + 22);
    ctx.lineTo(width * .78, y + 22);
    ctx.lineTo(width, y - 20);
    ctx.stroke();

    const g = ctx.createRadialGradient(travel, y, 0, travel, y, 65);
    g.addColorStop(0, 'rgba(76,226,255,.20)');
    g.addColorStop(1, 'rgba(76,226,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(travel, y, 65, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, width, height);

    // Connections
    const maxDist = width < 700 ? 105 : 135;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      if (!reduceMotion) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -10 || a.x > width + 10) a.vx *= -1;
        if (a.y < -10 || a.y > height + 10) a.vy *= -1;
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * .13;
          ctx.strokeStyle = `rgba(66, 176, 255, ${alpha})`;
          ctx.lineWidth = .7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach((n, i) => {
      const pulse = reduceMotion ? 1 : .72 + Math.sin(time * .001 + n.phase) * .28;
      ctx.fillStyle = `rgba(${i % 5 === 0 ? '74,231,255' : '59,151,255'},${.24 * pulse})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
      ctx.fill();

      if (i % 13 === 0) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
        glow.addColorStop(0, 'rgba(64,209,255,.08)');
        glow.addColorStop(1, 'rgba(64,209,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    drawCircuitPulse(time);

    if (!reduceMotion) raf = requestAnimationFrame(draw);
  }

  resize();
  draw();

  window.addEventListener('resize', () => {
    clearTimeout(window.__dgResizeTimer);
    window.__dgResizeTimer = setTimeout(() => {
      if (raf) cancelAnimationFrame(raf);
      resize();
      draw();
    }, 120);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (reduceMotion) return;
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      raf = null;
    } else if (!document.hidden && !raf) {
      raf = requestAnimationFrame(draw);
    }
  });
})();
