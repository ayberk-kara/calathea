function toggle(row: HTMLElement) {
  const expanded = row.getAttribute('data-expanded') === 'true';
  row.setAttribute('data-expanded', expanded ? 'false' : 'true');
  row.setAttribute('aria-expanded', expanded ? 'false' : 'true');
}

document.querySelectorAll<HTMLElement>('[data-expand]').forEach((row) => {
  if (!row.hasAttribute('aria-expanded')) row.setAttribute('aria-expanded', 'false');
  if (!row.hasAttribute('data-expanded')) row.setAttribute('data-expanded', 'false');

  row.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select, label')) return;
    toggle(row);
  });

  row.addEventListener('keydown', (event) => {
    if (event.target !== row) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle(row);
    }
  });
});
