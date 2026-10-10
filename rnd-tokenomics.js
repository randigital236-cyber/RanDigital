/* =========================================================
   Ran Digital (RND) — Tokenomics Page Interactions
   ========================================================= */

/* ---------- Mobile Menu ---------- */
(function initMobileMenu() {
  const toggle = document.getElementById('mobileMenu');
  const links = document.getElementById('navMenu');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="fas fa-times" aria-hidden="true"></i>'
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    }
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
        // Fallback for older browsers / non-secure contexts
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

      // Visual feedback
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
      navbar.style.background = 'rgba(6, 9, 18, 0.92)';
      navbar.style.boxShadow = '0 10px 30px -15px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(6, 9, 18, 0.72)';
      navbar.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Smooth Scroll for Anchor Links ---------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();