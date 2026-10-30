/* ============================================================
   rdv.js -- page « Prendre rendez-vous » : l'agenda Google de prise de rendez-vous, intégré au site.
   Demandé le 30/10/2026 : « j'aimerais que les professeurs puissent prendre rendez-vous aussi sans quitter le site ».
   Ouverte depuis le menu « L'Atelier du prof », la page /professeurs/ et la page /tarifs/ (#/rendez-vous), pour tous,
   connecté ou non. L'agenda n'est chargé qu'à l'ouverture de la page.
   ============================================================ */

function rdvOuvrir(){
  const d = document.getElementById('accountDropdown'); if(d) d.style.display = 'none';
  showView('view-rdv'); setActiveTopnav(null);
  const f = document.getElementById('rdvAgenda');
  if(f && !f.getAttribute('src')) f.setAttribute('src', f.dataset.src);
}
