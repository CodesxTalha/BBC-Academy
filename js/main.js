/**
 * BBC ACADEMY — MAIN CLIENT SCRIPT
 * High-performance 3D Coverflow Sliders for Proven Results & Programs
 * Smooth Timetable Switcher, Clean FAQ Accordion, Mobile Drawer & Scroll Spy
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. HEADER SCROLL STATE & MOBILE DRAWER
  // -------------------------------------------------------------------------
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const openMenu = () => {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openMenu);
  drawerClose?.addEventListener('click', closeMenu);
  mobileBackdrop?.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // -------------------------------------------------------------------------
  // 2. GENERIC 3D COVERFLOW FACTORY
  // -------------------------------------------------------------------------
  function initCoverflow({
    containerSelector,
    cardSelector,
    prevBtnSelector,
    nextBtnSelector,
    dotsSelector,
    autoInterval = 4000
  }) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const cards = container.querySelectorAll(cardSelector);
    const prevBtn = container.querySelector(prevBtnSelector);
    const nextBtn = container.querySelector(nextBtnSelector);
    const dotContainer = document.querySelector(dotsSelector);
    const dots = dotContainer ? dotContainer.querySelectorAll('.c-dot') : [];

    const total = cards.length;
    if (total === 0) return;

    let currentIndex = 0;
    let timer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    const updateClasses = () => {
      cards.forEach((card, i) => {
        card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');

        // Distance in loop
        const diff = (i - currentIndex + total) % total;

        if (diff === 0) {
          card.classList.add('is-active');
        } else if (diff === 1) {
          card.classList.add('is-next');
        } else if (diff === total - 1) {
          card.classList.add('is-prev');
        } else {
          card.classList.add('is-hidden');
        }
      });

      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goTo = (index) => {
      currentIndex = (index + total) % total;
      updateClasses();
    };

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    // Event Listeners
    nextBtn?.addEventListener('click', () => {
      next();
      resetTimer();
    });

    prevBtn?.addEventListener('click', () => {
      prev();
      resetTimer();
    });

    // Clicking prev or next cards directly jumps
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (card.classList.contains('is-prev')) {
          prev();
          resetTimer();
        } else if (card.classList.contains('is-next')) {
          next();
          resetTimer();
        }
      });
    });

    // Dot indicators
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goTo(idx);
        resetTimer();
      });
    });

    // Touch Swipe Support
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          next();
        } else {
          prev();
        }
        resetTimer();
      }
    };

    // Auto-rotation timer
    const startTimer = () => {
      stopTimer();
      if (autoInterval > 0) {
        timer = setInterval(next, autoInterval);
      }
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const resetTimer = () => {
      stopTimer();
      startTimer();
    };

    container.addEventListener('mouseenter', stopTimer);
    container.addEventListener('mouseleave', startTimer);

    // Initial setup
    updateClasses();
    startTimer();
  }

  // Initialize Proven Results Coverflow (4.0s interval)
  initCoverflow({
    containerSelector: '#provenCoverflow',
    cardSelector: '.coverflow-card',
    prevBtnSelector: '#provenPrev',
    nextBtnSelector: '#provenNext',
    dotsSelector: '#provenDots',
    autoInterval: 4000
  });

  // Initialize Our Programs Coverflow (4.5s interval)
  initCoverflow({
    containerSelector: '#programsCoverflow',
    cardSelector: '.program-flow-card',
    prevBtnSelector: '#programsPrev',
    nextBtnSelector: '#programsNext',
    dotsSelector: '#programsDots',
    autoInterval: 4500
  });

  // -------------------------------------------------------------------------
  // 3. TIMETABLE TAB SWITCHER
  // -------------------------------------------------------------------------
  const ttTabs = document.querySelectorAll('.tt-tab-btn');
  const ttPanels = document.querySelectorAll('.tt-panel');

  ttTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      ttTabs.forEach(t => t.classList.remove('active'));
      ttPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. CLEAN FAQ ACCORDION (One Open At A Time)
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-clean-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-clean-question');
    const answer = item.querySelector('.faq-clean-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all items first
      faqItems.forEach(other => {
        const otherBtn = other.querySelector('.faq-clean-question');
        const otherAns = other.querySelector('.faq-clean-answer');
        if (otherBtn && otherAns) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.classList.remove('is-open');
        }
      });

      // Toggle clicked item
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('is-open');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 5. SCROLL SPY FOR NAVIGATION
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = id;
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
});
