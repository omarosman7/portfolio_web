(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(pointer:fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
let lang = localStorage.getItem('lang') || 'ar';
const isRTL = () => lang === 'ar';

/* ---------- config ---------- */
const CFG = {
  phone: '201029280272', discount: 20, endsAt: new Date('2026-12-31T23:59:59+02:00'),
  msg: { ar: 'السلام عليكم يا عمر، حابب أتكلم معك بخصوص مشروع', en: 'Hi Omar, I would like to talk to you about a project' }
};
const wa = t => `https://wa.me/${CFG.phone}?text=${encodeURIComponent(t)}`;

/* ---------- content ---------- */
const SERVICES = [
  { ar: 'التصميم والهوية', en: 'Design & Branding', i: ['Brand Identity', 'Logo Design', 'Social Media Design', 'Advertising Campaigns', 'Print Design', 'Packaging', 'Company Profiles', 'Menus', 'Presentations', 'Infographics'] },
  { ar: 'المواقع والتجربة الرقمية', en: 'Web & Digital', i: ['Website Design', 'Website Development', 'Landing Pages', 'Business Websites', 'E-commerce', 'UI/UX Design'] },
  { ar: 'المحتوى والفيديو', en: 'Content & Media', i: ['Video Editing', 'Motion Graphics', 'Creative Content', 'Social Media Content', 'Captions & Copywriting'] },
  { ar: 'التسويق والإعلان', en: 'Marketing & Ads', i: ['Ad Creatives', 'Campaign Visuals', 'Ad Design', 'Creative Direction'] },
  { ar: 'البرمجة والأتمتة', en: 'Tech & Automation', i: ['Programming', 'Digital Solutions', 'Workflow Automation', 'AI-Assisted Creative Workflows'] }
];
const STEPS = [
  { ar: ['أسمعك أول', 'أفهم مشروعك وجمهورك وإيش اللي تبي توصله'], en: ['I listen first', 'I learn about your project, your audience and what you want to say'] },
  { ar: ['نحدد الاتجاه', 'ألوان وخطوط وأسلوب، قبل أي تنفيذ'], en: ['We set the direction', 'Colors, type and style, before any execution'] },
  { ar: ['أصمم وأبني', 'أشتغل على التفاصيل وأوريك التقدم أول بأول'], en: ['I design and build', 'I work on the details and show you progress as I go'] },
  { ar: ['نراجع ونسلّم', 'أعدّل لين ترتاح للنتيجة، وأسلّمك ملفات مرتبة جاهزة للاستخدام'], en: ['We review and deliver', 'I revise until you are happy, then hand over tidy, ready-to-use files'] }
];
const PATHS = [
  { ar: ['هوية بصرية كاملة', 'شعار ونظام هوية وتطبيقاتها'], en: ['Full visual identity', 'Logo, identity system and its applications'] },
  { ar: ['موقع أو صفحة هبوط', 'تصميم وتطوير'], en: ['Website or landing page', 'Design and development'] },
  { ar: ['حضور كامل', 'هوية وموقع ومحتوى سوشيال'], en: ['Full presence', 'Identity, website and social content'] }
];
// REVIEW BY OMAR: all case-study text below was written from what is visible in the designs, please check it matches the real story
const PROJ = [
  { id: 'donuttoo', name: 'Donuttoo', bg: '#2A0A1C', fg: '#FFF1E3', a: '#FF4A2E', url: 'https://donuttoo.vercel.app/',
    imgs: ['donuttoo-1', 'donuttoo-2', 'donuttoo-3', 'donuttoo-4'],
    cat: { ar: 'هوية رقمية وموقع متجر حلويات', en: 'Digital identity and dessert store website' },
    tag: { ar: 'دونات تتشاف قبل ما تتدوّق', en: 'Donuts you see before you taste' },
    intro: { ar: 'براند حلويات يبيع أونلاين، والمطلوب موقع يخلي الزائر يشتهي المنتج من أول نظرة ويطلب بسهولة', en: 'An online dessert brand that needed a site to make you crave the product at first sight, and order easily' },
    ch: { ar: 'الحلويات منتج عاطفي، والناس تشتريه بعينها قبل أي شيء\nالتحدي إن الموقع يكون دافي وفيه شهية، ومع هذا يبقى الطلب فيه واضح وسريع\nوفوق هذا، كل شخص يحب يختار نكهاته بنفسه، فلازم الطلب يكون مرن مش قائمة جامدة', en: 'Dessert is an emotional product, people buy it with their eyes first\nThe challenge: a warm, appetizing site where ordering stays clear and fast\nAnd everyone likes to pick their own flavors, so ordering had to be flexible, not a fixed list' },
    did: { ar: 'بنيت هوية بصرية حول الكريمي والبرتقالي المحمّر والبرقوق الغامق، ألوان تحسسك بالسكر والدفء\nصممت الموقع بلغتين، عربي وإنجليزي، وكل لغة بتتقلب بتخطيطها الصحيح\nوبنيت رحلة طلب كاملة من التصفح لين اختيار الصندوق', en: 'I built an identity around cream, warm orange-red and deep plum, colors that feel like sugar and warmth\nI designed the site in Arabic and English, each with its own correct layout\nAnd built a full ordering journey, from browsing to choosing a box' },
    dec: [{ ar: ['خط عربي كبير وودود', 'عناوين ضخمة بخط سميك تعطي الموقع شخصية مرحة، وتخلي الرسالة تُقرأ من بعيد'], en: ['Big, friendly Arabic type', 'Huge bold headlines give the site a playful personality and can be read from afar'] },
      { ar: ['تصفح بالتصنيفات', 'كلاسيك، شوكولاتة، فواكه، محشوة، وإصدارات خاصة، عشان الزائر يوصل لنكهته بنقرة'], en: ['Browse by category', 'Classic, chocolate, fruit, filled and special editions, so visitors reach their flavor in one click'] },
      { ar: ['اصنع صندوقك', 'خطوات واضحة تبدأ بحجم الصندوق، أربع أو ست أو اثنتا عشرة حبة، وبعدها يختار النكهات'], en: ['Build your box', 'Clear steps starting with box size, 4, 6 or 12 pieces, then picking flavors'] }],
    dl: { ar: 'تصميم واجهات الموقع · نظام ألوان وخطوط · صفحة المنتجات · صفحة القصة · صفحة اصنع صندوقك · نسخة عربية وإنجليزية', en: 'Site UI design · Color and type system · Collection page · Story page · Build-your-box page · Arabic and English versions' } },
  { id: 'nawarat', name: 'Nawarat', bg: '#0A1330', fg: '#EDE6D6', a: '#D9BE86', url: 'https://nawaratt.vercel.app/',
    imgs: ['nawarat-1', 'nawarat-2'],
    cat: { ar: 'موقع شركة عقارات وهندسة ومقاولات، الرياض', en: 'Real estate, engineering and contracting website, Riyadh' },
    tag: { ar: 'ثقة تُبنى من أول شاشة', en: 'Trust built from the first screen' },
    intro: { ar: 'شركة تجمع العقار والهندسة والمقاولات، والمطلوب موقع يعطي إحساس الجدية والفخامة من أول ثانية', en: 'A company combining real estate, engineering and contracting, needing a site that feels serious and premium from the first second' },
    ch: { ar: 'الشركة تقدم أكثر من خدمة، وهذا يربك الزائر بسهولة\nالتحدي إن الموقع يبان راقي وموثوق، ويظل واضح لمن يبحث عن خدمة محددة\nوفي مجال العقار، الصورة الأولى هي اللي تقرر إذا الزائر يكمل أو يغلق الصفحة', en: 'The company offers several services, which easily confuses visitors\nThe challenge: look refined and trustworthy, yet stay clear for someone looking for one specific service\nIn real estate, the first image decides whether a visitor stays or leaves' },
    did: { ar: 'اخترت اتجاه معماري داكن، كحلي عميق مع لمسات ذهبية محسوبة بدون مبالغة\nبنيت واجهة رئيسية سينمائية فيها طبقات من الكتابة فوق صور المشاريع\nوقسمت معرض الأعمال حسب الخدمة، عشان كل زائر يلقى اللي يدور عليه بسرعة', en: 'I chose a dark architectural direction, deep navy with measured touches of gold\nI built a cinematic home screen with layers of type over project imagery\nAnd split the portfolio by service so every visitor finds what they need fast' },
    dec: [{ ar: ['الذهبي بحساب', 'استخدمته فقط في العناوين المهمة والأزرار، وبكذا يحافظ على الفخامة ولا يتحول لزخرفة'], en: ['Gold, by measure', 'Used only on key headlines and buttons, so it stays luxurious and never becomes decoration'] },
      { ar: ['صور كبيرة ومساحات واسعة', 'المشاريع هي البطل، والتصميم يتراجع ليخدمها'], en: ['Big images, wide spaces', 'The projects are the hero, the design steps back to serve them'] },
      { ar: ['تصفية المعرض', 'التصميم المعماري، المقاولات، التصميم الداخلي، والتطوير العقاري، كل فئة بنقرة'], en: ['Filtered portfolio', 'Architectural design, contracting, interior design and real estate development, each one click away'] }],
    dl: { ar: 'تصميم واجهات الموقع · نظام ألوان وخطوط · الصفحة الرئيسية · صفحة معرض الأعمال · نسخة عربية وإنجليزية', en: 'Site UI design · Color and type system · Home page · Portfolio page · Arabic and English versions' } },
  { id: 'velora', name: 'Velora', bg: '#3A0A1C', fg: '#F2E8DA', a: '#E9CFAE', url: 'https://veloraa-fashion.vercel.app/',
    imgs: ['velora-1', 'velora-2'],
    cat: { ar: 'متجر أزياء إلكتروني، حملة خريف وشتاء 2027', en: 'Fashion e-commerce, Autumn/Winter 2027 campaign' },
    tag: { ar: 'متجر يحس إنه دار أزياء', en: 'A store that feels like a fashion house' },
    intro: { ar: 'براند أزياء نسائي، والمطلوب متجر أونلاين يبان كدار أزياء مش كتالوج منتجات', en: 'A womenswear brand needing an online store that feels like a fashion house, not a product catalog' },
    ch: { ar: 'أغلب المتاجر الإلكترونية تشبه بعضها، شبكة منتجات وأسعار وكفى\nالتحدي إن Velora تحس بأنها براند له ذوق وشخصية، ومع هذا يظل التسوق فيها سهل وواضح', en: 'Most online stores look alike, a grid of products and prices and nothing else\nThe challenge: make Velora feel like a brand with taste and personality, while shopping stays easy and clear' },
    did: { ar: 'بنيت هوية على البرجندي والبيج، مع خط سيريف أنيق يعطي طابع المجلات\nصممت شعارًا رمزيًا (مونوغرام) صار نمطًا يتكرر في الخلفيات والتفاصيل\nوجعلت الصفحة الرئيسية تبدأ بصورة الحملة نفسها، فيدخل الزائر لعالم البراند قبل أي منتج', en: 'I built an identity on burgundy and beige, with an elegant serif that feels like a magazine\nI designed a monogram that became a pattern across backgrounds and details\nAnd opened the home page with the campaign image itself, so visitors enter the brand world before any product' },
    dec: [{ ar: ['الخط يتكلم', 'عناوين كبيرة بخط سيريف مع كلمة مائلة، تعطي إيقاع أزياء بدون زخرفة'], en: ['The type speaks', 'Large serif headlines with one italic word give a fashion rhythm without decoration'] },
      { ar: ['المونوغرام كنسيج', 'رمز البراند يتحول لنمط خفيف يعطي الموقع هوية مميزة'], en: ['Monogram as texture', 'The brand mark becomes a light pattern that gives the site a distinct identity'] },
      { ar: ['مساحات بيضاء سخية', 'المنتجات تتنفس، والتسوق يصير تجربة هادئة'], en: ['Generous white space', 'Products breathe, and shopping becomes a calm experience'] }],
    dl: { ar: 'تصميم واجهات المتجر · نظام الهوية والمونوغرام · الصفحة الرئيسية · صفحة المجموعة مع التصنيفات (ملابس، ملابس خارجية، أساسيات)', en: 'Store UI design · Identity and monogram system · Home page · Collection page with filters (clothing, outerwear, essentials)' } }
];
const BH = [
  { img: 'bh-donutto', t: 'Donutto | Brand Identity Design', c: { ar: 'هوية بصرية', en: 'Brand identity' }, u: 'https://www.behance.net/gallery/252969391/Donutto-Brand-Identity-Design' },
  { img: 'bh-dream', t: 'Premium Real Estate Company Profile Design', c: { ar: 'بروفايل شركة', en: 'Company profile' }, u: 'https://www.behance.net/gallery/248658673/Premium-Real-Estate-Company-Profile-Design' },
  { img: 'bh-velora', t: 'Velora — Luxury Fashion Brand Identity', c: { ar: 'هوية بصرية', en: 'Brand identity' }, u: 'https://www.behance.net/gallery/248330629/Velora-Luxury-Fashion-Brand-Identity' },
  { img: 'bh-social2026', t: 'Social Media Design Portfolio 2026', c: { ar: 'تصميم سوشيال ميديا', en: 'Social media design' }, u: 'https://www.behance.net/gallery/244994165/Social-Media-Design-Portfolio-2026' },
  { img: 'bh-realestate', t: 'Luxury Real Estate Social Media Campaign', c: { ar: 'حملة سوشيال ميديا', en: 'Social media campaign' }, u: 'https://www.behance.net/gallery/239661995/Luxury-Real-Estate-Social-Media-Campaign' },
  { img: 'bh-dental', t: 'Social Media Designs – Dr. Abdulaziz Dental Clinic', c: { ar: 'تصميم سوشيال ميديا', en: 'Social media design' }, u: 'https://www.behance.net/gallery/236446363/Social-Media-Designs-Dr-Abdulaziz-Dental-Clinic' }
];
const T = {
  case: { ar: 'تفاصيل المشروع', en: 'Case study' }, live: { ar: 'افتح الموقع', en: 'Open live site' }, view: { ar: 'شوف المشروع', en: 'View project' },
  chT: { ar: 'التحدي', en: 'The challenge' }, didT: { ar: 'اللي عملته', en: 'What I did' }, decT: { ar: 'قرارات التصميم', en: 'Design decisions' },
  dlT: { ar: 'اللي سلّمته', en: 'Deliverables' }, cta: { ar: 'عندك براند محتاج نفس الاهتمام؟', en: 'Got a brand that needs the same care?' }, talk: { ar: 'كلّمني واتساب', en: 'WhatsApp me' },
  drag: { ar: 'اسحب', en: 'Drag' }
};
const L = o => o[lang];

/* ---------- text split (Arabic by WORDS only) ---------- */
function split(el, text, hl) {
  const hs = (hl || '').split('|'), h = hs[isRTL() ? 0 : 1];
  el.innerHTML = text.split(' ').map(w => `<span class="w${w === h ? ' hl' : ''}"><i>${w}</i></span>`).join(' ');
  $$('.w>i', el).forEach((n, i) => n.style.transitionDelay = (i * .07) + 's');
}
function applyText() {
  $$('[data-ar]').forEach(el => {
    const t = el.dataset[lang];
    if (el.classList.contains('split') || el.classList.contains('scrub')) split(el, t, el.dataset.hl); else el.textContent = t;
  });
  $$('a.wa').forEach(a => { a.href = wa(CFG.msg[lang]); a.target = '_blank'; a.rel = 'noopener' });
  document.documentElement.lang = lang; document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  document.documentElement.style.setProperty('--d', isRTL() ? -1 : 1);
  $('#lang').textContent = isRTL() ? 'EN' : 'ع';
  document.title = isRTL() ? 'Omar Osman — مصمم جرافيك ومطوّر مواقع' : 'Omar Osman — Graphic designer & web developer';
  build(); observe(); initScrub();
  requestAnimationFrame(() => $$('.split .w>i').forEach(n => n.closest('.split').classList.add('in')));
}

/* ---------- build dynamic blocks ---------- */
function build() {
  $('#rows').innerHTML = SERVICES.map((s, i) => `<div class="row" data-r><button class="row-h" aria-expanded="false"><span class="row-n">0${i + 1}</span><span class="row-t">${L(s)}</span><span class="row-p"></span></button><div class="row-b"><div><ul>${s.i.map(x => `<li>${x}</li>`).join('')}</ul></div></div></div>`).join('');
  $$('.row-h').forEach(b => b.onclick = () => { const r = b.parentNode, o = r.classList.contains('open'); $$('.row').forEach(x => { x.classList.remove('open'); $('.row-h', x).setAttribute('aria-expanded', 'false') }); if (!o) { r.classList.add('open'); b.setAttribute('aria-expanded', 'true') } });
  $('#scenes').innerHTML = PROJ.map((p, i) => `<article class="scene" style="--bg:${p.bg};--fg:${p.fg};--a:${p.a}" data-id="${p.id}">
    <div class="sc-txt"><h3>${p.name}</h3><p class="sc-cat">${L(p.cat)}</p><p class="sc-p">${L(p.tag)}</p>
    <div class="sc-links"><button class="btn" data-mag data-cur="view" data-open="${p.id}">${L(T.case)}</button><a class="link" href="${p.url}" target="_blank" rel="noopener">${L(T.live)}</a></div></div>
    <div class="frames" data-cur="view" data-open="${p.id}"><div class="bf"><img src="assets/img/${p.imgs[0]}.webp" alt="${p.name}" width="1920" height="${p.imgs[0].startsWith('nawarat-1') || p.imgs[0] === 'velora-1' ? 1080 : 1080}" loading="lazy"></div><div class="bf"><img src="assets/img/${p.imgs[1]}.webp" alt="${p.name}" width="1920" height="1080" loading="lazy"></div></div>
    <span class="sc-no">${i + 1} / ${PROJ.length}</span></article>`).join('');
  $('#bh').innerHTML = BH.map(b => `<a href="${b.u}" target="_blank" rel="noopener" data-cur="view" data-r><figure><img src="assets/img/${b.img}.webp" alt="${b.t}" width="834" height="456" loading="lazy"></figure><h4>${b.t}</h4><p>${L(b.c)}</p></a>`).join('');
  $$('[data-open]').forEach(el => el.onclick = () => openCase(el.dataset.open));
  $('#tl').innerHTML = '<i class="tl-line" id="tlLine"></i>' + STEPS.map((s, i) => `<div class="st" data-r><b>0${i + 1}</b><h3>${L(s)[0]}</h3><p>${L(s)[1]}</p></div>`).join('');
  $('#paths').innerHTML = PATHS.map((p, i) => `<a class="path" data-r data-mag href="${wa(isRTL() ? `السلام عليكم يا عمر، شفت عرض نهاية السنة على موقعك وحابب أستفيد منه. مهتم بـ ${p.ar[0]}` : `Hi Omar, I saw the year-end offer on your site and would like to use it. I'm interested in: ${p.en[0]}`)}" target="_blank" rel="noopener"><div><h3>${L(p)[0]}</h3><p>${L(p)[1]}</p></div><span class="go">→</span></a>`).join('');
  $$('.menu a').forEach(a => a.onclick = closeMenu);
  bindCursor(); bindMag();
}

/* ---------- reveals ---------- */
let io;
function observe() {
  io && io.disconnect();
  io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .15 });
  $$('[data-r],.about-img,.st').forEach(el => io.observe(el));
  $$('.offer .h2,.contact .mega,.services .h2,.work .h2,.process .h2').forEach(el => el.setAttribute('data-r', ''), io.observe);
  $$('[data-r]').forEach(el => io.observe(el));
}

/* ---------- scrubbed statement ---------- */
let words = [];
function initScrub() { words = $$('#stmt .w') }

/* ---------- scroll loop ---------- */
const nav = $('#nav'), prog = $('#prog'); let lastY = 0;
function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  prog.style.transform = `scaleX(${h ? y / h : 0})`;
  nav.classList.toggle('hide', y > lastY && y > 300); lastY = y;
  const vh = innerHeight;
  if (words.length) { const r = $('#stmt').getBoundingClientRect(), p = clamp((vh * .8 - r.top) / (r.height + vh * .3), 0, 1); words.forEach((w, i) => w.classList.toggle('lit', i / words.length < p * 1.1)) }
  const sc = $$('.scene'); if (innerWidth > 820 && !RM) sc.forEach((s, i) => { const n = sc[i + 1]; if (!n) return; const p = clamp(1 - n.getBoundingClientRect().top / vh, 0, 1); s.style.transform = `scale(${1 - .07 * p})`; s.style.filter = `brightness(${1 - .55 * p})` });
  const tl = $('#tl'); if (tl) { const r = tl.getBoundingClientRect(); $('#tlLine').style.transform = `scaleY(${clamp((vh * .6 - r.top) / r.height, 0, 1)})` }
  mqs.forEach(m => m.boost = clamp(Math.abs(y - m.ly) * .12, 0, 8)); mqs.forEach(m => m.ly = y);
}
addEventListener('scroll', onScroll, { passive: true });

/* ---------- marquees ---------- */
const mqs = [];
$$('.mq').forEach(el => {
  const inn = $('.mq-in', el); inn.innerHTML += inn.innerHTML + inn.innerHTML;
  mqs.push({ inn, speed: +el.dataset.speed, x: 0, boost: 0, ly: 0, w: 0 });
});
function tickMq() {
  mqs.forEach(m => { const w = m.inn.scrollWidth / 3; if (!w) return; const dir = isRTL() ? 1 : -1; m.x += dir * (m.speed + m.boost * .4); if (m.x > 0 && dir > 0) m.x -= w; if (m.x < -w && dir < 0) m.x += w; m.inn.style.transform = `translate3d(${m.x - (dir > 0 ? w : 0)}px,0,0)`; m.boost *= .93 });
  if (!RM) requestAnimationFrame(tickMq);
}

/* ---------- cursor with comet tail ---------- */
const orb = $('#orb'), oL = $('#orbL'), cv = $('#trail'), cx = cv.getContext('2d');
let mx = innerWidth / 2, my = innerHeight / 2, ox = mx, oy = my, trail = [];
function sizeCv() { const d = devicePixelRatio || 1; cv.width = innerWidth * d; cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0) }
function bindCursor() {
  if (!FINE || RM) return;
  $$('a,button,[data-cur]').forEach(el => { if (el._c) return; el._c = 1;
    el.addEventListener('pointerenter', () => { const c = el.dataset.cur; if (c === 'view') { oL.textContent = L(T.view); orb.className = 'orb big' } else if (c === 'drag') { oL.textContent = L(T.drag); orb.className = 'orb big' } else orb.className = 'orb sm' });
    el.addEventListener('pointerleave', () => orb.className = 'orb') });
}
if (FINE && !RM) {
  document.documentElement.classList.add('has-cur'); sizeCv(); addEventListener('resize', sizeCv);
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY });
  const draw = () => {
    ox += (mx - ox) * .22; oy += (my - oy) * .22; orb.style.transform = `translate(${ox}px,${oy}px)`;
    trail.push({ x: ox, y: oy }); if (trail.length > 34) trail.shift();
    cx.clearRect(0, 0, innerWidth, innerHeight); cx.globalCompositeOperation = 'lighter';
    for (let i = 1; i < trail.length; i++) { const t = i / trail.length; cx.strokeStyle = `rgba(255,40,50,${t * .5})`; cx.lineWidth = t * 20; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(trail[i - 1].x, trail[i - 1].y); cx.lineTo(trail[i].x, trail[i].y); cx.stroke() }
    if (trail.length > 2 && Math.hypot(mx - ox, my - oy) < .5) trail.shift();
    document.hidden || requestAnimationFrame(draw);
  };
  draw(); document.addEventListener('visibilitychange', () => !document.hidden && draw());
}
function bindMag() {
  if (!FINE || RM) return;
  $$('[data-mag]').forEach(el => { if (el._m) return; el._m = 1;
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)` });
    el.addEventListener('pointerleave', () => el.style.transform = '') });
}

/* ---------- lanyard (verlet rope + card) ---------- */
(function lanyard() {
  const box = $('#lanyard'), card = $('#card'), path = $('#ropeP'); if (!box) return;
  const N = 10; let pts = [], W, ax, SEG, drag = false, moved = 0, off = { x: 0, y: 0 }, cw, ch, start;
  function init() {
    W = box.clientWidth; ax = W / 2; cw = card.offsetWidth; ch = card.offsetHeight; SEG = box.clientHeight * .34 / N;
    pts = Array.from({ length: N + 1 }, (_, i) => ({ x: ax + i * 3, y: i * SEG, ox: ax + i * 3 - (i ? 1.5 : 0), oy: i * SEG }));
  }
  init(); addEventListener('resize', init);
  const pos = e => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top } };
  card.addEventListener('pointerdown', e => { drag = true; moved = 0; start = pos(e); const p = pts[N]; off = { x: p.x - start.x, y: p.y - start.y }; card.setPointerCapture(e.pointerId) });
  card.addEventListener('pointermove', e => { if (!drag) return; const p = pos(e); moved += Math.abs(p.x - start.x) + Math.abs(p.y - start.y); start = p });
  addEventListener('pointermove', e => { if (drag) { const p = pos(e); const t = pts[N]; t.x = clamp(p.x + off.x, -60, W + 60); t.y = clamp(p.y + off.y, SEG, box.clientHeight) } });
  addEventListener('pointerup', () => { if (drag && moved < 8) $('#card').classList.toggle('flip'); drag = false });
  function step() {
    for (let i = 1; i <= N; i++) { const p = pts[i]; if (drag && i === N) continue; const vx = (p.x - p.ox) * .975, vy = (p.y - p.oy) * .975; p.ox = p.x; p.oy = p.y; p.x += vx; p.y += vy + .55 }
    for (let k = 0; k < 14; k++) {
      pts[0].x = ax; pts[0].y = 0;
      for (let i = 0; i < N; i++) { const a = pts[i], b = pts[i + 1], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, df = (d - SEG) / d;
        if (i === 0) { b.x -= dx * df; b.y -= dy * df } else if (drag && i + 1 === N) { a.x += dx * df; a.y += dy * df } else { a.x += dx * df / 2; a.y += dy * df / 2; b.x -= dx * df / 2; b.y -= dy * df / 2 } }
      if (drag) { const e = pts[N]; e.x = clamp(e.x, -60, W + 60) }
    }
    const e = pts[N], a = pts[N - 1], ang = Math.atan2(e.x - a.x, e.y - a.y);
    path.setAttribute('d', 'M' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L'));
    card.style.transform = `translate(${e.x - cw / 2}px,${e.y - 10}px) rotate(${(-ang * 180 / Math.PI).toFixed(2)}deg)`;
    if (!RM || drag) requestAnimationFrame(step);
  }
  step();
})();

/* ---------- offer countdown ---------- */
function tickCd() {
  const left = CFG.endsAt - Date.now(), o = $('#offer');
  if (left <= 0) { o.classList.add('ended'); $('#strip').style.display = 'none'; document.documentElement.style.setProperty('--strip', '0px');
    $('.offer .h2').textContent = isRTL() ? 'اطلب عرض سعر' : 'Request a quote'; $('#offerSub').textContent = isRTL() ? 'احكيلي عن مشروعك وأرسل لك عرض سعر مناسب' : 'Tell me about your project and I will send you a fitting quote'; return }
  const p = n => String(n).padStart(2, '0'), s = Math.floor(left / 1e3);
  $('#cdD').textContent = p(Math.floor(s / 86400)); $('#cdH').textContent = p(Math.floor(s % 86400 / 3600)); $('#cdM').textContent = p(Math.floor(s % 3600 / 60)); $('#cdS').textContent = p(s % 60);
  $$('.cd-mini').forEach(m => m.textContent = `${Math.floor(s / 86400)}${isRTL() ? ' يوم ' : 'd '}${p(Math.floor(s % 86400 / 3600))}:${p(Math.floor(s % 3600 / 60))}:${p(s % 60)}`);
}
setInterval(tickCd, 1000);

/* ---------- case study overlay ---------- */
function openCase(id) {
  const p = PROJ.find(x => x.id === id), c = $('#case');
  c.style.cssText = `--bg:${p.bg};--fg:${p.fg};--a:${p.a}`;
  $('#caseBody').innerHTML = `<div class="cs"><h1>${p.name}</h1><p class="tag">${L(p.tag)}</p><p class="lead">${L(p.intro)}</p>
  <p class="sc-links" style="margin-top:24px"><a class="btn" style="background:${p.a};color:${p.bg}" href="${p.url}" target="_blank" rel="noopener">${L(T.live)}</a></p>
  <div class="cs-img"><img src="assets/img/${p.imgs[0]}.webp" alt="${p.name}" width="1920" height="1080"></div>
  <div class="cs-sec"><h2>${L(T.chT)}</h2><p>${L(p.ch)}</p></div>
  <div class="cs-sec"><h2>${L(T.didT)}</h2><p>${L(p.did)}</p></div>
  <div class="cs-sec"><h2>${L(T.decT)}</h2><div class="dec">${p.dec.map((d, i) => `<div><b>0${i + 1}</b><div><h3>${L(d)[0]}</h3><p>${L(d)[1]}</p></div></div>`).join('')}</div></div>
  ${p.imgs.map(n => `<div class="cs-img"><img src="assets/img/${n}.webp" alt="${p.name}" width="1920" height="1080" loading="lazy"></div>`).join('')}
  <div class="cs-sec"><h2>${L(T.dlT)}</h2><p>${L(p.dl)}</p></div>
  <div class="cs-cta"><h2>${L(T.cta)}</h2><a class="btn big" target="_blank" rel="noopener" href="${wa(CFG.msg[lang])}">${L(T.talk)}</a></div></div>`;
  orb.className = 'orb'; c.setAttribute('aria-hidden', 'false'); c.classList.add('on'); c.scrollTop = 0; document.body.classList.add('lock');
}
function closeCase() { orb.className = 'orb'; $('#case').classList.remove('on'); $('#case').setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock') }
$('#caseX').onclick = closeCase; addEventListener('keydown', e => e.key === 'Escape' && closeCase());

/* ---------- menu + language ---------- */
function closeMenu() { $('#menu').classList.remove('on'); $('#burger').classList.remove('on'); document.body.classList.remove('lock') }
$('#burger').onclick = () => { const o = $('#menu').classList.toggle('on'); $('#burger').classList.toggle('on', o); document.body.classList.toggle('lock', o) };
$('#lang').onclick = () => {
  const b = document.body; b.style.transition = 'opacity .25s'; b.style.opacity = 0;
  setTimeout(() => { lang = isRTL() ? 'en' : 'ar'; localStorage.setItem('lang', lang); applyText(); tickCd(); b.style.opacity = 1; onScroll() }, 260);
};

/* ---------- preloader ---------- */
function preload() {
  const pre = $('#pre'), cnt = $('#cnt'); let n = 0;
  const fin = () => { pre.classList.add('done'); document.body.classList.remove('lock'); setTimeout(() => pre.remove(), 1300) };
  if (RM || sessionStorage.getItem('seen')) return fin();
  document.body.classList.add('lock'); sessionStorage.setItem('seen', 1);
  const t = setInterval(() => { n = Math.min(100, n + 4 + Math.random() * 6); cnt.textContent = Math.floor(n); if (n >= 100) { clearInterval(t); setTimeout(fin, 250) } }, 55);
}

/* ---------- init ---------- */
applyText(); tickCd(); onScroll(); tickMq(); preload();
document.fonts && document.fonts.ready.then(onScroll);
})();
