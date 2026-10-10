/* =========================================================
   Ran Digital (RND) — Tokenomics Page Interactions
   ========================================================= */

/* ---------- Mobile Menu (with body scroll lock) ---------- */
(function initMobileMenu() {
  const toggle = document.getElementById('mobileMenu');
  const links = document.getElementById('navMenu');

  if (!toggle || !links) return;

  const openMenu = () => {
    links.classList.add('active');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
  };

  const closeMenu = () => {
    links.classList.remove('active');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    links.classList.contains('active') ? closeMenu() : openMenu();
  });

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
  });
})();

/* ---------- Copy Contract Address ---------- */
(function initCopyButton() {
  const copyBtn = document.getElementById('copyBtn');
  const contractEl = document.getElementById('contractAddress');

  if (!copyBtn || !contractEl) return;

  copyBtn.addEventListener('click', async () => {
    const address = contractEl.textContent.trim();
    const originalHTML = copyBtn.innerHTML;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {
        const input = document.createElement('textarea');
        input.value = address;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const ok = document.execCommand('copy');
        input.remove();
        if (!ok) throw new Error('copy failed');
      }

      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
      copyBtn.style.background = 'linear-gradient(135deg, #00dbff, #3b82f6)';
      copyBtn.style.color = '#05070d';

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 1800);
    } catch {
      window.prompt('Copy the contract address:', address);
    }
  });
})();

/* ---------- Navbar Shadow on Scroll ---------- */
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(6, 9, 18, 0.96)';
      navbar.style.boxShadow = '0 10px 30px -15px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(6, 9, 18, 0.92)';
      navbar.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Smooth Scroll for Anchor Links (uses dynamic nav height) ---------- */
(function initSmoothScroll() {
  const navHeight = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top
                  + window.pageYOffset
                  - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
