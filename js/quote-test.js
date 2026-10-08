/* Test branch only: quote requests go to the test inbox, without WhatsApp. */
(() => {
  const originalSubmitLead = window.submitLead;
  const testEmail = 'bdallahbwk@gmail.com';
  const banner = document.createElement('div');
  banner.textContent = 'TEST DEVIS — réception : ' + testEmail + ' — aucun message WhatsApp envoyé';
  banner.setAttribute('role', 'note');
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:99999;padding:10px;text-align:center;background:#fff3cd;color:#533f03;font:14px sans-serif';
  document.body.appendChild(banner);

  window.submitLead = async function(form, title, successId, modalId) {
    if (form.id !== 'formDevis') return originalSubmitLead(form, title, successId, modalId);
    const button = form.querySelector('.modal-submit');
    if (button.disabled) return;
    const originalHTML = button.innerHTML;
    const data = Object.fromEntries(new FormData(form).entries());
    const reference = 'RM-TEST-' + Date.now();
    let status = form.querySelector('.quote-test-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'quote-test-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.appendChild(status);
    }
    status.textContent = 'Envoi en cours…';
    button.disabled = true;
    button.textContent = 'Envoi en cours…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/' + testEmail, {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Accept':'application/json'},
        signal: controller.signal,
        body: JSON.stringify({...data, _subject: '[TEST RM MARK] ' + reference, _template: 'table', reference, page: window.location.href})
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error(result.message || 'Le service a refusé la demande.');
      }
      status.textContent = 'Le service a accepté le test ' + reference + '. Vérifiez la réception dans ' + testEmail + ' et les courriers indésirables. Cette confirmation ne garantit pas la livraison dans la boîte mail.';
      status.style.color = '#176b35';
      // Keep the values visible for comparison with the received email.
    } catch (error) {
      status.style.color = '#b42318';
      status.textContent = error.name === 'AbortError'
        ? 'Délai dépassé : réception non confirmée. Vérifiez votre boîte avant de réessayer.'
        : 'Envoi non confirmé : ' + error.message + ' Vérifiez aussi si FormSubmit demande une activation par e-mail.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.innerHTML = originalHTML;
    }
  };
})();
