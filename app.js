// ====== Données à personnaliser ======
const PROJECTS = [
    {
        title: 'BattleChain Academy',
        description: "App sur l'investissement en cryptomonnaie",
        stack: ['Angular','.Net','API','POSTGRESQL'],
        link: '#',
        image: 'images/battlechain.png'
    },
    {
        title: 'E-commerce Headless',
        description: 'Front découplé, paiement sécurisé, SEO.',
        stack: ['JS','Stripe','Performance'],
        link: '#',
        image: 'images/ecommerce-headless.png'
    },
    {
        title: 'Design System',
        description: 'Librairie de composants accessibles.',
        stack: ['UI','A11y','Docs'],
        link: '#',
        image: 'images/design-system.png'
    }
];

(() => {
    const root = document.getElementById('projects');
    if (!root) return;

    const base = new URL('.', document.location.href).href; // gère 63342 + _ijt + %20

    root.innerHTML = PROJECTS.map(p => {
        const rel = (typeof p.image === 'string' ? p.image.trim() : '');
        const src = rel ? new URL(rel, base).href : '';

        return `
      <article class="card">
        <div class="thumb">
          ${src ? `<img class="thumb-img" src="${src}" alt="${p.title}" loading="lazy">` : ''}
        </div>
        <div class="content">
          <h3>${p.title}</h3>
          <p class="muted">${p.description}</p>
          <div class="stack">${p.stack.map(t=>`<span class="pill">${t}</span>`).join('')}</div>
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn">Voir le projet ( bientôt disponible )</a>` : ''}
        </div>
      </article>
    `;
    }).join('');
})();


const EDUCATION = [
    { degree: 'Formation développeur ASP.NET et Angular', school: 'Technobel', period: '2024 – 2025', details: 'Formation sur le développement en ASP.NET et Angular' },
    { degree: 'Formation en algorithme et Python', school: 'Technobel', period: '03/2024 - 04/2024', details: 'Introduction sur Python et algorithme' },
    { degree: 'C.E.S.S', school: 'Saint-Laurent', period: '2019 — 2023', details: 'Histoire et géographie, Anglais, Néerlandais' }
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
