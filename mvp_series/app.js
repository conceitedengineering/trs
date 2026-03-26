const path = window.location.pathname.split('/').pop() || 'index.html';

const publicNavToggle = document.querySelector('[data-public-nav-toggle]');
const publicNavOverlay = document.querySelector('[data-public-nav-overlay]');
const publicNavLinks = Array.from(document.querySelectorAll('.offerings-public-overlay .overlay-link'));
const PUBLIC_NAV_CLOSE_MS = 260;
let publicNavCloseTimer = null;
let bodyOverflowBeforePublicNav = '';

const isPublicNavOpen = () => document.body.classList.contains('public-nav-open');

const setPublicNav = (open) => {
  if (!publicNavToggle || !publicNavOverlay) return;

  window.clearTimeout(publicNavCloseTimer);
  publicNavToggle.setAttribute('aria-expanded', String(open));

  if (open) {
    if (!isPublicNavOpen()) {
      bodyOverflowBeforePublicNav = document.body.style.overflow;
    }
    document.body.style.overflow = 'hidden';
    publicNavOverlay.hidden = false;
    window.requestAnimationFrame(() => {
      document.body.classList.add('public-nav-open');
    });
    return;
  }

  document.body.classList.remove('public-nav-open');
  document.body.style.overflow = bodyOverflowBeforePublicNav;

  publicNavCloseTimer = window.setTimeout(() => {
    if (!isPublicNavOpen()) {
      publicNavOverlay.hidden = true;
    }
  }, PUBLIC_NAV_CLOSE_MS);
};

if (publicNavToggle && publicNavOverlay) {
  publicNavToggle.addEventListener('click', () => {
    setPublicNav(!isPublicNavOpen());
  });

  publicNavLinks.forEach((link) => {
    link.addEventListener('click', () => setPublicNav(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setPublicNav(false);
    }
  });

  document.addEventListener('click', (event) => {
    if (!isPublicNavOpen()) return;
    const insideOverlay = publicNavOverlay.contains(event.target);
    const insideToggle = publicNavToggle.contains(event.target);
    if (!insideOverlay && !insideToggle) {
      setPublicNav(false);
    }
  });
}

const homeVideo = document.querySelector('[data-home-video]');
if (homeVideo) {
  const videoSrc = homeVideo.dataset.src?.trim();
  if (videoSrc) {
    homeVideo.src = videoSrc;
    const autoplay = homeVideo.play();
    if (autoplay && typeof autoplay.catch === 'function') {
      autoplay.catch(() => {});
    }
  } else {
    homeVideo.remove();
  }
}

document.querySelectorAll('[data-nav-link]').forEach((link) => {
  if (link.getAttribute('href') === path) {
    link.setAttribute('aria-current', 'page');
  }
});

document.querySelectorAll('footer').forEach((footer) => {
  if (footer.querySelector('.footer-legal')) return;

  const legalNav = document.createElement('nav');
  legalNav.className = 'footer-legal';
  legalNav.setAttribute('aria-label', 'Legal');
  legalNav.innerHTML = `
    <a href="terms.html">Terms and conditions</a>
    <span aria-hidden="true">•</span>
    <a href="disclaimer.html">Disclaimer</a>
  `;
  footer.appendChild(legalNav);
});
