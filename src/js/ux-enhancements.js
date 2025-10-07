/**
 * ========================================
 * UX/UI ENHANCEMENTS - CTAs FIXOS, SCROLL SUAVE, MENU BLUR
 * ========================================
 */

class UXController {
  constructor() {
    this.fixedCTA = null;
    this.scrollProgress = null;
    this.navbarBlur = null;
    this.init();
  }

  init() {
    this.createFixedCTA();
    this.createScrollProgress();
    this.enhanceNavbar();
    this.setupSmoothScroll();
    this.setupBackToTop();
    this.setupActiveSection();
  }

  /**
   * CTA Fixo Flutuante
   */
  createFixedCTA() {
    // Create floating CTA button
    this.fixedCTA = document.createElement('a');
    this.fixedCTA.href = './download.html';
    this.fixedCTA.className = 'fixed-cta pulse-cta glass-btn';
    this.fixedCTA.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Baixar Agora
    `;
    
    this.fixedCTA.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
      display: none;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(168, 85, 247, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(this.fixedCTA);

    // Show/hide based on scroll position
    let lastScrollY = 0;
    let ticking = false;

    const updateCTA = () => {
      const scrollY = window.pageYOffset;
      
      // Show after scrolling down 300px
      if (scrollY > 300) {
        this.fixedCTA.style.display = 'flex';
        this.fixedCTA.style.opacity = '1';
        this.fixedCTA.style.transform = 'translateY(0)';
      } else {
        this.fixedCTA.style.opacity = '0';
        this.fixedCTA.style.transform = 'translateY(20px)';
        setTimeout(() => {
          if (window.pageYOffset <= 300) {
            this.fixedCTA.style.display = 'none';
          }
        }, 300);
      }

      // Hide when scrolling up quickly
      if (scrollY < lastScrollY && scrollY > 100) {
        this.fixedCTA.style.transform = 'translateY(100px)';
      } else {
        this.fixedCTA.style.transform = 'translateY(0)';
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateCTA);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    // Mobile optimization
    if (window.innerWidth <= 768) {
      this.fixedCTA.style.bottom = '16px';
      this.fixedCTA.style.right = '16px';
      this.fixedCTA.style.padding = '10px 16px';
      this.fixedCTA.style.fontSize = '0.9rem';
    }
  }

  /**
   * Barra de Progresso do Scroll
   */
  createScrollProgress() {
    this.scrollProgress = document.createElement('div');
    this.scrollProgress.className = 'scroll-progress';
    this.scrollProgress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #A855F7, #38BDF8);
      z-index: 9999;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
    `;

    document.body.appendChild(this.scrollProgress);

    // Update progress on scroll
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      this.scrollProgress.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /**
   * Navbar com Blur e Efeitos
   */
  enhanceNavbar() {
    const navbar = document.querySelector('.site-header');
    if (!navbar) return;

    navbar.classList.add('glass-navbar');

    // Add scroll blur effect
    let lastScrollY = 0;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.pageYOffset;
      
      if (scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 26, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.75)';
        navbar.style.backdropFilter = 'blur(16px)';
        navbar.style.webkitBackdropFilter = 'blur(16px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.12)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
      }

      // Hide/show navbar on scroll
      if (scrollY > lastScrollY && scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    // Smooth navbar transition
    navbar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  /**
   * Scroll Suave entre Seções
   */
  setupSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
      });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.getElementById(href.substring(1));
          if (targetElement) {
            this.smoothScrollTo(targetElement);
          }
        }
      });
    });
  }

  smoothScrollTo(targetElement, duration = 1000) {
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  easeInOutQuart(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  }

  /**
   * Botão Voltar ao Topo
   */
  setupBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top glass-btn';
    backToTop.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18,15 12,9 6,15"/>
      </svg>
    `;
    
    backToTop.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    backToTop.addEventListener('click', () => {
      this.smoothScrollTo(document.body, 800);
    });

    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.style.display = 'flex';
        backToTop.style.opacity = '1';
      } else {
        backToTop.style.opacity = '0';
        setTimeout(() => {
          if (window.pageYOffset <= 500) {
            backToTop.style.display = 'none';
          }
        }, 300);
      }
    }, { passive: true });
  }

  /**
   * Indicador de Seção Ativa
   */
  setupActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveSection = () => {
      const scrollPos = window.pageYOffset + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          });

          // Add active class to current section link
          const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
          }
        }
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
  }
}

/**
 * ========================================
 * MENU MOBILE ENHANCED
 * ========================================
 */

class MobileMenuController {
  constructor() {
    this.menu = null;
    this.trigger = null;
    this.init();
  }

  init() {
    this.createMobileMenu();
    this.setupMenuToggle();
    this.setupMenuAnimations();
  }

  createMobileMenu() {
    // Create mobile menu button
    this.trigger = document.createElement('button');
    this.trigger.className = 'mobile-menu-trigger';
    this.trigger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    
    this.trigger.style.cssText = `
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1001;
      gap: 4px;
    `;

    // Create mobile menu overlay
    this.menu = document.createElement('div');
    this.menu.className = 'mobile-menu-overlay';
    this.menu.innerHTML = `
      <div class="mobile-menu-content">
        <nav class="mobile-nav">
          <a href="/" class="mobile-nav-link">Home</a>
          <a href="./features.html" class="mobile-nav-link">Recursos</a>
          <a href="./download.html" class="mobile-nav-link">Download</a>
          <a href="./pricing.html" class="mobile-nav-link">Preços</a>
          <a href="./changelog.html" class="mobile-nav-link">Changelog</a>
          <a href="./support.html" class="mobile-nav-link">Suporte</a>
        </nav>
        <div class="mobile-ctas">
          <a href="./download.html" class="mobile-cta-primary">Baixar Agora</a>
          <button class="mobile-cta-secondary" onclick="window.location.href='/login.html'">Entrar</button>
        </div>
      </div>
    `;

    this.menu.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(15, 15, 26, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
    `;

    // Add to header
    const header = document.querySelector('.site-header .nav');
    if (header) {
      header.appendChild(this.trigger);
    }

    document.body.appendChild(this.menu);

    // Add CSS for hamburger animation
    const style = document.createElement('style');
    style.textContent = `
      .hamburger-line {
        width: 24px;
        height: 2px;
        background: currentColor;
        transition: all 0.3s ease;
        border-radius: 1px;
      }
      
      .mobile-menu-trigger.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-trigger.active .hamburger-line:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-trigger.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      .mobile-menu-content {
        text-align: center;
        animation: slideInUp 0.3s ease-out;
      }
      
      .mobile-nav-link {
        display: block;
        padding: 16px 0;
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .mobile-nav-link:hover {
        color: var(--neon-purple);
        transform: translateX(10px);
      }
      
      .mobile-ctas {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
      }
      
      .mobile-cta-primary,
      .mobile-cta-secondary {
        padding: 12px 32px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .mobile-cta-primary {
        background: var(--gradient-primary);
        color: white;
      }
      
      .mobile-cta-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @media (max-width: 768px) {
        .mobile-menu-trigger {
          display: flex !important;
        }
        
        .nav-links {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupMenuToggle() {
    this.trigger.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close menu when clicking overlay
    this.menu.addEventListener('click', (e) => {
      if (e.target === this.menu) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu.style.display === 'flex') {
        this.closeMenu();
      }
    });
  }

  setupMenuAnimations() {
    // Prevent body scroll when menu is open
    const preventScroll = (e) => {
      e.preventDefault();
    };

    this.trigger.addEventListener('click', () => {
      if (this.menu.style.display === 'flex') {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', preventScroll, { passive: false });
      } else {
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventScroll);
      }
    });
  }

  toggleMenu() {
    const isOpen = this.menu.style.display === 'flex';
    
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menu.style.display = 'flex';
    this.trigger.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate menu items
    const links = this.menu.querySelectorAll('.mobile-nav-link');
    links.forEach((link, index) => {
      link.style.animationDelay = `${index * 0.1}s`;
      link.style.animation = 'slideInUp 0.3s ease-out forwards';
    });
  }

  closeMenu() {
    this.menu.style.display = 'none';
    this.trigger.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new UXController();
  new MobileMenuController();
});

// Export for use in other modules
window.UXController = UXController;
window.MobileMenuController = MobileMenuController;
