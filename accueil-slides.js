/* =====================================================================
   accueil-slides.js -- les deux carrousels de l'accueil, sous les niveaux (demandé le 11/11/2026 : « 1er bloc : un slide avec
   les fonctionnalités innovantes, des copies d'écran. 2e bloc : un slide de vidéo »).
   Chaque .car : une piste à défilement horizontal aimanté (doigt, molette, clavier), flèches, points ; data-auto = défilement
   automatique (ms), suspendu au survol, au focus, au doigt, hors de l'écran, et jamais si l'appareil demande moins
   d'animations. Carrousel des vidéos : la vidéo (assets/videos) n'est chargée qu'au clic sur son image ; changer de diapositive
   la met en pause.
   ===================================================================== */
(function(){
  const moinsAnim = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function carrousel(car){
    const piste = car.querySelector('.car-piste'), diapos = [...piste.children], pts = car.querySelector('.car-points');
    if(!diapos.length) return;
    let actuelle = 0, minuterie = null, pause = false, visible = true;
    pts.innerHTML = diapos.map((d, i) => `<button type="button" role="tab" aria-label="${i + 1} sur ${diapos.length}"></button>`).join('');
    const boutons = [...pts.children];
    const aller = (i, doux = true) => {
      i = (i + diapos.length) % diapos.length;
      piste.scrollTo({ left: diapos[i].offsetLeft - piste.offsetLeft, behavior: doux && !moinsAnim ? 'smooth' : 'auto' });
    };
    const maj = () => {
      const x = piste.scrollLeft, l = piste.clientWidth || 1;
      const i = Math.max(0, Math.min(diapos.length - 1, Math.round(x / l)));
      if(i !== actuelle){ arreterVideos(diapos[actuelle]); actuelle = i; }
      boutons.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      diapos.forEach((d, k) => d.setAttribute('aria-hidden', k === i ? 'false' : 'true'));
    };
    boutons.forEach((b, i) => b.addEventListener('click', () => { aller(i); relancer(); }));
    car.querySelector('.car-prec').addEventListener('click', () => { aller(actuelle - 1); relancer(); });
    car.querySelector('.car-suiv').addEventListener('click', () => { aller(actuelle + 1); relancer(); });
    let attente = null;
    piste.addEventListener('scroll', () => { clearTimeout(attente); attente = setTimeout(maj, 60); }, { passive: true });
    piste.addEventListener('keydown', e => {
      if(e.key === 'ArrowRight'){ e.preventDefault(); aller(actuelle + 1); relancer(); }
      if(e.key === 'ArrowLeft'){ e.preventDefault(); aller(actuelle - 1); relancer(); }
    });
    window.addEventListener('resize', () => aller(actuelle, false));

    // Défilement automatique (1er bloc seulement).
    const delai = parseInt(car.dataset.auto, 10);
    function relancer(){
      clearInterval(minuterie); minuterie = null;
      if(!delai || moinsAnim || pause || !visible) return;
      minuterie = setInterval(() => { if(!document.hidden) aller(actuelle + 1); }, delai);
    }
    if(delai && !moinsAnim){
      ['mouseenter', 'focusin', 'touchstart'].forEach(t => car.addEventListener(t, () => { pause = true; relancer(); }, { passive: true }));
      ['mouseleave', 'focusout'].forEach(t => car.addEventListener(t, () => { pause = false; relancer(); }));
      if('IntersectionObserver' in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; relancer(); }, { threshold: .4 }).observe(car);
    }

    // Vidéos : chargées au clic.
    car.querySelectorAll('.car-video .car-jouer').forEach(btn => btn.addEventListener('click', () => {
      const fig = btn.closest('.car-video'), nom = fig.dataset.video;
      const q = (typeof HOME_VIDEO_V !== 'undefined' && HOME_VIDEO_V[nom]) || '';
      const v = document.createElement('video');
      v.controls = true; v.playsInline = true; v.preload = 'metadata'; v.poster = `assets/videos/${nom}.jpg${q}`;
      v.setAttribute('aria-label', btn.getAttribute('aria-label') || 'Vidéo');
      v.innerHTML = `<source src="assets/videos/${nom}.mp4${q}" type="video/mp4">`;
      btn.replaceWith(v);
      v.play().catch(() => {});
      pause = true; relancer();
    }));
    maj(); relancer();
  }
  function arreterVideos(fig){ if(fig) fig.querySelectorAll('video').forEach(v => v.pause()); }

  function init(){ document.querySelectorAll('#view-home .car').forEach(carrousel); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
