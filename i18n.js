// ============================================
// RM MARK — i18n.js (chargement, switch, persistance)
// ============================================
const SUPPORTED_LANGS = ['fr', 'en'];
const DEFAULT_LANG = 'fr';
let translations = {};

function detectLang(){
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;
  const saved = localStorage.getItem('rm_mark_lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const browserLang = navigator.language.slice(0,2);
  if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;
  return DEFAULT_LANG;
}

// Récupère une valeur imbriquée via "section.cle"
function getPath(obj, path){
  return path.split('.').reduce((o,k) => (o || {})[k], obj);
}

function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = getPath(translations, el.getAttribute('data-i18n'));
    if (val === undefined) return;
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = getPath(translations, el.getAttribute('data-i18n-placeholder'));
    if (val !== undefined) el.setAttribute('placeholder', val);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    // format: data-i18n-attr="title:sidebar.phone"
    el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      const val = getPath(translations, key);
      if (val !== undefined) el.setAttribute(attr, val);
    });
  });
  const metaTitle = getPath(translations, 'meta.title');
  const metaDesc = getPath(translations, 'meta.description');
  if (metaTitle) document.title = metaTitle;
  if (metaDesc) document.querySelector('meta[name="description"]')?.setAttribute('content', metaDesc);
  document.documentElement.setAttribute('lang', currentLang);
  document.querySelectorAll('.lang-switch a').forEach(a => {
    a.classList.toggle('active', a.dataset.lang === currentLang);
  });
}

let currentLang = DEFAULT_LANG;

async function loadLang(lang){
  const res = await fetch(lang + '.json');
  translations = await res.json();
  currentLang = lang;
  localStorage.setItem('rm_mark_lang', lang);
  applyTranslations();

  // Met à jour l'URL sans recharger la page (?lang=en / ?lang=fr) — utile pour le partage et le SEO
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
}

function setLang(lang){
  if (lang !== currentLang) loadLang(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  loadLang(detectLang());
});