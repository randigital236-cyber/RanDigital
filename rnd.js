/* =========================================================
   Ran Digital (RND) — Interactions
   ========================================================= */

/* ---------- AOS Init ---------- */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });
}

/* ---------- Mobile Menu (with body scroll lock) ---------- */
(function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenu');
  const navMenu = document.getElementById('navMenu');

  if (!mobileToggle || !navMenu) return;

  const openMenu = () => {
    navMenu.classList.add('active');
    document.body.classList.add('nav-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
  };

  const closeMenu = () => {
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  };

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
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
function copyAddress() {
  const input = document.getElementById('contract');
  if (!input) return;
  const val = input.value;

  if (!navigator.clipboard) {
    input.select();
    input.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      window.prompt('Copy contract address:', val);
    }
    return;
  }

  navigator.clipboard.writeText(val)
    .then(showCopyFeedback)
    .catch(() => window.prompt('Copy contract address:', val));
}

function showCopyFeedback() {
  const btn = document.querySelector('.copy-btn');
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  btn.style.background = 'linear-gradient(135deg, #00dbff, #3b82f6)';
  btn.style.color = '#05070d';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
}

/* ---------- Live Chart Button ---------- */
(function initChartButton() {
  const chartBtn = document.getElementById('chartBtn');
  if (!chartBtn) return;

  chartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(
      'https://www.geckoterminal.com/bsc/pools/0xcF1FbF18bE9202865bcf88E6349B9D207F75942d',
      '_blank',
      'noopener,noreferrer'
    );
  });
})();

/* ---------- FAQ Accordion ---------- */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');

    if (!question || !answer) return;

    const toggle = () => {
      const isOpen = answer.classList.contains('active');

      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
      document.querySelectorAll('.faq-question i').forEach(i => (i.style.transform = 'rotate(0deg)'));
      document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        answer.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
        question.setAttribute('aria-expanded', 'true');
      }
    };

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
})();

/* ---------- Smooth Scroll for Anchor Links (uses dynamic nav height) ---------- */
(function initSmoothScroll() {
  const navHeight = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')
  ) || 72;

  const allowedHashes = ['#about', '#tokenomics', '#roadmap', '#team', '#faq'];

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && allowedHashes.includes(hash)) {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          const top = target.getBoundingClientRect().top
                    + window.pageYOffset
                    - navHeight - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
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
