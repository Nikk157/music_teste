(function(){var _o=function(){return this};if(_o()!==window||!_o().document){while(true){}}})();(function(){var _t=setInterval(function(){if((function(){var d=new Date();debugger;return new Date()-d>100;})()){location.reload();}},3000);})();document.addEventListener('DOMContentLoaded', function() {
document.querySelectorAll('[data-_85]').forEach(function(el) {
var _85 = el.getAttribute('data-_85');
if (!_85) return;
el.removeAttribute('data-_85');
el.addEventListener('click', function(e) {
if (_85.indexOf('return false') !== -1) {
e.preventDefault();
return;
}
try {
var fn = new Function('event', 'with(window) { ' + _85 + '; }');
fn.call(window, e);
} catch(err) {
console.error('Erro ao executar ação:', _85, err);
}
});
});
});
const MUSIC_EXAMPLES = [
{
id: 1,
name: "Lucas",
theme: "Aventura no espaço",
vimeoId: "1191676534",
duration: "1:12",
poster: "Lucas_img.jpg",
color: "#0ea5e9",
glow: "rgba(14,165,233,.6)"
},
{
id: 2,
name: "Maria",
theme: "Historinha delicada",
vimeoId: "1191676533",
duration: "0:21",
poster: "Maria_img.jpg",
color: "#d946ef",
glow: "rgba(217,70,239,.6)"
},
{
id: 3,
name: "Luis",
theme: "Futebol e brincadeira",
vimeoId: "1191676535",
duration: "0:18",
poster: "Luis_img.png",
color: "#22c55e",
glow: "rgba(34,197,94,.6)"
},
{
id: 4,
name: "Larissa",
theme: "Momento fofo",
vimeoId: "1191674347",
duration: "0:16",
poster: "Larissa_img.jpg",
color: "#fb923c",
glow: "rgba(251,146,60,.6)"
},
{
id: 5,
name: "Ana",
theme: "Aniversário mágico",
vimeoId: "1191674348",
duration: "0:16",
poster: "Ana_img.jpg",
color: "#ec4899",
glow: "rgba(236,72,153,.6)"
},
{
id: 6,
name: "João",
theme: "Aventura espacial",
vimeoId: "1191674277",
duration: "0:16",
poster: "Joao_img.png",
color: "#6366f1",
glow: "rgba(99,102,241,.6)"
}
];
const TESTIMONIALS = [
{ initials:"LC", name:"Lucas Costa",    image:"instagram-dm.png", music:"Música da Sofia",     avatarColor:"#0ea5e9", playerColor:"#0ea5e9", topGrad:"linear-gradient(140deg,#e0f2fe 0%,#bae6fd 100%)" },
{ initials:"MS", name:"Mariana Santos", image:"instagram-dm (4).png", music:"Música do Davi",      avatarColor:"#10b981", playerColor:"#10b981", topGrad:"linear-gradient(140deg,#d1fae5 0%,#a7f3d0 100%)" },
{ initials:"RP", name:"Rafael Pereira", image:"instagram-dm (3).png", music:"Música da Valentina", avatarColor:"#f59e0b", playerColor:"#d97706", topGrad:"linear-gradient(140deg,#fef3c7 0%,#fde68a 100%)" },
{ initials:"AB", name:"Ana Beatriz",  image:"instagram-dm (2).png",   music:"Música do Miguel",    avatarColor:"#38bdf8", playerColor:"#0284c7", topGrad:"linear-gradient(140deg,#e0f2fe 0%,#bae6fd 100%)" },
];
const BAD_ITEMS = [
"Roupas ficam pequenas em 3 meses — e vão para o fundo do guarda-roupa.",
"Brinquedos viram bagunça no chão em menos de uma semana.",
"Chocolates acabam antes de terminar a festa.",
"Dinheiro em envelope: ela nem sabe o que ganhou.",
];
const GOOD_ITEMS = [
{ bold:"Única no mundo:",   rest:" só ela tem uma música com o próprio nome e história." },
{ bold:"Fica para sempre:", rest:" o arquivo nunca some, nunca estraga, nunca sai de moda." },
{ bold:"Ela vai pedir pra ouvir toda noite:", rest:" essa música vira parte da infância dela." },
{ bold:"Você vira o presente favorito:", rest:" e ela vai contar pra todo mundo quem deu." },
];
const STEPS = [
{ number:"01", emoji:"✏️", time:"2 MINUTOS",  title:"Você Conta a História Dela",    desc:"Nome, personalidade, o que ela ama. Quanto mais você contar, mais especial fica — e só leva 2 minutinhos.",
nodeBg:"#fce7f3", nodeBorder:"#f9a8d4", nodeColor:"#9d174d",
cardBg:"#fce7f3", cardBorder:"#fbcfe8", titleColor:"#831843", descColor:"#9d174d",
badgeBg:"#fbcfe8", badgeColor:"#9d174d" },
{ number:"02", emoji:"🎼", time:"ATÉ 6 HORAS",   title:"A Gente Cria Só pra Ela",     desc:"Compositores e cantores profissionais montam letra, melodia e voz do zero — nada de template, tudo personalizado. Entregamos em até 6h.",
nodeBg:"#fff7ed", nodeBorder:"#fdba74", nodeColor:"#9a3412",
cardBg:"#fff7ed", cardBorder:"#fed7aa", titleColor:"#7c2d12", descColor:"#9a3412",
badgeBg:"#fed7aa", badgeColor:"#9a3412" },
{ number:"03", emoji:"🎧", time:"NA HORA",   title:"Ela Ouve e Não Esquece Mais", desc:"Chega via WhatsApp — você coloca pra tocar e assiste a reação dela. Esse momento você vai querer gravar.",
nodeBg:"#ede9fe", nodeBorder:"#c4b5fd", nodeColor:"#4c1d95",
cardBg:"#ede9fe", cardBorder:"#ddd6fe", titleColor:"#3b0764", descColor:"#4c1d95",
badgeBg:"#ddd6fe", badgeColor:"#4c1d95" },
];
const FEATURES = [
"Composição completa (Letra + Melodia)",
"Voz profissional de estúdio",
"Arquivo MP3 em alta definição",
"Capa do álbum personalizada",
"Letra escrita pelos nossos compositores",
];
const CHECK_COLORS = ["rgba(255,255,255,1)","rgba(255,255,255,1)","rgba(255,255,255,1)","rgba(255,255,255,1)","rgba(255,255,255,1)"];
const FAQ_ITEMS = [
{ q:"Em quanto tempo recebo a música?", a:"Após o pedido e pagamento confirmados, nossa equipe começa imediatamente. O prazo padrão é de até 6h no Plano Expresso — ideal para quem está na véspera do aniversário ou quer surpreender rápido." },
{ q:"E se a criança — ou eu — não gostar?", a:"Não acontece quase nunca, mas se acontecer: fazemos revisões gratuitas sem custo adicional. E se ainda assim não ficar bom, devolvemos 100% do valor pago em até 30 dias. Sem burocracia." },
{ q:"Preciso escrever a letra? Preciso saber de música?", a:"Não precisa de nada disso. Você só responde algumas perguntas simples sobre a criança — nome, o que ela gosta, a personalidade dela. Nossa equipe de compositores faz todo o resto: letra, melodia e arranjo." },
{ q:"Quais estilos musicais vocês fazem?", a:"Pop infantil, sertanejo, pagode kids, funk suave, gospel, MPB, forró e muito mais. Você escolhe o estilo no momento do pedido — e a música vai soar exatamente do jeito que a criança curte." },
{ q:"O que exatamente vou receber?", a:"Você recebe um arquivo MP3 em alta qualidade, a capa do álbum personalizada e a letra completa da música. No Plano Expresso, você ainda leva 2 versões diferentes — e pode escolher a favorita junto com a criança." },
{ q:"Tem limite de idade? Funciona para qual faixa etária?", a:"As músicas são criadas sob medida para qualquer faixa etária — bebês, crianças pequenas, pré-adolescentes. Você informa a idade e a personalidade, e adaptamos o tom, a letra e o estilo da música." },
{ q:"Posso usar a música nas redes sociais ou no vídeo de aniversário?", a:"Sim! As músicas são licenciadas para uso pessoal e familiar, incluindo redes sociais, vídeos de aniversário e grupos de família. Para uso comercial, entre em contato para uma licença especial." },
{ q:"Os dados da criança ficam protegidos?", a:"Absolutamente. Todas as informações compartilhadas — nome, história, dados pessoais — são tratadas com total sigilo e segurança, em conformidade com a LGPD. Nunca compartilhamos nada com terceiros." },
];
window.addEventListener('scroll', () => {
document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
}, { passive:true });
function toggleMenu() {
document.getElementById('burger').classList.toggle('open');
document.getElementById('mobileMenu').classList.toggle('open');
}
function scrollToSection(id) {
document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
}
const observer = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold:.08, rootMargin:'0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
(function buildTestimonials() {
const _9a = document.getElementById('testimonialsGrid');
_9a.innerHTML = TESTIMONIALS.map(t => `
<div class="tcard">
<div class="tcard__img-area" style="background:${t.topGrad};">
<div class="tcard__img-dot"></div>
${t.image
? `<img src="${t.image}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;object-position:top;position:absolute;inset:0;" loading="lazy" decoding="async" />`
: `<div class="tcard__img-_6a">
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>
<span>Imagem do cliente aqui</span>
</div>`
}
</div>
</div>`
).join('');
})();
(function buildCompare() {
document.getElementById('badList').innerHTML = BAD_ITEMS.map(item =>
`<li class="compare__item compare__item--bad"><span class="compare__x">✗</span><span>${item}</span></li>`
).join('');
document.getElementById('goodList').innerHTML = GOOD_ITEMS.map(item =>
`<li class="compare__item compare__item--good">
<span class="compare__check">✓</span>
<span><strong>${item.bold}</strong>${item.rest}</span>
</li>`
).join('');
})();
(function buildSteps() {
const _9a = document.getElementById('stepsGrid');
const _77 = `<div class="tl-line" aria-hidden="true"></div>`;
const _6f = STEPS.map(s =>
`<div class="tl-step">
<div class="tl-node" style="background:${s.nodeBg};border:2px solid ${s.nodeBorder};color:${s.nodeColor};">
<span class="tl-node-num">${s.number}</span>
</div>
<div class="tl-_96" style="background:${s.cardBg};border:1.5px solid ${s.cardBorder};">
<span class="tl-emoji">${s.emoji}</span>
<span class="tl-badge" style="background:${s.badgeBg};color:${s.badgeColor};">${s.time}</span>
<h3 class="tl-title" style="color:${s.titleColor};">${s.title}</h3>
<p class="tl-desc" style="color:${s.descColor};">${s.desc}</p>
</div>
</div>`
).join('');
_9a.innerHTML = `<div class="tl-wrapper">${_77}<div class="tl-row">${_6f}</div></div>`;
})();
(function buildPricing() {
document.getElementById('pricingFeatures').innerHTML = FEATURES.map((f, i) =>
`<li class="pricing-card__feature">
<span class="pricing-card__check" style="background:${CHECK_COLORS[i]}30;color:${CHECK_COLORS[i]};">✓</span>
${f}
</li>`
).join('');
})();
(function buildFaq() {
document.getElementById('faqList').innerHTML = FAQ_ITEMS.map((item, i) =>
`<div class="faq__item reveal" id="faq-${i}">
<button class="faq__btn" onclick="toggleFaq(${i})" aria-expanded="false">
<span class="faq__question">${item.q}</span>
<span class="faq__icon">+</span>
</button>
<div class="faq__answer" id="faq-ans-${i}">
<div class="faq__answer-inner">
<p class="faq__text">${item.a}</p>
</div>
</div>
</div>`
).join('');
document.querySelectorAll('#faqList .reveal').forEach(el => observer.observe(el));
})();
let openFaq = null;
function toggleFaq(i) {
const item = document.getElementById(`faq-${i}`);
const btn = item.querySelector('.faq__btn');
if (openFaq !== null && openFaq !== i) {
document.getElementById(`faq-${openFaq}`).classList.remove('open');
document.querySelector(`#faq-${openFaq} .faq__btn`).setAttribute('aria-expanded','false');
}
const _8d = item.classList.toggle('open');
btn.setAttribute('aria-expanded', _8d);
openFaq = _8d ? i : null;
}
let activeIndex = 1;
let playingId = null;
let vimeoPlayers = {};
let vimeoApiLoaded = false;
const PAUSE_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5.75A1.75 1.75 0 0 1 8.75 4h.5A1.75 1.75 0 0 1 11 5.75v12.5A1.75 1.75 0 0 1 9.25 20h-.5A1.75 1.75 0 0 1 7 18.25V5.75Zm6 0A1.75 1.75 0 0 1 14.75 4h.5A1.75 1.75 0 0 1 17 5.75v12.5A1.75 1.75 0 0 1 15.25 20h-.5A1.75 1.75 0 0 1 13 18.25V5.75Z"/></svg>`;
const PLAY_SVG  = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72c0 .78.86 1.25 1.52.82l10.2-6.86a.98.98 0 0 0 0-1.64L9.52 4.32A.98.98 0 0 0 8 5.14Z"/></svg>`;
function buildCarousel() {
const c = document.getElementById('carousel');
c.style.paddingLeft = c.style.paddingRight = 'calc(50% - 140px)';
c.innerHTML = MUSIC_EXAMPLES.map((_96, _a1) => `
<div class="carousel__card" id="_96-${_96.id}" data-index="${_a1}">
<img class="carousel__poster" id="poster-${_96.id}" src="${_96.poster}" alt="${_96.name}" loading="${_a1 === activeIndex ? 'eager' : 'lazy'}" decoding="async" />
<div class="carousel__media" id="_90-${_96.id}"></div>
<div class="carousel__overlay"></div>
<div class="carousel__top"><span></span><span>${_96.duration}</span></div>
<button class="carousel__play" id="play-${_96.id}" onclick="event.stopPropagation(); toggleVideo(${_96.id})" aria-label="Play">
${PLAY_SVG}
</button>
<div class="carousel__bottom">
<div class="carousel__bar-track"><div class="carousel__bar-fill" id="_a5-${_96.id}" style="width:0%"></div></div>
<div class="carousel__meta">
<div>
<p class="carousel__theme">${_96.theme}</p>
<h2 class="carousel__name">${_96.name}</h2>
</div>
<span class="carousel__num">■</span>
</div>
</div>
</div>
`).join('');
MUSIC_EXAMPLES.forEach((_96, _a1) => {
const _83 = document.getElementById(`_96-${_96.id}`);
if (_83) {
_83.addEventListener('click', function(e) {
if (e.target.closest('.carousel__play')) return;
if (_a1 === activeIndex) return;
goToCard(_a1);
});
}
});
buildDots();
updateHero();
setTimeout(() => {
const _6d = document.getElementById(`_96-${MUSIC_EXAMPLES[activeIndex].id}`);
if (_6d) {
_6d.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
}
}, 50);
}
function loadVimeoAPI() {
if (vimeoApiLoaded) return Promise.resolve();
return new Promise((resolve) => {
if (typeof Vimeo !== 'undefined') {
vimeoApiLoaded = true;
resolve();
return;
}
const _84 = document.createElement('_84');
_84.src = 'https:
_84.defer = true;
_84.onload = () => {
vimeoApiLoaded = true;
resolve();
};
document.body.appendChild(_84);
});
}
async function initVimeoPlayer(id, _78 = false) {
await loadVimeoAPI();
const _96 = MUSIC_EXAMPLES.find(c => c.id === id);
if (!_96 || vimeoPlayers[id]) return;
const _67 = document.getElementById(`_90-${id}`);
if (!_67) return;
const _8a = new Vimeo.Player(_67, {
id: parseInt(_96.vimeoId),
loop: true,
_78: _78,
muted: false,
controls: false,
responsive: true,
dnt: true
});
vimeoPlayers[id] = _8a;
_8a.on('timeupdate', (data) => {
if (playingId === id && data.duration) {
const _9f = (data.seconds / data.duration) * 100;
const _a5 = document.getElementById(`_a5-${id}`);
if (_a5) _a5.style.width = _9f + '%';
}
});
_8a.on('ended', () => {
const _a5 = document.getElementById(`_a5-${id}`);
if (_a5) _a5.style.width = '0%';
});
}
async function toggleVideo(id) {
const _a1 = MUSIC_EXAMPLES.findIndex(c => c.id === id);
const btn = document.getElementById(`play-${id}`);
if (!btn) return;
if (_a1 !== activeIndex) {
goToCard(_a1);
setTimeout(() => toggleVideo(id), 400);
return;
}
const _71 = playingId === id;
if (playingId !== null && playingId !== id) {
const _70 = vimeoPlayers[playingId];
const _82 = document.getElementById(`play-${playingId}`);
const _66 = document.querySelector(`#_96-${playingId} .carousel__placeholder`);
const _7b = document.getElementById(`_90-${playingId}`);
if (_70) {
_70.pause();
_70.setVolume(0);
}
if (_82) {
_82.innerHTML = PLAY_SVG;
_82.classList.remove('playing');
}
if (_66) _66.classList.remove('hidden');
if (_7b) _7b.classList.remove('active');
}
if (_71) {
const _8a = vimeoPlayers[id];
if (_8a) {
await _8a.pause();
await _8a.setVolume(0);
}
playingId = null;
btn.innerHTML = PLAY_SVG;
btn.classList.remove('playing');
const _6a = document.querySelector(`#_96-${id} .carousel__placeholder`);
const _90 = document.getElementById(`_90-${id}`);
if (_6a) _6a.classList.remove('hidden');
if (_90) _90.classList.remove('active');
} else {
btn.classList.add('is-loading');
btn.innerHTML = '<div class="loader-spinner"></div>';
try {
await initVimeoPlayer(id);
const _8a = vimeoPlayers[id];
if (!_8a) throw new Error('Player não inicializado');
await _8a.setMuted(false);
await _8a.setVolume(1);
await _8a.play();
playingId = id;
btn.classList.remove('is-loading');
btn.innerHTML = PAUSE_SVG;
btn.classList.add('playing');
const _6a = document.querySelector(`#_96-${id} .carousel__placeholder`);
const _90 = document.getElementById(`_90-${id}`);
if (_6a) _6a.classList.add('hidden');
if (_90) _90.classList.add('active');
} catch (err) {
btn.classList.remove('is-loading');
btn.innerHTML = PLAY_SVG;
console.warn('Erro ao dar play:', err);
}
}
}
function waitForPlayerReady(_8a) {
return new Promise((resolve) => {
if (_8a._ready) {
resolve();
return;
}
_8a.on('loaded', () => {
_8a._ready = true;
resolve();
});
setTimeout(() => {
_8a._ready = true;
resolve();
}, 1000);
});
}
async 
function unlockAudioContext() {
const _69 = new Audio();
_69.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAA==';
_69.play().catch(() => {});
if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
const _74 = window.AudioContext || window.webkitAudioContext;
if (_74) {
const _a3 = new _74();
if (_a3.state === 'suspended') {
_a3.resume().catch(() => {});
}
const _a4 = _a3.createOscillator();
const gain = _a3.createGain();
gain.gain.value = 0;
_a4.connect(gain);
gain.connect(_a3.destination);
_a4.start();
_a4.stop(_a3.currentTime + 0.001);
}
}
}
function buildDots() {
document.getElementById('dots').innerHTML = MUSIC_EXAMPLES.map((_,i) =>
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
function updateHero() {
const _96 = MUSIC_EXAMPLES[activeIndex];
const _9e  = glowToRgb(_96.glow);
const _97 = document.getElementById('_97');
_97.style.background =
`radial-gradient(ellipse at 18% 52%, rgba(${_9e},0.30) 0%, transparent 50%),` +
`radial-gradient(ellipse at 82% 52%, rgba(${_9e},0.20) 0%, transparent 50%),` +
`linear-gradient(160deg, #e8d5f5 0%, #dde8fb 28%, #efe4fb 55%, #f8dde8 80%, #fce8d5 100%)`;
document.getElementById('heroBgImg').src = _96.poster;
document.getElementById('heroAccent').style.color = _96.color;
const _a0 = document.getElementById('heroCta');
_a0.style.background = `linear-gradient(135deg,${_96.color},${_96.color}cc)`;
_a0.style.boxShadow  = `0 8px 30px rgba(${_9e},0.45),0 2px 8px rgba(0,0,0,.1)`;
document.querySelector('.carousel__fade--l').style.background =
`linear-gradient(to right, rgba(${_9e},0.18), transparent)`;
document.querySelector('.carousel__fade--r').style.background =
`linear-gradient(to left, rgba(${_9e},0.14), transparent)`;
updateDots();
}
function updateCards() {
MUSIC_EXAMPLES.forEach((_96, _a1) => {
const el = document.getElementById(`_96-${_96.id}`);
if (!el) return;
const d = _a1 - activeIndex, active = _a1 === activeIndex;
el.style.transform = `translateY(${active?0:20}px) rotate(${d*-4}deg) scale(${active?1:.91})`;
el.style.opacity   = active ? '1' : '0.62';
el.style.zIndex    = active ? '10' : '1';
const _8c = el.querySelector('.carousel__play');
if (_8c) {
_8c.style.background = 'rgba(255,255,255,.12)';
_8c.style.border     = '1.5px solid rgba(255,255,255,.35)';
_8c.style.boxShadow  = 'none';
_8c.style.color      = '#fff';
}
el.style.boxShadow = active
? `0 30px 60px rgba(0,0,0,.7), 0 0 48px ${_96.glow}`
: '0 8px 32px rgba(0,0,0,.4)';
if (!active && playingId === _96.id) {
const _8a = vimeoPlayers[_96.id];
const btn = document.getElementById(`play-${_96.id}`);
const poster = document.getElementById(`poster-${_96.id}`);
const _90 = document.getElementById(`_90-${_96.id}`);
if (_8a) { _8a.pause(); _8a.setVolume(0); }
if (btn) { btn.innerHTML = PLAY_SVG; btn.classList.remove('playing'); }
if (poster) poster.classList.remove('hidden');
if (_90) _90.classList.remove('active');
document.getElementById(`_a5-${_96.id}`).style.width = '0%';
playingId = null;
}
});
updateHero();
}
function goToCard(_a1) {
const n = MUSIC_EXAMPLES.length;
activeIndex = ((_a1 % n) + n) % n;
const _6e = document.getElementById(`_96-${MUSIC_EXAMPLES[activeIndex].id}`);
if (_6e) {
_6e.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
}
updateCards();
}
document.getElementById('carousel')?.addEventListener('scroll', function() {
const cx = this.getBoundingClientRect(), mid = cx.left + cx.width / 2;
let ci = 0, cd = Infinity;
MUSIC_EXAMPLES.forEach((_96, i) => {
const el = document.getElementById(`_96-${_96.id}`);
if (!el) return;
const d = Math.abs(mid - (el.getBoundingClientRect().left + el.offsetWidth / 2));
if (d < cd) { cd = d; ci = i; }
});
if (ci !== activeIndex) {
activeIndex = ci;
updateCards();
}
}, { passive:true });
buildCarousel();
updateCards();
(function() {
const TOTAL = 8;
let cur = 1;
const data = {
rel: '', nome: '', idade: '', oc: '',
personalidade: [], persFree: '',
universo: [], universoFree: '',
hist: '', clima: '', estilo: '', ref: '', whatsapp: ''
};
let pendingPayload = null;
const URL_PLANILHA = "https:
function _95() {
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
const _93 = c.classList.contains('sel');
if (!_93 && data.personalidade.length >= 3) return;
c.classList.toggle('sel');
const _73 = document.getElementById('persFreeField');
_73.style.display = c.classList.contains('sel') ? 'block' : 'none';
if (!c.classList.contains('sel')) {
data.persFree = '';
document.getElementById('persFree').value = '';
}
} else {
if (c.classList.contains('sel')) {
c.classList.remove('sel');
data.personalidade = data.personalidade.filter(x => x !== v);
} else if (data.personalidade.length < 3) {
c.classList.add('sel');
data.personalidade.push(v);
}
}
const _68 = document.querySelector('#gPerso .ocard[data-v="__free__"]').classList.contains('sel');
const _8f = data.personalidade.length + (_68 ? 1 : 0);
document.getElementById('pCnt').textContent = _8f;
});
});
document.querySelectorAll('#gUniv .ocard').forEach(c => {
c.addEventListener('click', () => {
const v = c.dataset.v;
if (c.classList.contains('sel')) {
c.classList.remove('sel');
data.universo = data.universo.filter(x => x !== v);
} else {
if (data.universo.length >= 3) return;
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
const _7a = document.getElementById('wpp');
if (_7a) {
_7a.addEventListener('input', function() {
let v = this.value.replace(/\D/g, '').slice(0, 11);
if (v.length > 10)      v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
else if (v.length > 6)  v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
else if (v.length > 2)  v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
this.value = v;
});
}
document.querySelectorAll('.btn, .pricing-card__btn, .navbar__cta .btn--sm, .navbar__link, .navbar__mobile-link').forEach(btn => {
if (btn.tagName === 'A' && btn.getAttribute('href')?.startsWith('#') && btn.getAttribute('href').length > 1) return;
btn.addEventListener('click', (e) => {
if (btn.tagName === 'A' && btn.getAttribute('href') && !btn.getAttribute('href').startsWith('#')) return;
e.preventDefault();
openQuiz();
});
});
}
function _7c(back) {
document.getElementById('sNum').textContent = String(cur).padStart(2, '0');
document.getElementById('pFill').style.width = (cur / TOTAL * 100) + '%';
document.querySelectorAll('.qs').forEach(p => {
p.classList.toggle('active', parseInt(p.dataset.s) === cur);
});
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
switch(cur) {
case 1:
data.nome  = document.getElementById('nome').value.trim();
data.idade = document.getElementById('idade').value.trim();
break;
case 4:
data.universoFree = document.getElementById('universoFree').value.trim();
break;
case 5:
data.hist = document.getElementById('hist').value.trim();
break;
case 3:
data.persFree = document.getElementById('persFree')?.value.trim() || '';
break;
case 8:
data.ref = document.getElementById('ref').value.trim();
break;
}
}
function _76() {
if (cur === 1) {
if (!data.rel) { _7d('Selecione sua relação com a criança'); return false; }
const n = document.getElementById('nome');
if (!n.value.trim()) { n.style.borderColor = '#ef4444'; _7d('Digite o nome da criança'); return false; }
}
if (cur === 2 && !data.oc) { _7d('Selecione a ocasião'); return false; }
if (cur === 3) {
const _68 = document.querySelector('#gPerso .ocard[data-v="__free__"]').classList.contains('sel');
if (data.personalidade.length === 0 && !_68) {
_7d('Selecione pelo menos 1 característica'); return false;
}
if (_68) {
const pf = document.getElementById('persFree');
if (!pf.value.trim()) { pf.style.borderColor = '#ef4444'; _7d('Descreva a personalidade'); return false; }
}
}
if (cur === 4) {
const _80 = document.getElementById('universoFree').value.trim();
if (data.universo.length === 0 && !_80) {
_7d('Selecione pelo menos 1 universo ou descreva no campo'); return false;
}
}
if (cur === 5) {
const h = document.getElementById('hist');
if (!h.value.trim()) { h.style.borderColor = '#ef4444'; _7d('Conte a história'); return false; }
}
if (cur === 6 && !data.clima) { _7d('Selecione o clima da música'); return false; }
if (cur === 7 && !data.estilo) { _7d('Selecione o estilo musical'); return false; }
return true;
}
function next() {
if (!_76()) return;
save();
if (cur < TOTAL) {
cur++;
_7c(false);
} else {
_8e();
}
}
function goBack() {
if (cur > 1) {
cur--;
_7c(true);
} else {
_6b();
resetQuiz();
}
}
const CACHE_KEY = 'kidsmusic_quiz';
function _6b() {
save();
try {
localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, _cur: cur }));
} catch (e) { }
}
function _64() {
try {
const raw = localStorage.getItem(CACHE_KEY);
if (!raw) return false;
const _94 = JSON.parse(raw);
data.rel         = _94.rel         || '';
data.nome        = _94.nome        || '';
data.idade       = _94.idade       || '';
data.oc          = _94.oc          || '';
data.personalidade = _94.personalidade || [];
data.persFree    = _94.persFree    || '';
data.universo    = _94.universo    || [];
data.universoFree= _94.universoFree|| '';
data.hist        = _94.hist        || '';
data.clima       = _94.clima       || '';
data.estilo      = _94.estilo      || '';
data.ref         = _94.ref         || '';
cur = _94._cur || 1;
if (data.nome)         document.getElementById('nome').value  = data.nome;
if (data.idade)        document.getElementById('idade').value = data.idade;
if (data.hist)         document.getElementById('hist').value  = data.hist;
if (data.ref)          document.getElementById('ref').value   = data.ref;
if (data.universoFree) document.getElementById('universoFree').value = data.universoFree;
if (data.persFree) {
document.getElementById('persFree').value = data.persFree;
document.getElementById('persFreeField').style.display = 'block';
}
if (data.rel) {
document.querySelectorAll('#gRel .ocard').forEach(c => {
if (c.dataset.v === data.rel) c.classList.add('sel');
});
}
if (data.oc) {
document.querySelectorAll('#gOc .ocard').forEach(c => {
if (c.dataset.v === data.oc) c.classList.add('sel');
});
}
if (data.personalidade.length) {
document.querySelectorAll('#gPerso .ocard').forEach(c => {
if (data.personalidade.includes(c.dataset.v)) c.classList.add('sel');
});
}
if (data.persFree) {
document.querySelector('#gPerso .ocard[data-v="__free__"]')?.classList.add('sel');
}
const _a2 = data.personalidade.length + (data.persFree ? 1 : 0);
document.getElementById('pCnt').textContent = _a2;
if (data.universo.length) {
document.querySelectorAll('#gUniv .ocard').forEach(c => {
if (data.universo.includes(c.dataset.v)) c.classList.add('sel');
});
}
if (data.clima) {
document.querySelectorAll('#gClima .ocard').forEach(c => {
if (c.dataset.v === data.clima) c.classList.add('sel');
});
}
if (data.estilo) {
document.querySelectorAll('#gEstilo .ocard').forEach(c => {
if (c.dataset.v === data.estilo) c.classList.add('sel');
});
}
return true;
} catch (e) { return false; }
}
function _6c() {
try { localStorage.removeItem(CACHE_KEY); } catch (e) { }
}
function _8e() {
save();
document.getElementById('qBody').style.display = 'none';
document.getElementById('qHeader').style.display = 'none';
const _9b = document.getElementById('_9b');
_9b.classList.add('active');
const _72 = [...data.personalidade, data.persFree].filter(Boolean).join(', ');
const _79  = [...data.universo, data.universoFree].filter(Boolean).join(', ');
document.getElementById('smNome').textContent   = data.nome || '—';
document.getElementById('smOc').textContent     = data.oc || '—';
document.getElementById('smPerso').textContent  = _72 || '—';
document.getElementById('smUniv').textContent   = _79 || '—';
document.getElementById('smClima').textContent  = data.clima || '—';
document.getElementById('smEstilo').textContent = data.estilo || '—';
pendingPayload = {
paraQuem:      data.rel,
nome:          data.nome,
idade:         data.idade,
momento:       data.oc,
personalidade: _72,
universo:      _79,
historia:      data.hist,
clima:         data.clima,
estilo:        data.estilo,
referencia:    data.ref,
whatsapp:      '',
status:        'Quiz Concluído'
};
setTimeout(_65, 350);
}
function _65() {
const _8b = document.getElementById('confCanvas');
_8b.style.display = 'block';
const _a3 = _8b.getContext('2d');
_8b.width = window.innerWidth;
_8b.height = window.innerHeight;
const _86 = ['#10b981', '#34d399', '#38bdf8', '#f59e0b', '#ffffff'];
const _89 = [];
for (let i = 0; i < 100; i++) {
_89.push({
x: Math.random() * _8b.width,
y: -20 - Math.random() * 100,
w: 8 + Math.random() * 8,
h: 8 + Math.random() * 8,
r: Math.random() * Math.PI * 2,
dr: (Math.random() - 0.5) * 0.2,
vx: (Math.random() - 0.5) * 4,
vy: 3 + Math.random() * 4,
col: _86[Math.floor(Math.random() * _86.length)],
op: 1
});
}
let _92 = 0;
function _99() {
_a3.clearRect(0, 0, _8b.width, _8b.height);
let _91 = false;
_89.forEach(p => {
p.x += p.vx; p.y += p.vy; p.r += p.dr;
if (_92 > 100) p.op = Math.max(0, p.op - 0.01);
if (p.y < _8b.height && p.op > 0) {
_91 = true;
_a3.save();
_a3.globalAlpha = p.op;
_a3.translate(p.x, p.y);
_a3.rotate(p.r);
_a3.fillStyle = p.col;
_a3.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
_a3.restore();
}
});
_92++;
if (_91 && _92 < 300) { requestAnimationFrame(_99); } 
else{
_8b.style.display = 'none';
}
}
_99();
}
function resetQuiz() {
cur = 1;
data.rel = ''; data.nome = ''; data.idade = ''; data.oc = '';
data.personalidade = []; data.persFree = '';
data.universo = []; data.universoFree = '';
data.hist = ''; data.clima = ''; data.estilo = ''; data.ref = ''; data.whatsapp = '';
pendingPayload = null;
document.querySelectorAll('.ocard').forEach(c => c.classList.remove('sel'));
document.querySelectorAll('.qi, .qt').forEach(i => { i.value = ''; i.style.borderColor = ''; });
document.getElementById('pCnt').textContent = '0';
document.getElementById('persFreeField').style.display = 'none';
const _7a = document.getElementById('wpp');
if (_7a) _7a.value = '';
const _7e = document.getElementById('_7e');
if (_7e) _7e.style.borderColor = '';
const _87 = document.getElementById('_87');
if (_87) {
_87.disabled = false;
_87.innerHTML = 'Garantir Minha Música Agora <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
}
document.getElementById('qBody').style.display = '';
document.getElementById('qHeader').style.display = '';
document.getElementById('_9b').classList.remove('active');
document.getElementById('quiz').classList.remove('active');
document.body.style.overflow = '';
_7c(false);
}
function openQuiz() {
document.getElementById('quiz').classList.add('active');
document.body.style.overflow = 'hidden';
const _75 = _64();
_7c(false);
if (_75 && cur > 1) {
setTimeout(() => _7d('✅ Seus dados foram salvos! Continue de onde parou 🎵'), 400);
}
}
let _88 = null;
function _7d(_9d) {
const t = document.getElementById('eTost');
t.textContent = _9d;
t.classList.add('show');
if (_88) clearTimeout(_88);
_88 = setTimeout(() => t.classList.remove('show'), 3000);
}
window.openQuiz      = openQuiz;
window.next          = next;
window.goBack        = goBack;
window.resetQuiz     = resetQuiz;
window.checkout = function() {
const _7a = document.getElementById('wpp');
const _98     = document.getElementById('_7e');
const _81   = _7a.value.replace(/\D/g, '');
if (_81.length < 10) {
_98.style.borderColor = '#ef4444';
_7a.focus();
_7d('Digite seu WhatsApp com DDD para receber sua música');
setTimeout(() => { _98.style.borderColor = ''; }, 3000);
return;
}
const btn = document.getElementById('_87');
btn.disabled = true;
btn.textContent = 'Redirecionando...';
const _7f = '55' + _81;
if (pendingPayload) {
pendingPayload.whatsapp = _7a.value.trim();
pendingPayload.status   = 'Quiz Concluído';
fetch(URL_PLANILHA, {
method: "POST",
mode: "no-cors",
headers: { "Content-Type": "text/plain" },
body: JSON.stringify(pendingPayload)
}).catch(err => console.error('Erro ao salvar:', err));
}
const _9c = 'https:
_6c();
window.open(_9c + '?phone=' + _7f, '_blank');
};
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', _95);
} else {
_95();
}
})();