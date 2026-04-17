const rawPath = window.location.pathname.split('/').pop() || 'index.html';
const path = rawPath.includes('.') ? rawPath : `${rawPath}.html`;
const NAV_PAGE_LABELS = {
  'index.html': 'Home',
  'about.html': 'About',
  'offerings.html': 'Offerings',
  'contact.html': 'Contact',
  'member-home.html': 'Member Home',
  'member-home-final.html': 'Member Home',
  'member-home-1.html': 'MemberHome1',
  'member-home-2.html': 'MemberHome2',
  'member-home-3.html': 'MemberHome3',
  'legacy-member-home.html': 'LegacyMemberHome',
  'terms.html': 'Terms',
  'disclaimer.html': 'Disclaimer',
  'journal.html': 'Journal',
  'journal-start-signals.html': 'Journal',
  'journal-patterns-essay.html': 'Journal',
  'journal-evening-reset.html': 'Journal',
  'journal-skin-rhythm-notes.html': 'Journal',
  'journal-steady-progress.html': 'Journal',
  'journal-nervous-system-check.html': 'Journal',
  'recipes.html': 'Recipes',
  'recipe-brothy-sausage.html': 'Recipes',
  'recipe-golden-miso.html': 'Recipes',
  'recipe-citrus-chickpea.html': 'Recipes',
  'recipe-herbed-salmon-rice.html': 'Recipes',
  'recipe-mineral-broth.html': 'Recipes',
  'recipe-roasted-squash-soup.html': 'Recipes',
  'playlists.html': 'Playlists',
  'playlist-current.html': 'Playlists',
  'playlist-night-archive.html': 'Playlists',
};

const MEMBER_HOME_VARIANTS = [
  { href: 'member-home-final.html', label: 'Member Home' },
];

const PUBLIC_GLOBAL_NAV_PAGES = new Set([
  'index.html',
  'offerings.html',
  'about.html',
  'contact.html',
  'terms.html',
  'disclaimer.html',
]);

const getGlobalNavMode = () => (PUBLIC_GLOBAL_NAV_PAGES.has(path) ? 'public' : 'member');

const getGlobalNavActiveKey = (mode) => {
  if (mode === 'public') {
    if (path === 'offerings.html') return 'offerings';
    if (path === 'about.html') return 'about';
    if (path === 'contact.html') return 'contact';
    return '';
  }

  if (path.startsWith('journal')) return 'read';
  if (path.startsWith('recipe')) return 'cook';
  if (path.startsWith('playlist')) return 'listen';
  return 'method';
};

const mountGlobalTopNav = () => {
  const navBar = document.querySelector('.member-home-final-nav, .nav1-bar, .nav2-bar');
  if (!navBar) return;

  const navHeader = navBar.closest('header');
  if (navHeader) {
    navHeader.classList.add('trs-global-header');
    navHeader.classList.remove('member-home-final-header', 'nav1-header', 'nav1-header--light', 'nav1-header--dark', 'nav2-header');
  }

  navBar.classList.remove('member-home-final-nav', 'nav1-bar', 'nav2-bar');
  navBar.classList.add('trs-global-nav');

  const mode = getGlobalNavMode();
  const activeKey = getGlobalNavActiveKey(mode);
  const centerLinks =
    mode === 'member'
      ? [
          { key: 'method', href: 'method-content.html', label: 'Method' },
          { key: 'read', href: 'journal.html', label: 'Read' },
          { key: 'cook', href: 'recipes.html', label: 'Cook' },
          { key: 'listen', href: 'playlists.html', label: 'Listen' },
        ]
      : [
          { key: 'offerings', href: 'offerings.html', label: 'Offerings' },
          { key: 'about', href: 'about.html', label: 'About' },
          { key: 'contact', href: 'contact.html', label: 'Contact' },
        ];

  const centerMarkup = centerLinks
    .map(({ key, href, label }) => {
      const isCurrent = key === activeKey;
      return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${label}</a>`;
    })
    .join('');

  navBar.innerHTML = `
    <a class="trs-global-wordmark" href="index.html">THE ROUTINE SERVICE</a>
    <div class="trs-global-nav-center">${centerMarkup}</div>
    <div class="trs-global-nav-icons">
      <a class="trs-global-icon-link" href="offerings.html" aria-label="Shop">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8h12l-1 11H7L6 8Z"></path>
          <path d="M9 9V7a3 3 0 0 1 6 0v2"></path>
        </svg>
      </a>
      <a class="trs-global-icon-link" href="member-home-final.html" aria-label="Account">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.25"></circle>
          <path d="M6.5 18.5a5.5 5.5 0 0 1 11 0"></path>
        </svg>
      </a>
    </div>
  `;
};

mountGlobalTopNav();

const textureHost = document.querySelector('.offerings-bg, .trs-dark-bg, .dark-zone-bg');
if (textureHost) {
  const root = document.documentElement;
  const textureVar = getComputedStyle(root).getPropertyValue('--trs-texture-image').trim();
  const textureUrls = Array.from(textureVar.matchAll(/url\((['"]?)(.*?)\1\)/g), (match) => match[2]);
  let textureSrc = textureUrls[0];
  if (textureUrls.length > 1) {
    textureSrc = window.devicePixelRatio > 1.25 ? textureUrls[textureUrls.length - 1] : textureUrls[0];
  }

  const markTextureReady = () => {
    root.classList.add('trs-texture-ready');
  };

  if (textureSrc) {
    const preloadTexture = new Image();
    preloadTexture.decoding = 'async';
    preloadTexture.loading = 'eager';
    preloadTexture.fetchPriority = 'high';
    preloadTexture.onload = markTextureReady;
    preloadTexture.onerror = markTextureReady;
    preloadTexture.src = textureSrc;

    if (preloadTexture.complete) {
      markTextureReady();
    }
  } else {
    markTextureReady();
  }
}

const publicNavToggle = document.querySelector('[data-public-nav-toggle]');
const publicNavOverlay = document.querySelector('[data-public-nav-overlay]');
const publicNavOverlayNav = publicNavOverlay?.querySelector('.offerings-public-overlay-nav');
const publicNavLinks = Array.from(document.querySelectorAll('.offerings-public-overlay .overlay-link'));
const PUBLIC_NAV_CLOSE_MS = 260;
let publicNavCloseTimer = null;
let bodyOverflowBeforePublicNav = '';

const isPublicNavOpen = () => document.body.classList.contains('public-nav-open');

if (publicNavOverlay) {
  publicNavOverlay.inert = true;
}

if (publicNavOverlayNav && publicNavOverlay?.classList.contains('nav2-overlay')) {
  MEMBER_HOME_VARIANTS.forEach(({ href, label }) => {
    let link = publicNavOverlayNav.querySelector(`a[href="${href}"]`);

    if (!link) {
      link = document.createElement('a');
      link.href = href;
      link.className = 'overlay-link';
      link.dataset.navLink = '';
      publicNavOverlayNav.appendChild(link);
    }

    link.textContent = label;
  });

  Array.from(publicNavOverlayNav.querySelectorAll('.overlay-link')).forEach((link, index) => {
    link.style.setProperty('--i', index);
  });
}

const setPublicNav = (open) => {
  if (!publicNavToggle || !publicNavOverlay) return;

  window.clearTimeout(publicNavCloseTimer);
  publicNavToggle.setAttribute('aria-expanded', String(open));
  const shouldLockBody =
    !publicNavOverlay.classList.contains('nav1-overlay') &&
    !publicNavOverlay.classList.contains('nav2-overlay');

  if (open) {
    if (shouldLockBody && !isPublicNavOpen()) {
      bodyOverflowBeforePublicNav = document.body.style.overflow;
    }
    if (shouldLockBody) {
      document.body.style.overflow = 'hidden';
    }
    publicNavOverlay.hidden = false;
    publicNavOverlay.inert = false;
    window.requestAnimationFrame(() => {
      document.body.classList.add('public-nav-open');
    });
    return;
  }

  publicNavOverlay.inert = true;
  document.body.classList.remove('public-nav-open');
  if (shouldLockBody) {
    document.body.style.overflow = bodyOverflowBeforePublicNav;
  }

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

const nav1Bar = document.querySelector('.nav1-bar');
const nav1Menu = nav1Bar?.querySelector('.nav1-menu');
const shouldShowPublicCurrentTag = path !== 'index.html';
if (shouldShowPublicCurrentTag && nav1Bar && nav1Menu && !nav1Bar.querySelector('.nav1-current')) {
  const leftCluster = document.createElement('div');
  leftCluster.className = 'nav1-left';
  nav1Bar.insertBefore(leftCluster, nav1Menu);
  leftCluster.appendChild(nav1Menu);

  const current = document.createElement('span');
  current.className = 'nav1-current';
  current.textContent = NAV_PAGE_LABELS[path] || 'Page';
  leftCluster.appendChild(current);
}

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
