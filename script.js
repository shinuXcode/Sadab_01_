 // Loading screen - Short delay (1.5s)
 setTimeout(() => {
   document.getElementById('loader').classList.add('hidden');
   document.body.classList.add('loaded');
 }, 1500);
 
 // Year
 document.getElementById('year').textContent = new Date().getFullYear();
 
 // Contact scroll
 document.getElementById('contact-me').addEventListener('click', () => location.hash = '#contact');
 
 // Typed effect
 const phrases = ['Student. Problem solver. Full‑stack learner.', 'Preparing for JEE Advanced.', 'Building clean code daily.', 'From Katihar to IIT Bombay.'];
 let pi = 0,
   ci = 0;
 
 function tick() {
   const el = document.getElementById('typed');
   const txt = phrases[pi];
   el.textContent = txt.slice(0, ci);
   ci++;
   if (ci > txt.length) {
     setTimeout(() => { ci = 0;
       pi = (pi + 1) % phrases.length; }, 1500);
   } else setTimeout(tick, 80);
 }
 tick();
 
 // Animations
 anime({ targets: '.logo', translateY: [-6, 6], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 2600 });
 
 const reveal = (el) => {
   el.style.opacity = 0;
   el.style.transform = 'translateY(18px)';
   setTimeout(() => anime({ targets: el, opacity: [0, 1], translateY: [18, 0], duration: 800, easing: 'easeOutExpo' }), 200);
 };
 const obs = new IntersectionObserver((entries) => {
   entries.forEach(e => { if (e.isIntersecting) { reveal(e.target);
       obs.unobserve(e.target); } });
 }, { threshold: 0.15 });
 document.querySelectorAll('.card, .project, .stat').forEach(n => obs.observe(n));
 
 document.querySelectorAll('.bar > i').forEach((el, idx) => {
   const w = el.style.width;
   el.style.width = '0%';
   anime({ targets: el, width: w, duration: 1000 + idx * 200, easing: 'easeOutExpo', delay: 400 });
 });
 
 document.querySelectorAll('.project').forEach(p => {
   p.addEventListener('mouseenter', () => anime({ targets: p, scale: 1.02, duration: 220, easing: 'easeOutQuad' }));
   p.addEventListener('mouseleave', () => anime({ targets: p, scale: 1, duration: 200, easing: 'easeOutQuad' }));
 });
 
 // Theme selection with dropdown + persistence
 const body = document.body;
 const themeSelect = document.getElementById('theme-select');
 let saved = localStorage.getItem('theme');
 if (!saved) {
   saved = 'neon'; // Default to neon if no saved theme
   localStorage.setItem('theme', saved);
 }
 body.classList.add(`${saved}-theme`);
 themeSelect.value = saved;
 themeSelect.addEventListener('change', () => {
   body.className = ''; // Remove all theme classes
   const selected = themeSelect.value;
   if (selected !== 'liquid') {
     body.classList.add(`${selected}-theme`);
   }
   localStorage.setItem('theme', selected);
 });
 
 // Hamburger menu - Polished: Animate icon, close on link click/outside
 const hamburger = document.getElementById('hamburger');
 const mainNav = document.getElementById('main-nav');
 hamburger.addEventListener('click', () => {
   const isActive = mainNav.classList.toggle('active');
   hamburger.classList.toggle('active', isActive);
 });
 mainNav.querySelectorAll('a').forEach(link => {
   link.addEventListener('click', () => {
     mainNav.classList.remove('active');
     hamburger.classList.remove('active');
   });
 });
 document.addEventListener('click', (e) => {
   const header = document.querySelector('header');
   if (!header.contains(e.target)) {
     mainNav.classList.remove('active');
     hamburger.classList.remove('active');
   }
 });