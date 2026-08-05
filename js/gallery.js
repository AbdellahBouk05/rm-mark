// RM MARK — gallery.js
// Les cartes machines sont de simples liens <a>, ce script ajoute
// juste un léger effet de tabulation clavier + accessibilité.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.machine-card').forEach(card => {
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') card.click();
    });
  });
});
