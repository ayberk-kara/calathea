const images = document.querySelectorAll<HTMLImageElement>('[data-lightbox]');

if (images.length > 0) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('data-open', 'false');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const fullImage = document.createElement('img');
  overlay.appendChild(fullImage);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'lightbox-overlay__close';
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.textContent = '×';
  overlay.appendChild(closeButton);

  document.body.appendChild(overlay);

  let trigger: HTMLElement | null = null;

  const open = (image: HTMLImageElement) => {
    fullImage.src = image.currentSrc || image.src;
    fullImage.alt = image.alt;
    trigger = image;
    overlay.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };

  const close = () => {
    overlay.setAttribute('data-open', 'false');
    fullImage.src = '';
    document.body.style.overflow = '';
    trigger?.focus();
  };

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  closeButton.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.getAttribute('data-open') === 'true') close();
  });

  images.forEach((image) => {
    image.addEventListener('click', () => open(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(image);
      }
    });
  });
}
