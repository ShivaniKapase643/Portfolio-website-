(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ===== LOADER ===== */
  const loader = document.getElementById('siteLoader');
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  };
  const start = performance.now();
  const minShow = 700;
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, Math.max(0, minShow - (performance.now() - start)));
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, Math.max(0, minShow - (performance.now() - start)));
    }, { once: true });
  }

  /* ===== CURSOR GLOW ===== */
  if (!reduceMotion && isFinePointer) {
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
      let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      let tx = cx, ty = cy;
      const tick = () => {
        cx += (tx - cx) * 0.1;
        cy += (ty - cy) * 0.1;
        glow.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
        requestAnimationFrame(tick);
      };
      tick();
      window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });
    }
  }

  /* ===== PARTICLES ===== */
  if (!reduceMotion) {
    const canvas = document.querySelector('.particle-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w = 0, h = 0;
      const particles = [];
      const COUNT = isFinePointer ? 35 : 18;
      const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const mkParticle = () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: 1.2 + Math.random() * 2, a: 0.2 + Math.random() * 0.35,
        hue: Math.random() > 0.5 ? 260 : 200
      });
      const init = () => { particles.length = 0; for (let i = 0; i < COUNT; i++) particles.push(mkParticle()); };
      const step = () => {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},80%,72%,${p.a})`;
          ctx.fill();
        }
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 140) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(108,99,255,${(1 - d / 140) * 0.12})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(step);
      };
      resize(); init(); step();
      window.addEventListener('resize', () => { resize(); init(); });
    }
  }

  /* ===== REVEAL ON SCROLL ===== */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ===== ACTIVE NAV HIGHLIGHT ===== */
  const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    const setActive = id => navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    const sectionObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });
    navLinks.forEach(l => {
      const id = l.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });
  }

  /* ===== MOBILE MENU ===== */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mainNav.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== ROLE TYPEWRITER ===== */
  const roleEl = document.querySelector('.role-text');
  if (roleEl) {
    let roles;
    try { roles = JSON.parse(roleEl.dataset.roles); } catch { roles = ['Developer']; }
    let ri = 0, ci = 0, deleting = false;
    const type = () => {
      const word = roles[ri];
      roleEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      let delay = deleting ? 60 : 110;
      if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
      else if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 400; }
      setTimeout(type, delay);
    };
    setTimeout(type, 900);
  }

  /* ===== COUNTER ANIMATION ===== */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const startTime = performance.now();
        const tick = now => {
          const progress = Math.min((now - startTime) / dur, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        };
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  } else {
    counters.forEach(c => { c.textContent = c.dataset.count; });
  }

  /* ===== PROJECT FILTERS ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const cats = (card.dataset.category || '').split(' ');
          card.classList.toggle('hidden', !cats.includes(filter));
        }
      });
    });
  });

  /* ===== CONTACT FORM ===== */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form && formNote) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      if (!name || !email || !msg) {
        formNote.style.color = '#f87171';
        formNote.textContent = 'Please fill in all required fields.';
        return;
      }
      const mailto = `mailto:shivanikapse755@gmail.com?subject=${encodeURIComponent(form.subject.value || 'Portfolio Enquiry')}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + msg)}`;
      window.location.href = mailto;
      formNote.style.color = '#22c55e';
      formNote.textContent = '✓ Opening your email client...';
      setTimeout(() => { formNote.textContent = ''; }, 4000);
    });
  }

  /* ===== CARD TILT (desktop only) ===== */
  if (!reduceMotion && isFinePointer) {
    document.querySelectorAll('.project-card, .about-info-card, .skill-category, .timeline-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const y = (0.5 - (e.clientY - r.top) / r.height) * 8;
        card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

})();
