// ====== Données à personnaliser ======
const PROJECTS = [
    { title: 'BattleChain Academy', description: "Application sur l'investissement en cryptomonnaie", stack: ['Angular','.Net','API', 'POSTGRESQL'], link: '#' },
    { title: 'E‑commerce Headless', description: 'Front découplé, paiement sécurisé, SEO.', stack: ['JS','Stripe','Performance'], link: '#' },
    { title: 'Design System', description: 'Librairie de composants accessibles.', stack: ['UI','A11y','Docs'], link: '#' },
];

const EDUCATION = [
    { degree: 'C.E.S.S', school: 'Saint-Laurent', period: '2019 — 2023', details: 'Histoire et géographie, Anglais, Néerlandais' },
    { degree: 'Formation en algorithme et Python', school: 'Technobel', period: '03/2024 - 04/2024', details: 'Introduction sur Python et algorithme' },
    { degree: 'Formation développeur ASP.NET et Angular', school: 'Technobel', period: '2024 – 2025', details: 'Formation sur le développement en ASP.NET et Angular' },
];

// ====== Helpers DOM ======
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Année footer
$('#year').textContent = new Date().getFullYear();

// Burger menu
const burger = $('#burger');
const nav = $('#site-nav');
burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
});

// Fermer le menu au clic sur lien
$$('.nav-link').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Injection des projets
const projectsEl = $('#projects');
projectsEl.innerHTML = PROJECTS.map(p => `
  <article class="card">
    <div class="thumb" aria-hidden="true"></div>
    <div class="content">
      <h3>${p.title}</h3>
      <p class="muted">${p.description}</p>
      <div class="stack">${p.stack.map(t=>`<span class="pill">${t}</span>`).join('')}</div>
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn">Voir le projet</a>` : ''}
    </div>
  </article>
`).join('');

// Injection des formations
const eduEl = $('#education');
eduEl.innerHTML = EDUCATION.map(e => `
  <li class="item">
    <div class="dot"></div>
    <div class="body">
      <h3>${e.degree}</h3>
      <p class="muted">${e.school} • ${e.period}</p>
      ${e.details ? `<p>${e.details}</p>` : ''}
    </div>
  </li>
`).join('');

// Scroll actif (simple)
const sections = ['presentation','realisations','formations','contact'].map(id => document.getElementById(id));
const links = $$('.nav-link');
const onScroll = () => {
    const y = window.scrollY + 100;
    let active = sections[0].id;
    for (const s of sections) if (s.offsetTop <= y) active = s.id;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${active}`));
};
window.addEventListener('scroll', onScroll); onScroll();

// Validation formulaire + "envoi" (demo)
const form = $('#contact-form');
const note = $('#formNote');
const showError = (name, show) => {
    const e = $(`small.error[data-for="${name}"]`);
    if (e) e.style.display = show ? 'block' : 'none';
};

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const fd = new FormData(form);
//     const data = Object.fromEntries(fd.entries());
//     let valid = true;
//
//     // Règles simples
//     if (!data.name || data.name.trim().length < 2) { showError('name', true); valid = false; } else showError('name', false);
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) { showError('email', true); valid = false; } else showError('email', false);
//     if (!data.subject || data.subject.trim().length < 3) { showError('subject', true); valid = false; } else showError('subject', false);
//     if (!data.message || data.message.trim().length < 10) { showError('message', true); valid = false; } else showError('message', false);
//
//     if (!valid) return;
//
//     try {
//         await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) });
//         console.log('Contact form data', data);
//         note.hidden = false;
//         form.reset();
//     } catch(err) {
//         alert('Une erreur est survenue. Réessaie plus tard.');
//         console.error(err);
//     }
// });
