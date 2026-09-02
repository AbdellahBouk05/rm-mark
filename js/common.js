async function loadPartial(url, targetId){
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(targetId).innerHTML = html;
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadPartial('/partials/header.html', 'site-header'),
    loadPartial('/partials/sidebar.html', 'site-sidebar')
  ]);
  initHeaderBehavior();
  initSidebarBehavior();
  document.querySelectorAll('#formDevis input[name="societe"]').forEach(input => {
    if (!input.value) input.value = 'RM MARK';
  });
});

function initHeaderBehavior(){
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.has-dropdown').forEach(item => {
    let closeTimer = null;
    const open = () => { clearTimeout(closeTimer); item.classList.add('open'); };
    const scheduleClose = () => { clearTimeout(closeTimer); closeTimer = setTimeout(() => item.classList.remove('open'), 350); };

    item.addEventListener('mouseenter', () => { if (window.innerWidth > 760) open(); });
    item.addEventListener('mouseleave', () => { if (window.innerWidth > 760) scheduleClose(); });

    const trigger = item.querySelector('> a');
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 760) { e.preventDefault(); item.classList.toggle('open'); }
    });
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-dropdown.open').forEach(item => {
      if (!item.contains(e.target)) item.classList.remove('open');
    });
  });
}

function initSidebarBehavior(){
  // Rien à initialiser : simples liens directs (tel / mailto / whatsapp / ancre / modale)
}