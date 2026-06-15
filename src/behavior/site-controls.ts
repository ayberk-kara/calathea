const root = document.documentElement;

document.querySelectorAll<HTMLButtonElement>('[data-mode-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = root.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-mode', next);
    try {
      localStorage.setItem('mode', next);
    } catch {
      /* localStorage unavailable */
    }
  });
});

document.querySelectorAll<HTMLSelectElement>('[data-skin-select]').forEach((select) => {
  const current = root.getAttribute('data-skin');
  if (current) select.value = current;

  select.addEventListener('change', () => {
    root.setAttribute('data-skin', select.value);
    try {
      localStorage.setItem('skin', select.value);
    } catch {
      /* localStorage unavailable */
    }
  });
});

document.querySelectorAll<HTMLButtonElement>('[data-nav-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', expanded ? 'false' : 'true');

    const targetId = button.getAttribute('aria-controls');
    const target = targetId ? document.getElementById(targetId) : null;
    target?.classList.toggle('is-open', !expanded);
  });
});
