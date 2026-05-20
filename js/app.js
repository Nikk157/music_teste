/* ══════════════════════════════════════════════════════════════
   KIDS MUSIC — APP.JS
   Fluxo: Quiz Landing → Quiz (8 etapas) → Loading Screen →
          Página de Vendas → Checkout
   ══════════════════════════════════════════════════════════════ */

/* ── Dados ──────────────────────────────────────────────── */
const MUSIC_EXAMPLES = [
  { id:1, vimeoId:"1191676533", poster:"assets/Maria_img.jpg",   color:"#d946ef", glow:"rgba(217,70,239,.6)" },
  { id:2, vimeoId:"1191676534", poster:"assets/Lucas_img.jpg",   color:"#0ea5e9", glow:"rgba(14,165,233,.6)" },
  { id:3, vimeoId:"1191676535", poster:"assets/Luis_img.png",    color:"#22c55e", glow:"rgba(34,197,94,.6)"  },
  { id:4, vimeoId:"1191674347", poster:"assets/Larissa_img.jpg", color:"#fb923c", glow:"rgba(251,146,60,.6)" },
  { id:5, vimeoId:"1191674348", poster:"assets/Ana_img.jpg",     color:"#ec4899", glow:"rgba(236,72,153,.6)" },
  { id:6, vimeoId:"1191674277", poster:"assets/Joao_img.png",    color:"#6366f1", glow:"rgba(99,102,241,.6)" },
];

const TESTIMONIALS = [
  {
    name: "Lucas Costa", role: "Pai da Sofia, 6 anos",
    image: "assets/instagram-dm.png",
    stars: 5,
    text: "Minha filha ouviu a música e começou a chorar de alegria! Ela pediu pra colocar de novo umas 10 vezes seguidas. Nunca vi ela tão feliz com um presente. Simplesmente incrível!"
  },
  {
    name: "Mariana Santos", role: "Mãe do Davi, 4 anos",
    image: "assets/instagram-dm (4).png",
    stars: 5,
    text: "Cheguei a chorar quando ouvi. Eles capturaram tudo que é o meu filho — o jeito dele ser, o que ele ama, os detalhes que só eu sei. Esse presente não tem preço."
  },
  {
    name: "Rafael Pereira", role: "Pai da Valentina, 7 anos",
    image: "assets/instagram-dm (3).png",
    stars: 5,
    text: "A entrega foi super rápida, recebi em menos de 4 horas! A qualidade da produção é profissional demais. A Valentina já decorou a letra toda e canta toda manhã."
  },
  {
    name: "Ana Beatriz", role: "Mãe do Miguel, 5 anos",
    image: "assets/instagram-dm (2).png",
    stars: 5,
    text: "Achei que seria algo genérico, mas fiquei completamente surpresa. Cada parte da letra tem algo específico do meu filho. Ele fica pedindo toda noite antes de dormir!"
  },
];

const DEAL_FEATURES = [
  "Composição completa (Letra + Melodia)",
  "Voz profissional de estúdio",
  "Arquivo MP3 em alta definição",
  "Capa do álbum personalizada",
  "2 versões para escolher — Pague 1, leve 2",
];

/* ── Estado global ──────────────────────────────────────── */
let activeIndex  = 0;
let playingId    = null;
let vimeoPlayers = {};
let vimeoApiLoaded = false;
let spTestimonialIndex = 0;

const PAUSE_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5.75A1.75 1.75 0 0 1 8.75 4h.5A1.75 1.75 0 0 1 11 5.75v12.5A1.75 1.75 0 0 1 9.25 20h-.5A1.75 1.75 0 0 1 7 18.25V5.75Zm6 0A1.75 1.75 0 0 1 14.75 4h.5A1.75 1.75 0 0 1 17 5.75v12.5A1.75 1.75 0 0 1 15.25 20h-.5A1.75 1.75 0 0 1 13 18.25V5.75Z"/></svg>`;
const PLAY_SVG  = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72c0 .78.86 1.25 1.52.82l10.2-6.86a.98.98 0 0 0 0-1.64L9.52 4.32A.98.98 0 0 0 8 5.14Z"/></svg>`;


/* ══════════════════════════════════════════════════════════
   CAROUSEL — QUIZ LANDING
   ══════════════════════════════════════════════════════════ */
function buildCarousel() {
  const c = document.getElementById('carousel');
  if (!c) return;

  c.style.paddingLeft = c.style.paddingRight = 'calc(50% - 124px)';
  c.innerHTML = MUSIC_EXAMPLES.map((card, idx) => `
    <div class="carousel__card" id="card-${card.id}" data-index="${idx}">
      <img class="carousel__poster" id="poster-${card.id}" src="${card.poster}" alt="" loading="${idx === activeIndex ? 'eager' : 'lazy'}" decoding="async" />
      <div class="carousel__media" id="media-${card.id}"></div>
      <button class="carousel__play" id="play-${card.id}" onclick="event.stopPropagation(); toggleVideo(${card.id})" aria-label="Play">
        ${PLAY_SVG}
      </button>
    </div>
  `).join('');

  MUSIC_EXAMPLES.forEach((card, idx) => {
    const cardEl = document.getElementById(`card-${card.id}`);
    if (cardEl) {
      cardEl.addEventListener('click', function(e) {
        if (e.target.closest('.carousel__play')) return;
        if (idx === activeIndex) return;
        goToCard(idx);
      });
    }
  });

  buildDots();
  updateCards();
  setTimeout(() => {
    const active = document.getElementById(`card-${MUSIC_EXAMPLES[activeIndex].id}`);
    if (active) active.scrollIntoView({ behavior:'auto', inline:'center', block:'nearest' });
  }, 50);
}

function buildDots() {
  const el = document.getElementById('dots');
  if (!el) return;
  el.innerHTML = MUSIC_EXAMPLES.map((_,i) =>
    `<button class="carousel-controls__dot${i===0?' active':''}" onclick="goToCard(${i})" aria-label="Card ${i+1}"></button>`
  ).join('');
}

function updateDots() {
  document.querySelectorAll('.carousel-controls__dot').forEach((d,i) =>
    d.classList.toggle('active', i === activeIndex)
  );
}

function glowToRgb(glow) {
  const m = glow.match(/rgba\((\d+),(\d+),(\d+)/);
  return m ? `${m[1]},${m[2]},${m[3]}` : '180,180,220';
}

function updateCards() {
  MUSIC_EXAMPLES.forEach((card, idx) => {
    const el = document.getElementById(`card-${card.id}`);
    if (!el) return;
    const d = idx - activeIndex, active = idx === activeIndex;

    el.style.transform = `translateY(${active?0:20}px) rotate(${d*-4}deg) scale(${active?1:.91})`;
    el.style.opacity   = active ? '1' : '0.62';
    el.style.zIndex    = active ? '10' : '1';

    if (!active && playingId === card.id) {
      const player = vimeoPlayers[card.id];
      const btn    = document.getElementById(`play-${card.id}`);
      const media  = document.getElementById(`media-${card.id}`);
      if (player) { player.pause(); player.setVolume(0); }
      if (btn)    { btn.innerHTML = PLAY_SVG; btn.classList.remove('playing'); }
      if (media)  { media.classList.remove('active'); }
      playingId = null;
    }
  });

  // Atualiza glow e cor da landing
  const card = MUSIC_EXAMPLES[activeIndex];
  const rgb  = glowToRgb(card.glow);
  const ql   = document.getElementById('quizLanding');
  if (ql) {
    ql.style.background =
      `radial-gradient(ellipse at 18% 52%, rgba(${rgb},.28) 0%, transparent 50%),` +
      `radial-gradient(ellipse at 82% 52%, rgba(${rgb},.18) 0%, transparent 50%),` +
      `linear-gradient(160deg, #e8d5f5 0%, #dde8fb 28%, #efe4fb 55%, #f8dde8 80%, #fce8d5 100%)`;
  }
  const qlBg = document.getElementById('qlBgImg');
  if (qlBg)  qlBg.src = card.poster;
  const accent = document.getElementById('qlAccent');
  if (accent) accent.style.color = card.color;
  const cta = document.getElementById('qlCta');
  if (cta) {
    cta.style.background = `linear-gradient(135deg, ${card.color}, ${card.color}cc)`;
    cta.style.boxShadow  = `0 6px 28px rgba(${rgb},.5), 0 2px 8px rgba(0,0,0,.1)`;
  }

  const fl = document.querySelector('.carousel__fade--l');
  const fr = document.querySelector('.carousel__fade--r');
  if (fl) fl.style.background = `linear-gradient(to right, rgba(${rgb},.18), transparent)`;
  if (fr) fr.style.background = `linear-gradient(to left, rgba(${rgb},.14), transparent)`;

  updateDots();
}

function goToCard(idx) {
  const n = MUSIC_EXAMPLES.length;
  activeIndex = ((idx % n) + n) % n;
  const target = document.getElementById(`card-${MUSIC_EXAMPLES[activeIndex].id}`);
  if (target) target.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
  updateCards();
}

document.getElementById('carousel')?.addEventListener('scroll', function() {
  const cx  = this.getBoundingClientRect();
  const mid = cx.left + cx.width / 2;
  let ci = 0, cd = Infinity;
  MUSIC_EXAMPLES.forEach((card, i) => {
    const el = document.getElementById(`card-${card.id}`);
    if (!el) return;
    const d = Math.abs(mid - (el.getBoundingClientRect().left + el.offsetWidth / 2));
    if (d < cd) { cd = d; ci = i; }
  });
  if (ci !== activeIndex) { activeIndex = ci; updateCards(); }
}, { passive: true });


/* ── Vimeo — OTIMIZADO ──────────────────────────────────── */

/* Carrega a API do Vimeo uma única vez, sem bloqueios */
function loadVimeoAPI() {
  if (vimeoApiLoaded) return Promise.resolve();
  return new Promise((resolve) => {
    if (typeof Vimeo !== 'undefined') { vimeoApiLoaded = true; resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.defer = true;  /* adiado para não bloquear render */
    script.onload = () => { vimeoApiLoaded = true; resolve(); };
    document.body.appendChild(script);
  });
}

/* Cria o iframe com thumbnail placeholder e defer attribute.
   O player Vimeo só é instanciado no clique (lazy instantiation). */
async function initVimeoPlayer(id, autoplay = false) {
  if (vimeoPlayers[id]) return;  /* já criado, reutiliza */

  const card = MUSIC_EXAMPLES.find(c => c.id === id);
  if (!card) return;

  const mc = document.getElementById(`media-${id}`);
  if (!mc) return;

  /* Se já tem iframe, não recria */
  if (mc.querySelector('iframe')) return;

  /* Preconnect no vimeo para reduzir latência DNS */
  if (!document.querySelector('link[href*="player.vimeo.com"]')) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://player.vimeo.com';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  /* Monta iframe com defer + thumbnail placeholder */
  const vimeoUrl = `https://player.vimeo.com/video/${card.vimeoId}?autoplay=${autoplay ? 1 : 0}&loop=1&muted=0&dnt=1&responsive=1&player_id=vp-${id}`;
  const thumbnailUrl = `https://vumbnail.com/${card.vimeoId}.jpg`;

  const iframe = document.createElement('iframe');
  iframe.id = `vp-${id}`;
  iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('data-vimeo-defer', '');   /* defer nativo do Vimeo */
  iframe.setAttribute('loading', 'lazy');         /* lazy loading nativo */
  iframe.setAttribute('title', 'Vídeo Kids Music');
  iframe.src = vimeoUrl;
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 2rem;
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    display: block;
  `;

  /* Placeholder visual: mostra thumbnail enquanto iframe carrega */
  const placeholder = document.createElement('div');
  placeholder.style.cssText = `
    position: absolute;
    inset: 0;
    border-radius: 2rem;
    background: url('${thumbnailUrl}') center/cover no-repeat;
    z-index: 1;
    pointer-events: none;
  `;

  /* Overlay transparente que cobre a UI nativa do Vimeo (barra, logo, etc.)
     pointer-events:none = não bloqueia cliques; z-index alto = fica na frente */
  const uiOverlay = document.createElement('div');
  uiOverlay.setAttribute('aria-hidden', 'true');
  uiOverlay.style.cssText = `
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
    border-radius: 2rem;
    background: transparent;
  `;

  mc.appendChild(placeholder);
  mc.appendChild(iframe);
  mc.appendChild(uiOverlay);

  /* Quando iframe dispara load, fade-in suave */
  iframe.addEventListener('load', () => {
    iframe.style.opacity = '1';
    placeholder.style.opacity = '0';
    placeholder.style.transition = 'opacity 0.3s ease';
    setTimeout(() => placeholder.remove(), 300);
  });

  /* Instancia API e conecta player */
  await loadVimeoAPI();

  try {
    const player = new Vimeo.Player(iframe);
    vimeoPlayers[id] = player;

    player.on('timeupdate', (data) => {
      if (playingId === id && data.duration) {
        const bar = document.getElementById(`bar-${id}`);
        if (bar) bar.style.width = (data.seconds / data.duration * 100) + '%';
      }
    });
  } catch (e) {
    console.warn('Vimeo player init error:', e);
  }
}

async function toggleVideo(id) {
  const idx = MUSIC_EXAMPLES.findIndex(c => c.id === id);
  const btn = document.getElementById(`play-${id}`);
  if (!btn) return;
  if (idx !== activeIndex) { goToCard(idx); setTimeout(() => toggleVideo(id), 400); return; }
  const isPlaying = playingId === id;

  if (playingId !== null && playingId !== id) {
    const op = vimeoPlayers[playingId];
    const ob = document.getElementById(`play-${playingId}`);
    const om = document.getElementById(`media-${playingId}`);
    if (op) { op.pause(); op.setVolume(0); }
    if (ob) { ob.innerHTML = PLAY_SVG; ob.classList.remove('playing'); }
    if (om) om.classList.remove('active');
  }

  if (isPlaying) {
    const player = vimeoPlayers[id];
    if (player) { await player.pause(); await player.setVolume(0); }
    playingId = null;
    btn.innerHTML = PLAY_SVG;
    btn.classList.remove('playing');
    document.getElementById(`media-${id}`)?.classList.remove('active');
  } else {
    btn.classList.add('is-loading');
    btn.innerHTML = '<div class="loader-spinner"></div>';
    try {
      /* Inicialização lazy — só agora, no clique do usuário */
      await initVimeoPlayer(id);
      const player = vimeoPlayers[id];
      if (!player) throw new Error('not ready');

      const media = document.getElementById(`media-${id}`);
      const iframe = media?.querySelector('iframe');

      /* Ativa visual do media container */
      if (media) media.classList.add('active');

      /* Garante que thumbnail/placeholder está visível até iframe carregar */
      if (iframe) iframe.style.opacity = '1';

      player.setMuted(false);
      player.setVolume(1);
      await player.play();

      playingId = id;
      btn.classList.remove('is-loading');
      btn.innerHTML = PAUSE_SVG;
      btn.classList.add('playing');
    } catch (err) {
      btn.classList.remove('is-loading');
      btn.innerHTML = PLAY_SVG;
      console.warn('Video playback error:', err);
    }
  }
}


/* ══════════════════════════════════════════════════════════
   LOADING SCREEN — TELA 2
   ══════════════════════════════════════════════════════════ */
const LS_STEPS = [
  'Recebendo informações...',
  'Analisando a personalidade...',
  'Escolhendo melodia e ritmo...',
  'Compondo a letra exclusiva...',
  'Ajustando voz e arranjo...',
  'Preparando sua música... ✨',
];

const LS_PROGRESS = [8, 22, 42, 62, 80, 100];

function buildLoadingParticles() {
  const container = document.getElementById('lsParticles');
  if (!container) return;
  container.innerHTML = '';
  const count = 28;
  const colors = ['rgba(255,255,255,.18)', 'rgba(249,168,212,.3)', 'rgba(196,181,253,.25)', 'rgba(186,230,253,.2)'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'ls-particle';
    const size = 4 + Math.random() * 10;
    const x    = Math.random() * 100;
    const delay = Math.random() * 5;
    const dur   = 4 + Math.random() * 6;
    const col   = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; bottom:-${size}px;
      background:${col};
      animation: lsParticleFloat ${dur}s ease-in-out ${delay}s infinite;
    `;
    container.appendChild(p);
  }

  // Adiciona keyframes dinâmicos para as partículas
  if (!document.getElementById('ls-particle-style')) {
    const style = document.createElement('style');
    style.id = 'ls-particle-style';
    style.textContent = `
      @keyframes lsParticleFloat {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: .7; }
        100% { transform: translateY(-110vh) scale(.6); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

function showLoadingScreen(nome) {
  buildLoadingParticles();

  const ls    = document.getElementById('loadingScreen');
  const bar   = document.getElementById('lsBar');
  const status = document.getElementById('lsStatus');
  const lsNome = document.getElementById('lsNome');

  if (lsNome) lsNome.textContent = nome || 'sua criança';
  ls.classList.add('active');

  let step = 0;
  if (bar)    bar.style.width = LS_PROGRESS[0] + '%';
  if (status) { status.style.animation = 'none'; void status.offsetWidth; status.style.animation = ''; status.textContent = LS_STEPS[0]; }

  const totalDuration = 4200; // ms total da tela
  const stepInterval  = Math.floor(totalDuration / (LS_STEPS.length - 1));

  const stepTimer = setInterval(() => {
    step++;
    if (step >= LS_STEPS.length) { clearInterval(stepTimer); return; }
    if (bar)    bar.style.width = LS_PROGRESS[step] + '%';
    if (status) {
      status.style.animation = 'none';
      void status.offsetWidth;
      status.style.animation = 'lsStatusFade .6s ease';
      status.textContent = LS_STEPS[step];
    }
  }, stepInterval);

  // Avança para a página de vendas após totalDuration + 300ms de folga
  setTimeout(() => {
    clearInterval(stepTimer);
    ls.classList.remove('active');
    showSalesPage();
  }, totalDuration + 300);
}


/* ══════════════════════════════════════════════════════════
   PÁGINA DE VENDAS — TELA 3
   ══════════════════════════════════════════════════════════ */
function buildSalesTestimonials() {
  const track = document.getElementById('spTrack');
  const dotsEl = document.getElementById('spDots');
  if (!track) return;

  track.innerHTML = PREMIUM_TESTIMONIALS.map((item) => `
    <article class="sale-proof__slide">
      <img class="sale-proof__img" src="${item.image}" alt="${item.alt}" loading="lazy" />
    </article>
  `).join('');

  if (dotsEl) {
    dotsEl.innerHTML = PREMIUM_TESTIMONIALS.map((_, i) => (
      `<button class="sp-carousel-dot${i === 0 ? ' active' : ''}" onclick="goToTestimonial(${i})" aria-label="Depoimento ${i + 1}"></button>`
    )).join('');
  }

  spTestimonialIndex = 0;
  goToTestimonial(0);
  setupTestimonialSwipe();
}

function goToTestimonial(idx) {
  spTestimonialIndex = idx;
  const track = document.getElementById('spTrack');
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.sp-carousel-dot').forEach((d,i) =>
    d.classList.toggle('active', i === idx)
  );
}

function nextTestimonial() {
  goToTestimonial((spTestimonialIndex + 1) % TESTIMONIALS.length);
}

function prevTestimonial() {
  goToTestimonial((spTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
}

function buildDealList() {
  const el = document.getElementById('spDealList');
  if (!el) return;
  el.innerHTML = DEAL_FEATURES.map(f =>
    `<li class="sp-deal-item">${f}</li>`
  ).join('');
}

function setTodayDate() {
  const el = document.getElementById('spDate');
  if (!el) return;
  const now = new Date();
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  el.textContent = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]}`;
}

function launchEntranceStars(nome) {
  const area = document.getElementById('spEntranceStars');
  if (!area) return;
  area.innerHTML = '';
  const colors = ['#ec4899','#f9a8d4','#8b5cf6','#c4b5fd','#3b82f6','#93c5fd','#f59e0b','#fde68a','#10b981','#6ee7b7','#ff6b6b','#ffd93d'];
  const shapes = ['50%', '2px', '50% 0 50% 0', '0 50% 0 50%'];
  for (let i = 0; i < 48; i++) {
    const el = document.createElement('div');
    const size = 7 + Math.random() * 12;
    const isRect = Math.random() > .5;
    el.style.cssText = `
      width:${isRect ? size * 2 : size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${shapes[Math.floor(Math.random() * shapes.length)]};
      left:${Math.random() * 100}%;
      top:${10 + Math.random() * 80}%;
      animation-delay:${Math.random() * 1.2}s;
      animation-duration:${1.6 + Math.random() * 1.4}s;
    `;
    el.className = 'sp-entrance-star';
    area.appendChild(el);
  }
  setTimeout(() => { area.innerHTML = ''; }, 4000);
}

function launchSalesConfetti() {
  const area = document.getElementById('spConfettiArea');
  if (!area) return;
  area.innerHTML = '';
  const colors = ['#ec4899','#f9a8d4','#8b5cf6','#c4b5fd','#3b82f6','#93c5fd','#f59e0b','#fde68a','#10b981','#6ee7b7'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'sp-conf-piece';
    const size = 6 + Math.random() * 10;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${-size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      animation-duration:${1.2 + Math.random() * 1.8}s;
      animation-delay:${Math.random() * .8}s;
      opacity:0;
    `;
    area.appendChild(p);
  }
}

// Canvas confetti grande (reutiliza lógica original com mais partículas)
function launchConfetti() {
  const canvas = document.getElementById('confCanvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#ec4899','#f9a8d4','#8b5cf6','#c4b5fd','#3b82f6','#f59e0b','#ffffff','#10b981'];
  const pieces = Array.from({ length: 160 }, () => ({
    x:  Math.random() * canvas.width,
    y:  -20 - Math.random() * 150,
    w:  6 + Math.random() * 10,
    h:  6 + Math.random() * 10,
    r:  Math.random() * Math.PI * 2,
    dr: (Math.random() - .5) * .22,
    vx: (Math.random() - .5) * 5,
    vy: 2.5 + Math.random() * 4.5,
    col: colors[Math.floor(Math.random() * colors.length)],
    op: 1
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.r += p.dr;
      if (frame > 80) p.op = Math.max(0, p.op - .012);
      if (p.y < canvas.height && p.op > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.op;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.col;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      }
    });
    frame++;
    if (alive && frame < 350) requestAnimationFrame(draw);
    else canvas.style.display = 'none';
  }
  draw();
}

function buildSalesCopy(data) {
  const nome  = data.nome || 'sua criança';
  const perso = [...(data.personalidade || []), data.persFree].filter(Boolean).join(' e ');
  const univ  = [...(data.universo || []), data.universoFree].filter(Boolean).join(', ');

  const nameEl = document.getElementById('spNome');
  if (nameEl) nameEl.textContent = nome;

  const subEl = document.getElementById('spSub');
  if (subEl) {
    const fragments = [];
    if (perso) fragments.push(`${nome} é ${perso}`);
    if (univ) fragments.push(`ama ${univ}`);

    subEl.textContent = fragments.length
      ? `Com tudo o que você contou — ${fragments.join(' e ')} — a parte criativa já foi preparada. Agora só falta concluir o pagamento para garantir a entrega no seu WhatsApp.`
      : `O presente já foi encaminhado. Agora só falta concluir o pagamento para garantir a entrega no seu WhatsApp.`;
  }
}

let _salesData = null;

function showSalesPage() {
  buildDealList();
  buildSalesTestimonials();
  setTodayDate();

  if (_salesData) buildSalesCopy(_salesData);

  const sp = document.getElementById('salesPage');
  sp.classList.add('active');

  // Scroll para o topo
  const scroll = sp.querySelector('.sp-scroll');
  if (scroll) scroll.scrollTop = 0;

  // Efeitos de entrada com leve delay para o fade-in terminar
  setTimeout(() => {
    launchEntranceStars(_salesData?.nome);
    launchSalesConfetti();
    launchConfetti();
  }, 250);

  // WhatsApp input mask
  const wppInput = document.getElementById('wpp');
  if (wppInput && !wppInput.dataset.masked) {
    wppInput.dataset.masked = 'true';
    wppInput.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,11);
      if (v.length > 10)     v = v.replace(/^(\d{2})(\d{5})(\d{4})$/,'($1) $2-$3');
      else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d*)$/,'($1) $2-$3');
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d*)$/,'($1) $2');
      this.value = v;
    });
  }

  // Auto-avança depoimentos a cada 5s
  setInterval(() => {
    nextTestimonial();
  }, 5000);
}


/* ══════════════════════════════════════════════════════════
   QUIZ — LÓGICA COMPLETA (preservada)
   ══════════════════════════════════════════════════════════ */
(function() {
  const TOTAL = 8;
  let cur = 1;
  const data = {
    rel:'', nome:'', idade:'', oc:'',
    personalidade:[], persFree:'',
    universo:[], universoFree:'',
    hist:'', clima:'', estilo:'', ref:'', whatsapp:''
  };

  let pendingPayload = null;
  const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbysAvegPSUlDcbJWX0XSYqUjRwPC0krH9BdJlXmt6-bMsXZDFUOHLcHWQbeE3ZnUS/exec";

  function init() {
    document.querySelectorAll('#gRel .ocard').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('#gRel .ocard').forEach(x => x.classList.remove('sel'));
        c.classList.add('sel');
        data.rel = c.dataset.v;
      });
    });

    document.querySelectorAll('#gOc .ocard').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('#gOc .ocard').forEach(x => x.classList.remove('sel'));
        c.classList.add('sel');
        data.oc = c.dataset.v;
        setTimeout(next, 1000);
      });
    });

    document.querySelectorAll('#gPerso .ocard').forEach(c => {
      c.addEventListener('click', () => {
        const v = c.dataset.v;
        if (v === '__free__') {
          const isSel = c.classList.contains('sel');
          if (!isSel && data.personalidade.length >= 3) { showErr('Limite atingido! Remova uma para adicionar outra.'); return; }
          c.classList.toggle('sel');
          document.getElementById('persFreeField').style.display = c.classList.contains('sel') ? 'block' : 'none';
          if (!c.classList.contains('sel')) { data.persFree = ''; document.getElementById('persFree').value = ''; }
        } else {
          if (c.classList.contains('sel')) {
            c.classList.remove('sel');
            data.personalidade = data.personalidade.filter(x => x !== v);
          } else if (data.personalidade.length < 3) {
            c.classList.add('sel');
            data.personalidade.push(v);
          } else {
            showErr('Limite atingido! Remova uma para adicionar outra.');
          }
        }
        const freeSelected = document.querySelector('#gPerso .ocard[data-v="__free__"]').classList.contains('sel');
        document.getElementById('pCnt').textContent = data.personalidade.length + (freeSelected ? 1 : 0);
      });
    });

    document.querySelectorAll('#gUniv .ocard').forEach(c => {
      c.addEventListener('click', () => {
        const v = c.dataset.v;
        if (c.classList.contains('sel')) {
          c.classList.remove('sel');
          data.universo = data.universo.filter(x => x !== v);
        } else {
          if (data.universo.length >= 3) { showErr('Limite atingido! Remova um para adicionar outro.'); return; }
          c.classList.add('sel');
          data.universo.push(v);
        }
      });
    });

    document.querySelectorAll('#gClima .ocard').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('#gClima .ocard').forEach(x => x.classList.remove('sel'));
        c.classList.add('sel');
        data.clima = c.dataset.v;
        setTimeout(next, 1000);
      });
    });

    document.querySelectorAll('#gEstilo .ocard').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('#gEstilo .ocard').forEach(x => x.classList.remove('sel'));
        c.classList.add('sel');
        data.estilo = c.dataset.v;
        setTimeout(next, 1000);
      });
    });

    document.querySelectorAll('.qi, .qt').forEach(el => {
      el.addEventListener('input', () => el.style.borderColor = '');
    });
  }

  function updateUI() {
    document.getElementById('sNum').textContent = String(cur).padStart(2,'0');
    document.getElementById('pFill').style.width = (cur / TOTAL * 100) + '%';
    document.querySelectorAll('.qs').forEach(p =>
      p.classList.toggle('active', parseInt(p.dataset.s) === cur)
    );
    document.querySelector('.qb').scrollTop = 0;
    const nome = data.nome || 'essa criança';
    ['n3','n4','n5','n6','n7','n8'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = nome;
    });
    document.querySelectorAll('.milestone-pill').forEach(p => p.classList.remove('show'));
    if (cur === 4) setTimeout(() => document.getElementById('milestone4')?.classList.add('show'), 400);
    if (cur === 8) setTimeout(() => document.getElementById('milestone8')?.classList.add('show'), 400);
  }

  function save() {
    if (cur === 1) { data.nome = document.getElementById('nome').value.trim(); data.idade = document.getElementById('idade').value.trim(); }
    if (cur === 3) { data.persFree = document.getElementById('persFree')?.value.trim() || ''; }
    if (cur === 4) { data.universoFree = document.getElementById('universoFree').value.trim(); }
    if (cur === 5) { data.hist = document.getElementById('hist').value.trim(); }
    if (cur === 8) { data.ref  = document.getElementById('ref').value.trim(); }
  }

  function validate() {
    if (cur === 1) {
      if (!data.rel) { showErr('Selecione sua relação com a criança'); return false; }
      const n = document.getElementById('nome');
      if (!n.value.trim()) { n.style.borderColor = '#ef4444'; showErr('Digite o nome da criança'); return false; }
    }
    if (cur === 2 && !data.oc) { showErr('Selecione a ocasião'); return false; }
    if (cur === 3) {
      const freeSelected = document.querySelector('#gPerso .ocard[data-v="__free__"]').classList.contains('sel');
      if (data.personalidade.length === 0 && !freeSelected) { showErr('Selecione pelo menos 1 característica'); return false; }
      if (freeSelected && !document.getElementById('persFree').value.trim()) {
        document.getElementById('persFree').style.borderColor = '#ef4444';
        showErr('Descreva a personalidade'); return false;
      }
    }
    if (cur === 4) {
      if (data.universo.length === 0 && !document.getElementById('universoFree').value.trim()) {
        showErr('Selecione pelo menos 1 universo ou descreva no campo'); return false;
      }
    }
    if (cur === 5) {
      const h = document.getElementById('hist');
      if (!h.value.trim()) { h.style.borderColor = '#ef4444'; showErr('Conte a história'); return false; }
    }
    if (cur === 6 && !data.clima)  { showErr('Selecione o clima da música'); return false; }
    if (cur === 7 && !data.estilo) { showErr('Selecione o estilo musical'); return false; }
    return true;
  }

  function next() {
    if (!validate()) return;
    save();
    if (cur < TOTAL) { cur++; updateUI(); }
    else             { submit(); }
  }

  function goBack() {
    if (cur > 1) { cur--; updateUI(); }
    else         { saveToCache(); resetQuiz(); }
  }

  const CACHE_KEY = 'kidsmusic_quiz';

  function saveToCache() {
    save();
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, _cur: cur })); } catch(e) {}
  }

  function restoreFromCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      Object.assign(data, {
        rel: saved.rel||'', nome: saved.nome||'', idade: saved.idade||'',
        oc: saved.oc||'', personalidade: saved.personalidade||[],
        persFree: saved.persFree||'', universo: saved.universo||[],
        universoFree: saved.universoFree||'', hist: saved.hist||'',
        clima: saved.clima||'', estilo: saved.estilo||'', ref: saved.ref||''
      });
      cur = saved._cur || 1;

      if (data.nome)         document.getElementById('nome').value         = data.nome;
      if (data.idade)        document.getElementById('idade').value        = data.idade;
      if (data.hist)         document.getElementById('hist').value         = data.hist;
      if (data.ref)          document.getElementById('ref').value          = data.ref;
      if (data.universoFree) document.getElementById('universoFree').value = data.universoFree;
      if (data.persFree) {
        document.getElementById('persFree').value = data.persFree;
        document.getElementById('persFreeField').style.display = 'block';
      }
      if (data.rel) document.querySelectorAll('#gRel .ocard').forEach(c => { if (c.dataset.v === data.rel) c.classList.add('sel'); });
      if (data.oc)  document.querySelectorAll('#gOc  .ocard').forEach(c => { if (c.dataset.v === data.oc)  c.classList.add('sel'); });
      if (data.personalidade.length) document.querySelectorAll('#gPerso .ocard').forEach(c => { if (data.personalidade.includes(c.dataset.v)) c.classList.add('sel'); });
      if (data.persFree) document.querySelector('#gPerso .ocard[data-v="__free__"]')?.classList.add('sel');
      document.getElementById('pCnt').textContent = data.personalidade.length + (data.persFree ? 1 : 0);
      if (data.universo.length) document.querySelectorAll('#gUniv .ocard').forEach(c => { if (data.universo.includes(c.dataset.v)) c.classList.add('sel'); });
      if (data.clima)  document.querySelectorAll('#gClima  .ocard').forEach(c => { if (c.dataset.v === data.clima)  c.classList.add('sel'); });
      if (data.estilo) document.querySelectorAll('#gEstilo .ocard').forEach(c => { if (c.dataset.v === data.estilo) c.classList.add('sel'); });
      return true;
    } catch(e) { return false; }
  }

  function clearCache() {
    try { localStorage.removeItem(CACHE_KEY); } catch(e) {}
  }

  function submit() {
    save();

    const persoFull = [...data.personalidade, data.persFree].filter(Boolean).join(', ');
    const univFull  = [...data.universo, data.universoFree].filter(Boolean).join(', ');

    pendingPayload = {
      paraQuem: data.rel, nome: data.nome, idade: data.idade,
      momento: data.oc, personalidade: persoFull, universo: univFull,
      historia: data.hist, clima: data.clima, estilo: data.estilo,
      referencia: data.ref, whatsapp: '', status: 'Quiz Concluído'
    };

    // Salva dados para a página de vendas
    _salesData = { ...data, persoFull, univFull };

    // Inicia a tela de loading
    showLoadingScreen(data.nome);

      // Fecha o quiz overlay
    document.getElementById('quiz').classList.remove('active');
    document.body.style.overflow = ''; 
  }

  function resetQuiz() {
    cur = 1;
    Object.assign(data, {
      rel:'', nome:'', idade:'', oc:'',
      personalidade:[], persFree:'',
      universo:[], universoFree:'',
      hist:'', clima:'', estilo:'', ref:'', whatsapp:''
    });
    pendingPayload = null;

    document.querySelectorAll('.ocard').forEach(c => c.classList.remove('sel'));
    document.querySelectorAll('.qi, .qt').forEach(i => { i.value = ''; i.style.borderColor = ''; });
    document.getElementById('pCnt').textContent = '0';
    document.getElementById('persFreeField').style.display = 'none';

    document.getElementById('quiz').classList.remove('active');
    document.body.style.overflow = '';
    updateUI();
  }

  function openQuiz() {
    document.getElementById('quiz').classList.add('active');
    document.body.style.overflow = 'hidden';
    const hadCache = restoreFromCache();
    updateUI();
    if (hadCache && cur > 1) setTimeout(() => showErr('✅ Seus dados foram salvos! Continue de onde parou 🎵'), 400);
  }

  let eTimer = null;
  function showErr(msg) {
    const t = document.getElementById('eTost');
    t.textContent = msg;
    t.classList.add('show');
    if (eTimer) clearTimeout(eTimer);
    eTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // Checkout — chamado pelo botão da página de vendas
  window.checkout = function() {
    const wppInput = document.getElementById('wpp');
    const wrap     = document.getElementById('spWppWrap');
    const rawNum   = wppInput.value.replace(/\D/g,'');

    if (rawNum.length < 10) {
      if (wrap) wrap.style.borderColor = '#ef4444';
      wppInput.focus();
      showErr('Digite seu WhatsApp com DDD para receber sua música');
      setTimeout(() => { if (wrap) wrap.style.borderColor = ''; }, 3000);
      return;
    }

    const btn = document.getElementById('ctaBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Redirecionando...'; }

    const intlNum = '55' + rawNum;

    if (pendingPayload) {
      pendingPayload.whatsapp = wppInput.value.trim();
      pendingPayload.status   = 'Checkout Iniciado';
      fetch(URL_PLANILHA, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(pendingPayload)
      }).catch(err => console.error('Erro ao salvar:', err));
    }

    clearCache();
    // TODO: insira seu link de checkout aqui
    const checkoutBase = 'https://pay.cakto.com.br/h3srsgc_866648';
    window.open(checkoutBase + '?phone=' + intlNum, '_blank');
  };

  window.openQuiz  = openQuiz;
  window.next      = next;
  window.goBack    = goBack;
  window.resetQuiz = resetQuiz;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ══════════════════════════════════════════════════════════
   EXIT INTENT
   — Quiz:  1 exibição, contagem isolada (km_exit_quiz)
   — Vendas: 1 exibição, contagem isolada (km_exit_sales)
   ══════════════════════════════════════════════════════════ */
(function() {
  const MIN_DELAY = 3500;

  // ── Contadores isolados por contexto ──────────────────
  const KEYS = { quiz: 'km_exit_quiz', sales: 'km_exit_sales' };
  function getCount(k) { try { return parseInt(sessionStorage.getItem(k)||'0',10); } catch(e){ return 0; } }
  function incCount(k) { try { sessionStorage.setItem(k, String(getCount(k)+1)); } catch(e){} }
  function canShowCtx(k) { return getCount(k) < 1; }

  // ── Helpers de estado ─────────────────────────────────
  function isQuizOpen()    { return document.getElementById('quiz')?.classList.contains('active'); }
  function isSalesOpen()   { return document.getElementById('salesPage')?.classList.contains('active'); }
  function isLoadingOpen() { return document.getElementById('loadingScreen')?.classList.contains('active'); }
  function isMobile()      { return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768; }

  // ── Copy ──────────────────────────────────────────────
  const COPY = {
    page: {
      badge: 'Espera um segundo',
      title: 'Sua música ainda <span class="exit-title-accent">não foi criada</span>',
      body:  'Por menos de um café, sua criança terá uma música única no mundo — com o nome e a história dela. Esse presente ela vai pedir pra ouvir toda noite.',
      cta:   'Quero criar a música agora',
      dismiss: 'Não, prefiro dar um presente comum',
      action: 'openQuiz'
    },
    quiz: {
      badge: 'Quase lá',
      title: 'Seus dados serão <span class="exit-title-accent">perdidos se sair agora</span>',
      body:  'Você já dedicou seu tempo para personalizar esse presente. Falta muito pouco — e no final sua criança vai ter uma música que só ela tem no mundo inteiro.',
      cta:   'Continuar e finalizar minha música',
      dismiss: 'Deixar pra depois e perder os dados',
      action: 'openQuiz'
    },
    sales: {
      badge: 'Falta apenas 1 passo',
      title: 'Não desista da música de <span class="exit-title-accent" id="exitSalesName">sua criança</span>',
      body:  'Custa menos que um lanche — e ela vai guardar esse presente pra sempre.',
      cta:   'Fazer pagamento',
      dismiss: 'Não, prefiro dar um presente comum',
      action: 'leadModal'
    }
  };

  // ── Modal ─────────────────────────────────────────────
  let modalShown = false;
  let pageReadyTime = Date.now();
  let pendingAction = 'openQuiz';

  function readyLongEnough() { return (Date.now() - pageReadyTime) >= MIN_DELAY; }

  function showModal(ctx) {
    if (modalShown || !readyLongEnough() || isLoadingOpen()) return;
    const key = ctx === 'sales' ? KEYS.sales : KEYS.quiz;
    if (!canShowCtx(key)) return;

    modalShown = true;
    incCount(key);
    pendingAction = COPY[ctx]?.action || 'openQuiz';

    const copy = COPY[ctx] || COPY.page;
    document.getElementById('exitBadge').textContent    = copy.badge;
    document.getElementById('exitModalTitle').innerHTML = copy.title;
    document.getElementById('exitBody').textContent     = copy.body;
    document.getElementById('exitCta').textContent      = copy.cta;
    document.getElementById('exitDismiss').textContent  = copy.dismiss;

    // Injeta nome da criança no modal de vendas
    if (ctx === 'sales' && _salesData?.nome) {
      const nameEl = document.getElementById('exitSalesName');
      if (nameEl) nameEl.textContent = _salesData.nome;
    }

    document.getElementById('exitModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(accept) {
    document.getElementById('exitModal').classList.remove('active');
    modalShown = false;
    if (!isQuizOpen()) document.body.style.overflow = '';
    if (!accept) return;
    if (pendingAction === 'leadModal' && typeof window.openLeadModal === 'function') {
      window.openLeadModal('hero');
    } else if (pendingAction === 'openQuiz' && typeof window.openQuiz === 'function') {
      window.openQuiz();
    }
  }

  function bindModalButtons() {
    document.getElementById('exitCta')?.addEventListener('click',    () => closeModal(true));
    document.getElementById('exitDismiss')?.addEventListener('click', () => closeModal(false));
    document.getElementById('exitOverlay')?.addEventListener('click', () => closeModal(false));
  }

  // ── QUIZ exit intent ──────────────────────────────────
  (function quizExit() {
    let listenersAdded = false;
    let historyBufferSet = false;
    let idleTimer = null;
    const IDLE_DELAY = 35000;

    function canShow() { return canShowCtx(KEYS.quiz) && readyLongEnough(); }

    function trigger() {
      if (!canShow()) return;
      const ctx = isQuizOpen() ? 'quiz' : (isSalesOpen() ? null : 'page');
      if (!ctx) return;
      showModal(ctx);
    }

    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { if (isQuizOpen()) showModal('quiz'); }, IDLE_DELAY);
    }

    function setupBackButtonTrap() {
      if (historyBufferSet) return;
      history.pushState({ exitBuffer: true }, '', location.href);
      historyBufferSet = true;
      window.addEventListener('popstate', function() {
        if (isSalesOpen() || isLoadingOpen()) return;
        history.pushState({ exitBuffer: true }, '', location.href);
        trigger();
      });
    }

    function onVisibilityChange() {
      if (document.visibilityState !== 'hidden') return;
      if (isLoadingOpen() || isSalesOpen()) return;
      trigger();
    }

    function onMouseLeave(e) { if (e.clientY <= 10) trigger(); }

    function addListeners() {
      if (listenersAdded) return;
      listenersAdded = true;
      document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
      if (isMobile()) {
        document.addEventListener('touchstart', resetIdleTimer, { passive: true });
        document.addEventListener('touchend',   resetIdleTimer, { passive: true });
        document.addEventListener('touchend', function setupBuffer() {
          setupBackButtonTrap();
          document.removeEventListener('touchend', setupBuffer);
        }, { once: true, passive: true });
        resetIdleTimer();
      } else {
        document.addEventListener('mouseleave', onMouseLeave, { passive: true });
        document.addEventListener('mousemove',  resetIdleTimer, { passive: true });
        document.addEventListener('click',      resetIdleTimer, { passive: true });
        document.addEventListener('keydown',    resetIdleTimer, { passive: true });
        document.addEventListener('click', function setupBuffer() {
          setupBackButtonTrap();
          document.removeEventListener('click', setupBuffer);
        }, { once: true });
      }
    }

    function interceptQuizClose() {
      const closeBtn = document.querySelector('.q-close');
      if (!closeBtn) return;
      closeBtn.addEventListener('click', function(e) {
        if (canShow() && isQuizOpen()) {
          e.stopImmediatePropagation();
          showModal('quiz');
        }
      }, true);
    }

    function init() {
      interceptQuizClose();
      setTimeout(addListeners, MIN_DELAY);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();

  // ── VENDAS exit intent ────────────────────────────────
  (function salesExit() {
    let listenersAdded = false;
    let historyBufferSet = false;
    let idleTimer = null;
    let lastScrollY = 0, lastScrollTime = Date.now();
    const IDLE_DELAY = 25000;

    function canShow() { return canShowCtx(KEYS.sales) && readyLongEnough() && isSalesOpen() && !isLoadingOpen(); }

    function trigger() { if (canShow()) showModal('sales'); }

    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(trigger, IDLE_DELAY);
    }

    function onScroll() {
      const spScroll = document.querySelector('#salesPage .sp-scroll');
      if (!spScroll) return;
      const now = Date.now();
      const currentY = spScroll.scrollTop;
      const dy = currentY - lastScrollY;
      const dt = now - lastScrollTime;
      // Scroll rápido para cima = sinal de saída
      if (dt > 0 && dt < 200 && (dy / dt) < -1 && currentY < 400) trigger();
      lastScrollY = currentY;
      lastScrollTime = now;
      resetIdleTimer();
    }

    function onVisibilityChange() {
      if (document.visibilityState !== 'hidden') return;
      if (!isSalesOpen()) return;
      trigger();
    }

    function setupBackButtonTrap() {
      if (historyBufferSet) return;
      history.pushState({ exitBuffer: true }, '', location.href);
      historyBufferSet = true;
      window.addEventListener('popstate', function() {
        if (!isSalesOpen()) return;
        history.pushState({ exitBuffer: true }, '', location.href);
        trigger();
      });
    }

    function addListeners() {
      if (listenersAdded) return;
      listenersAdded = true;
      document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
      const spScroll = document.querySelector('#salesPage .sp-scroll');
      if (spScroll) spScroll.addEventListener('scroll', onScroll, { passive: true });
      if (isMobile()) {
        document.addEventListener('touchstart', resetIdleTimer, { passive: true });
        document.addEventListener('touchend',   resetIdleTimer, { passive: true });
        document.addEventListener('touchend', function setupBuffer() {
          setupBackButtonTrap();
          document.removeEventListener('touchend', setupBuffer);
        }, { once: true, passive: true });
      } else {
        document.addEventListener('mouseleave', function(e) { if (e.clientY <= 10) trigger(); }, { passive: true });
        document.addEventListener('mousemove', resetIdleTimer, { passive: true });
        document.addEventListener('click', function setupBuffer() {
          setupBackButtonTrap();
          document.removeEventListener('click', setupBuffer);
        }, { once: true });
      }
      resetIdleTimer();
    }

    // Ativa listeners assim que a sales page abre
    const _origShowSalesPage = window.showSalesPage;
    window.showSalesPage = function() {
      if (_origShowSalesPage) _origShowSalesPage.apply(this, arguments);
      lastScrollY = 0;
      lastScrollTime = Date.now();
      setTimeout(addListeners, MIN_DELAY);
    };
  })();

  // ── Bind botões do modal ──────────────────────────────
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindModalButtons);
  else bindModalButtons();

  window._exitIntent = { showModal, closeModal };
})();


/* ══════════════════════════════════════════════════════════
   INIT — SEM PRE-CARREGAMENTO DE PLAYERS VIMEO
   ══════════════════════════════════════════════════════════ */
buildCarousel();
updateCards();
/* 
   OTIMIZAÇÃO: Não inicializa players no carregamento da página.
   Players Vimeo são criados LAZILY apenas quando o usuário clica no botão play.
   Isso elimina 2-3s de delay no carregamento inicial da página.
*/
loadVimeoAPI();  /* pré-carrega script em background, sem bloquear render */

/* Expõe funções do carousel de depoimentos */
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.goToTestimonial = goToTestimonial;

/* ══════════════════════════════════════════════════════════
   SALES PAGE PREMIUM OVERRIDES — mobile first + lead modal
   ══════════════════════════════════════════════════════════ */
const PREMIUM_TESTIMONIALS = [
  { image: 'assets/instagram-dm.png',     alt: 'Print de depoimento de cliente 1' },
  { image: 'assets/instagram-dm (4).png', alt: 'Print de depoimento de cliente 2' },
  { image: 'assets/instagram-dm (3).png', alt: 'Print de depoimento de cliente 3' },
  { image: 'assets/instagram-dm (2).png', alt: 'Print de depoimento de cliente 4' },
];

const PREMIUM_DEAL_FEATURES = [
  'Composição completa (letra + melodia)',
  'Voz profissional de estúdio',
  'Arquivo MP3 em alta definição',
  'Capa do álbum personalizada',
  'Letra criada com base na história da criança',
  '2 versões para escolher — pague 1, leve 2',
];

const PREMIUM_FAQS = [
  {
    q: 'Em quanto tempo recebo a música?',
    a: 'Após a confirmação do pedido, nossa equipe começa imediatamente. No Plano Expresso, a entrega é feita em até 6 horas direto no seu WhatsApp.'
  },
  {
    q: 'E se eu ou a criança não gostarmos do resultado?',
    a: 'Se precisar, fazemos ajustes para melhorar a música. E se ainda assim não fizer sentido para você, existe garantia de 30 dias com devolução do valor.'
  },
  {
    q: 'Preciso escrever a letra ou entender de música?',
    a: 'Não. Você só conta o nome, gostos, personalidade e algumas memórias. Nossa equipe cuida de letra, melodia, interpretação e produção.'
  },
  {
    q: 'Quais estilos musicais vocês conseguem criar?',
    a: 'Pop infantil, gospel, sertanejo suave, pagode, MPB, forró e outras variações leves para criança. O estilo final segue o que você marcou no quiz.'
  },
  {
    q: 'O que exatamente eu recebo?',
    a: 'Você recebe a música em MP3, a capa personalizada e a letra final. No plano atual, também leva duas versões para comparar e escolher a preferida.'
  },
  {
    q: 'Os dados da criança e meu número ficam protegidos?',
    a: 'Sim. As informações são usadas somente para compor, entregar a música e confirmar o pedido. Não há envio de spam nem compartilhamento indevido.'
  }
];

const LEAD_MODAL_COPY = {
  hero: {
    chip: 'Finalização',
    title: (nome) => `Confirme seu WhatsApp para concluir o presente${nome ? ` de ${nome}` : ''}`,
    text: 'Depois disso, você segue para o checkout seguro e garante a entrega da música nesse número.',
    previewTitle: 'Entrega direto no seu WhatsApp',
    previewText: 'Use um número válido para receber a música e as confirmações do pedido.'
  },
  testimonials: {
    chip: 'Quero o mesmo resultado',
    title: () => 'Seu presente está pronto para ser confirmado',
    text: 'Informe seu WhatsApp para seguir ao pagamento e receber a música assim que ela for entregue.',
    previewTitle: 'Mesmo fluxo de quem já comprou',
    previewText: 'Pagamento seguro e envio direto no WhatsApp.'
  },
  compare: {
    chip: 'Não deixe pela metade',
    title: () => 'Falta só confirmar o WhatsApp para concluir esse presente',
    text: 'Você já preparou tudo. Agora é só informar o número de entrega e seguir para o checkout.',
    previewTitle: 'Recebimento no número informado',
    previewText: 'Sem spam. Só entrega, confirmação e suporte.'
  },
  pricing: {
    chip: 'Etapa final',
    title: () => 'Confirme seu WhatsApp e finalize o pagamento',
    text: 'Esse número será usado para entregar a música, atualizar o pedido e garantir que tudo chegue certo.',
    previewTitle: 'Pagamento + entrega no WhatsApp',
    previewText: 'Plano expresso, envio em até 6h e garantia de 30 dias.'
  }
};

let premiumAutoRotateTimer = null;
let leadModalSource = 'hero';
let premiumRevealObserver = null;
const legacyCheckout = window.checkout;
const leadSubmitDefaultHTML = 'Continuar para o checkout <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

function renderPremiumDealList() {
  const el = document.getElementById('spDealList');
  if (!el) return;
  el.innerHTML = PREMIUM_DEAL_FEATURES.map((item) => `
    <li class="sale-price-card__feature"><span class="sale-price-card__check">✓</span><span>${item}</span></li>
  `).join('');
}

function buildSalesTestimonials() {
  const track = document.getElementById('spTrack');
  const dotsEl = document.getElementById('spDots');
  if (!track) return;

  track.innerHTML = PREMIUM_TESTIMONIALS.map((item) => `
    <article class="sp-proof-slide">
      <img class="sp-proof-shot" src="${item.image}" alt="${item.alt}" loading="lazy" />
    </article>
  `).join('');

  if (dotsEl) {
    dotsEl.innerHTML = PREMIUM_TESTIMONIALS.map((_, i) => (
      `<button class="sp-carousel-dot${i === 0 ? ' active' : ''}" onclick="goToTestimonial(${i})" aria-label="Depoimento ${i + 1}"></button>`
    )).join('');
  }

  spTestimonialIndex = 0;
  goToTestimonial(0);
  setupTestimonialSwipe();
}

function goToTestimonial(idx) {
  const total = PREMIUM_TESTIMONIALS.length;
  if (!total) return;
  spTestimonialIndex = ((idx % total) + total) % total;
  const track = document.getElementById('spTrack');
  if (track) track.style.transform = `translateX(-${spTestimonialIndex * 100}%)`;
  document.querySelectorAll('.sp-carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === spTestimonialIndex);
  });
}

function nextTestimonial() {
  goToTestimonial(spTestimonialIndex + 1);
}

function prevTestimonial() {
  goToTestimonial(spTestimonialIndex - 1);
}

function setupTestimonialSwipe() {
  const viewport = document.querySelector('.sale-proof__viewport');
  if (!viewport || viewport.dataset.swipeBound === 'true') return;

  viewport.dataset.swipeBound = 'true';
  let startX = 0;
  let endX = 0;

  viewport.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextTestimonial();
    else prevTestimonial();
  }, { passive: true });
}

function buildFaq() {
  const list = document.getElementById('spFaqList');
  if (!list) return;

  list.innerHTML = PREMIUM_FAQS.map((item, i) => `
    <div class="sale-faq-item${i === 0 ? ' open' : ''}">
      <button class="sale-faq-btn" type="button" aria-expanded="${i === 0 ? 'true' : 'false'}">
        <span class="sale-faq-question">${item.q}</span>
        <span class="sale-faq-icon">+</span>
      </button>
      <div class="sale-faq-answer" style="max-height:${i === 0 ? '400px' : '0px'};opacity:${i === 0 ? '1' : '0'};">
        <div class="sale-faq-answer-inner">
          <p class="sale-faq-text">${item.a}</p>
        </div>
      </div>
    </div>
  `).join('');

  const firstActive = list.querySelector('.sale-faq-item.open .sale-faq-answer');
  if (firstActive) firstActive.style.maxHeight = firstActive.scrollHeight + 12 + 'px';

  list.querySelectorAll('.sale-faq-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.sale-faq-item');
      const answer = item.querySelector('.sale-faq-answer');
      const isOpen = item.classList.contains('open');

      list.querySelectorAll('.sale-faq-item').forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.sale-faq-btn')?.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.querySelector('.sale-faq-answer');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = '0px';
          otherAnswer.style.opacity = '0';
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 12 + 'px';
          answer.style.opacity = '1';
        }
      }
    });
  });
}

function setupSalesReveal() {
  const scrollRoot = document.querySelector('#salesPage .sp-scroll');
  const items = document.querySelectorAll('#salesPage .reveal');
  if (!scrollRoot || !items.length) return;

  if (premiumRevealObserver) premiumRevealObserver.disconnect();
  items.forEach((item) => item.classList.remove('visible'));

  premiumRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {
    root: scrollRoot,
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px'
  });

  items.forEach((item) => premiumRevealObserver.observe(item));
}

function setupLeadMask() {
  const input = document.getElementById('wpp');
  if (!input || input.dataset.masked) return;

  input.dataset.masked = 'true';
  input.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '').slice(0, 11);
    if (value.length > 10) value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    else if (value.length > 6) value = value.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
    else if (value.length > 2) value = value.replace(/^(\d{2})(\d*)$/, '($1) $2');
    this.value = value;
  });
}

function resetLeadModalState() {
  const btn = document.getElementById('ctaBtn');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = leadSubmitDefaultHTML;
  }
  const wrap = document.getElementById('spWppWrap');
  if (wrap) wrap.style.borderColor = '';
}

function updateLeadModalCopy() {
  const nome = _salesData?.nome || '';
  const copy = LEAD_MODAL_COPY[leadModalSource] || LEAD_MODAL_COPY.hero;

  const chip = document.getElementById('leadChip');
  const title = document.getElementById('leadModalTitle');
  const text = document.getElementById('leadModalText');
  const previewTitle = document.getElementById('leadPreviewTitle');
  const previewText = document.getElementById('leadPreviewText');

  if (chip) chip.textContent = copy.chip;
  if (title) title.textContent = copy.title(nome);
  if (text) text.textContent = copy.text;
  if (previewTitle) previewTitle.textContent = copy.previewTitle;
  if (previewText) previewText.textContent = copy.previewText;
}

function openLeadModal(source = 'hero') {
  leadModalSource = source;
  updateLeadModalCopy();
  resetLeadModalState();
  setupLeadMask();

  const modal = document.getElementById('leadModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const input = document.getElementById('wpp');
  setTimeout(() => input?.focus(), 120);
}

function closeLeadModal() {
  const modal = document.getElementById('leadModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  resetLeadModalState();
}

function showSalesPage() {
  renderPremiumDealList();
  buildSalesTestimonials();
  buildFaq();
  setTodayDate();
  setupLeadMask();

  if (_salesData) buildSalesCopy(_salesData);

  const sp = document.getElementById('salesPage');
  if (!sp) return;
  sp.classList.add('active');

  const scroll = sp.querySelector('.sp-scroll');
  if (scroll) scroll.scrollTop = 0;

  requestAnimationFrame(setupSalesReveal);

  setTimeout(() => {
    launchEntranceStars(_salesData?.nome);
    launchSalesConfetti();
    launchConfetti();
  }, 240);

  if (premiumAutoRotateTimer) clearInterval(premiumAutoRotateTimer);
  premiumAutoRotateTimer = setInterval(() => nextTestimonial(), 4800);
}

if (typeof legacyCheckout === 'function') {
  window.checkout = function() {
    const raw = document.getElementById('wpp')?.value.replace(/\D/g, '') || '';
    legacyCheckout();
    if (raw.length >= 10) {
      setTimeout(() => {
        closeLeadModal();
      }, 220);
    }
  };
}

window.openLeadModal = openLeadModal;
window.closeLeadModal = closeLeadModal;
window.showSalesPage = showSalesPage;
window.goToTestimonial = goToTestimonial;
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.getElementById('leadModal')?.classList.contains('active')) {
    closeLeadModal();
  }
});

/* ══════════════════════════════════════════════════════════
   XSP FINAL TRANSPLANT — overrides limpos da sales page
   ══════════════════════════════════════════════════════════ */
const XSP_TESTIMONIALS = [
  { image: 'assets/instagram-dm.png', alt: 'Print real de depoimento 1' },
  { image: 'assets/instagram-dm (4).png', alt: 'Print real de depoimento 2' },
  { image: 'assets/instagram-dm (3).png', alt: 'Print real de depoimento 3' },
  { image: 'assets/instagram-dm (2).png', alt: 'Print real de depoimento 4' },
];

const XSP_PRICE_FEATURES = [
  'Composição completa (Letra + Melodia)',
  'Voz profissional de estúdio',
  'Arquivo MP3 em alta definição',
  'Capa do álbum personalizada',
  'Letra escrita pelos nossos compositores',
];

const XSP_FAQS = [
  {
    q: 'Em quanto tempo recebo a música?',
    a: 'Após o pedido e pagamento confirmados, nossa equipe começa imediatamente. O prazo padrão é de até 6h no Plano Expresso.'
  },
  {
    q: 'E se a criança — ou eu — não gostar?',
    a: 'Se acontecer, fazemos revisões gratuitas sem custo adicional. E se ainda assim não ficar bom, devolvemos 100% do valor pago em até 30 dias.'
  },
  {
    q: 'Preciso escrever a letra ou entender de música?',
    a: 'Não. Você só responde algumas perguntas simples sobre a criança. Nossa equipe de compositores faz todo o resto.'
  },
  {
    q: 'Quais estilos musicais vocês fazem?',
    a: 'Pop infantil, sertanejo, pagode, gospel, MPB, forró e outros estilos leves para criança. Você escolhe no pedido.'
  },
  {
    q: 'O que exatamente vou receber?',
    a: 'Você recebe o MP3 em alta qualidade, a capa personalizada e a letra da música. No Plano Expresso, leva 2 versões.'
  },
  {
    q: 'Os dados da criança ficam protegidos?',
    a: 'Sim. As informações são tratadas com sigilo e segurança, usadas apenas para compor, entregar a música e confirmar o pedido.'
  },
];

const XSP_LEAD_COPY = {
  hero: {
    chip: 'Finalização',
    title: (nome) => `Confirme seu WhatsApp para concluir o presente${nome ? ` de ${nome}` : ''}`,
    text: 'Depois disso, você segue para o checkout seguro e garante a entrega da música nesse número.',
    previewTitle: 'Entrega direto no seu WhatsApp',
    previewText: 'Use um número válido para receber a música e as confirmações do pedido.'
  },
  testimonials: {
    chip: 'Quero o mesmo resultado',
    title: () => 'Seu presente está pronto para ser confirmado',
    text: 'Informe seu WhatsApp para seguir ao pagamento e receber a música assim que ela for entregue.',
    previewTitle: 'Mesmo fluxo de quem já comprou',
    previewText: 'Pagamento seguro e envio direto no WhatsApp.'
  },
  compare: {
    chip: 'Não deixe pela metade',
    title: () => 'Falta só confirmar o WhatsApp para concluir esse presente',
    text: 'Você já preparou tudo. Agora é só informar o número de entrega e seguir para o checkout.',
    previewTitle: 'Recebimento no número informado',
    previewText: 'Sem spam. Só entrega, confirmação e suporte.'
  },
  pricing: {
    chip: 'Etapa final',
    title: () => 'Confirme seu WhatsApp e finalize o pagamento',
    text: 'Esse número será usado para entregar a música, atualizar o pedido e garantir que tudo llegue certo.',
    previewTitle: 'Pagamento + entrega no WhatsApp',
    previewText: 'Plano expresso, envio em até 6h e garantia de 30 dias.'
  }
};

function renderPremiumDealList() {
  const el = document.getElementById('spDealList');
  if (!el) return;
  el.innerHTML = XSP_PRICE_FEATURES.map((item) => `
    <li class="xsp-price-card__feature"><span class="xsp-price-card__check">✓</span><span>${item}</span></li>
  `).join('');
}

function buildSalesTestimonials() {
  const track = document.getElementById('spTrack');
  const dotsEl = document.getElementById('spDots');
  if (!track) return;

  track.innerHTML = XSP_TESTIMONIALS.map((item) => `
    <article class="xsp-proof-slide">
      <img class="xsp-proof-shot" src="${item.image}" alt="${item.alt}" loading="lazy" />
    </article>
  `).join('');

  if (dotsEl) {
    dotsEl.innerHTML = XSP_TESTIMONIALS.map((_, i) => (
      `<button class="sp-carousel-dot${i === 0 ? ' active' : ''}" onclick="goToTestimonial(${i})" aria-label="Depoimento ${i + 1}"></button>`
    )).join('');
  }

  spTestimonialIndex = 0;
  goToTestimonial(0);
  setupTestimonialSwipe();
}

function goToTestimonial(idx) {
  const total = XSP_TESTIMONIALS.length;
  if (!total) return;
  spTestimonialIndex = ((idx % total) + total) % total;
  const track = document.getElementById('spTrack');
  if (track) track.style.transform = `translateX(-${spTestimonialIndex * 100}%)`;
  document.querySelectorAll('.sp-carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === spTestimonialIndex);
  });
}

function nextTestimonial() {
  goToTestimonial(spTestimonialIndex + 1);
}

function prevTestimonial() {
  goToTestimonial(spTestimonialIndex - 1);
}

function setupTestimonialSwipe() {
  const viewport = document.querySelector('.xsp-carousel__viewport');
  if (!viewport || viewport.dataset.swipeBound === 'true') return;

  viewport.dataset.swipeBound = 'true';
  let startX = 0;
  let endX = 0;

  viewport.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextTestimonial();
    else prevTestimonial();
  }, { passive: true });
}

function buildFaq() {
  const list = document.getElementById('spFaqList');
  if (!list) return;

  list.innerHTML = XSP_FAQS.map((item, i) => `
    <div class="xsp-faq-item${i === 0 ? ' open' : ''}">
      <button class="xsp-faq-btn" type="button" aria-expanded="${i === 0 ? 'true' : 'false'}">
        <span class="xsp-faq-question">${item.q}</span>
        <span class="xsp-faq-icon">+</span>
      </button>
      <div class="xsp-faq-answer" style="max-height:${i === 0 ? '400px' : '0px'};opacity:${i === 0 ? '1' : '0'};">
        <div class="xsp-faq-answer-inner">
          <p class="xsp-faq-text">${item.a}</p>
        </div>
      </div>
    </div>
  `).join('');

  const firstActive = list.querySelector('.xsp-faq-item.open .xsp-faq-answer');
  if (firstActive) firstActive.style.maxHeight = firstActive.scrollHeight + 12 + 'px';

  list.querySelectorAll('.xsp-faq-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.xsp-faq-item');
      const answer = item.querySelector('.xsp-faq-answer');
      const isOpen = item.classList.contains('open');

      list.querySelectorAll('.xsp-faq-item').forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.xsp-faq-btn')?.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.querySelector('.xsp-faq-answer');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = '0px';
          otherAnswer.style.opacity = '0';
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 12 + 'px';
          answer.style.opacity = '1';
        }
      }
    });
  });
}

function buildSalesCopy(data) {
  const nome  = data.nome || 'sua criança';
  const perso = [...(data.personalidade || []), data.persFree].filter(Boolean).join(' e ');
  const univ  = [...(data.universo || []), data.universoFree].filter(Boolean).join(', ');

  const nameEl = document.getElementById('spNome');
  if (nameEl) nameEl.textContent = nome;

  const subEl = document.getElementById('spSub');
  if (subEl) {
    const parts = [];
    if (perso) parts.push(`${nome} é ${perso}`);
    if (univ) parts.push(`ama ${univ}`);

    subEl.textContent = parts.length
      ? `Com tudo o que você contou — ${parts.join(' e ')} — a parte criativa já foi preparada. Agora só falta concluir o pagamento para garantir a entrega no seu WhatsApp.`
      : `O presente já foi encaminhado. Agora só falta concluir o pagamento para garantir a entrega no seu WhatsApp.`;
  }
}

function updateLeadModalCopy() {
  const nome = _salesData?.nome || '';
  const copy = XSP_LEAD_COPY[leadModalSource] || XSP_LEAD_COPY.hero;
  const chip = document.getElementById('leadChip');
  const title = document.getElementById('leadModalTitle');
  const text = document.getElementById('leadModalText');
  const previewTitle = document.getElementById('leadPreviewTitle');
  const previewText = document.getElementById('leadPreviewText');
  if (chip) chip.textContent = copy.chip;
  if (title) title.textContent = copy.title(nome);
  if (text) text.textContent = copy.text;
  if (previewTitle) previewTitle.textContent = copy.previewTitle;
  if (previewText) previewText.textContent = copy.previewText;
}

function showSalesPage() {
  renderPremiumDealList();
  buildSalesTestimonials();
  buildFaq();
  setTodayDate();
  setupLeadMask();

  if (_salesData) buildSalesCopy(_salesData);

  const sp = document.getElementById('salesPage');
  if (!sp) return;
  sp.classList.add('active');
  const scroll = sp.querySelector('.sp-scroll');
  if (scroll) scroll.scrollTop = 0;
  requestAnimationFrame(setupSalesReveal);

  setTimeout(() => {
    launchEntranceStars(_salesData?.nome);
    launchSalesConfetti();
    launchConfetti();
  }, 240);

  if (premiumAutoRotateTimer) clearInterval(premiumAutoRotateTimer);
  premiumAutoRotateTimer = setInterval(() => nextTestimonial(), 4800);
}

window.goToTestimonial = goToTestimonial;
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.showSalesPage = showSalesPage;
