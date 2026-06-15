document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
  const targetId = group.dataset.filterTarget;
  const list = targetId ? document.getElementById(targetId) : null;
  if (!list) return;

  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-filter-item]'));
  const status = document.querySelector<HTMLElement>(`[data-filter-status][data-filter-for="${targetId}"]`);
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button[data-filter-value]'));

  const apply = (value: string) => {
    list.setAttribute('data-active-filter', value);

    let visible = 0;
    items.forEach((item) => {
      const tags = (item.dataset.filterTags ?? '').split(/\s+/).filter(Boolean);
      const show = value === 'all' || tags.includes(value);
      item.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    if (status) {
      const template = status.dataset.filterTemplate ?? '{visible} / {total} {noun}';
      const noun = status.dataset.filterNoun ?? '';
      status.textContent = template
        .replace('{visible}', String(visible))
        .replace('{total}', String(items.length))
        .replace('{noun}', noun);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      apply(button.dataset.filterValue ?? 'all');
    });
  });

  const active = buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0];
  if (active) apply(active.dataset.filterValue ?? 'all');
});
