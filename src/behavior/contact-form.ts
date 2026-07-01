const ENDPOINT = 'https://api.web3forms.com/submit';
const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-contact-status]');
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!status || !submitButton) return;

  const idleLabel = submitButton.textContent ?? '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    if (data.get('botcheck')) return;

    submitButton.disabled = true;
    submitButton.textContent = form.dataset.sendingText ?? idleLabel;
    status.textContent = '';
    status.removeAttribute('data-state');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message ?? 'submission failed');

      form.reset();
      status.textContent = form.dataset.successText ?? '';
      status.dataset.state = 'success';
    } catch {
      status.textContent = form.dataset.errorText ?? '';
      status.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = idleLabel;
    }
  });
});
