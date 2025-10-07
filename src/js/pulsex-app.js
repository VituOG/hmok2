/**
 * ========================================
 * PULSEX APP - SISTEMA PRINCIPAL
 * ========================================
 * Sistema modular e organizado para o site PulseX
 * Versão: 2.0
 * Data: 2024
 */

class PulseXApp {
  constructor() {
    this.modules = new Map();
    this.config = {
      theme: {
        default: 'dark',
        storageKey: 'pulsex-theme',
        transitionDuration: 300
      },
      animations: {
        scrollReveal: {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        },
        pulse: {
          duration: 2000,
          easing: 'ease-in-out'
        }
      },
      navigation: {
        smoothScroll: {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }
    };
    
    this.init();
  }

  /**
   * Inicialização principal da aplicação
   */
  init() {
    console.log('🚀 PulseX App iniciando...');
    
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  /**
   * Inicializar todos os módulos
   */
  initializeModules() {
    try {
      // Registrar módulos principais
      this.registerModule('theme', new ThemeManager(this.config.theme));
      this.registerModule('animations', new AnimationManager(this.config.animations));
      this.registerModule('navigation', new NavigationManager(this.config.navigation));
      this.registerModule('performance', new PerformanceSimulator());
      this.registerModule('counters', new CounterAnimator());
      this.registerModule('ui', new UIManager());
      
      // Inicializar cada módulo
      this.modules.forEach((module, name) => {
        console.log(`✅ Módulo ${name} inicializado`);
        module.init();
      });
      
      // Configurar eventos globais
      this.setupGlobalEvents();
      
      console.log('🎉 PulseX App carregado com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar PulseX App:', error);
    }
  }

  /**
   * Registrar módulo no sistema
   */
  registerModule(name, module) {
    if (!module || typeof module.init !== 'function') {
      throw new Error(`Módulo ${name} deve ter método init()`);
    }
    this.modules.set(name, module);
  }

  /**
   * Obter módulo registrado
   */
  getModule(name) {
    return this.modules.get(name);
  }

  /**
   * Configurar eventos globais
   */
  setupGlobalEvents() {
    // Evento personalizado para mudança de tema
    window.addEventListener('themeChanged', (e) => {
      console.log(`🌙 Tema alterado para: ${e.detail.theme}`);
    });

    // Evento para performance
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`⚡ Página carregada em ${loadTime.toFixed(2)}ms`);
    });
  }
}

/**
 * ========================================
 * GERENCIADOR DE TEMAS
 * ========================================
 */
class ThemeManager {
  constructor(config) {
    this.config = config;
    this.currentTheme = null;
    this.toggleButton = null;
  }

  init() {
    this.currentTheme = this.getStoredTheme() || this.config.default;
    this.applyTheme(this.currentTheme);
    this.createToggleButton();
    this.setupSystemThemeListener();
    this.setupKeyboardShortcut();
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.config.storageKey);
    } catch (e) {
      console.warn('Não foi possível acessar localStorage');
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem(this.config.storageKey, theme);
    } catch (e) {
      console.warn('Não foi possível salvar tema no localStorage');
    }
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    // Remover tema anterior
    root.removeAttribute('data-theme');
    
    // Aplicar novo tema
    root.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.setStoredTheme(theme);
    
    // Atualizar meta theme-color
    this.updateMetaThemeColor(theme);
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme, previous: this.getStoredTheme() }
    }));
  }

  updateMetaThemeColor(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#0F0F1A' : '#A855F7';
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.updateToggleButton();
    this.animateTransition();
  }

  animateTransition() {
    document.body.style.transition = `background-color ${this.config.transitionDuration}ms ease, color ${this.config.transitionDuration}ms ease`;
    
    setTimeout(() => {
      document.body.style.transition = '';
    }, this.config.transitionDuration);
  }

  createToggleButton() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.id = 'theme-toggle';
    this.toggleButton.className = 'theme-toggle';
    this.toggleButton.setAttribute('aria-label', 'Alternar tema');
    this.toggleButton.innerHTML = this.getThemeIcon();
    
    this.styleToggleButton();
    this.bindToggleEvents();
    this.insertToggleButton();
  }

  styleToggleButton() {
    Object.assign(this.toggleButton.style, {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: '1px solid var(--glass-border)',
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      color: 'var(--text-dark)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: '1001'
    });
  }

  bindToggleEvents() {
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
      this.animateButton();
    });

    this.toggleButton.addEventListener('mouseenter', () => {
      this.toggleButton.style.transform = 'translateY(-2px) scale(1.05)';
      this.toggleButton.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.3)';
    });

    this.toggleButton.addEventListener('mouseleave', () => {
      this.toggleButton.style.transform = 'translateY(0) scale(1)';
      this.toggleButton.style.boxShadow = 'var(--glass-shadow)';
    });
  }

  animateButton() {
    this.toggleButton.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      this.toggleButton.style.transform = '';
    }, 300);
  }

  insertToggleButton() {
    const navbar = document.querySelector('.nav');
    if (navbar) {
      navbar.appendChild(this.toggleButton);
    }
  }

  getThemeIcon() {
    const icons = {
      dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>`,
      light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>`
    };
    return icons[this.currentTheme] || icons.dark;
  }

  updateToggleButton() {
    if (this.toggleButton) {
      this.toggleButton.innerHTML = this.getThemeIcon();
    }
  }

  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        const systemTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(systemTheme);
        this.updateToggleButton();
      }
    });
  }

  setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

/**
 * ========================================
 * GERENCIADOR DE ANIMAÇÕES
 * ========================================
 */
class AnimationManager {
  constructor(config) {
    this.config = config;
    this.observers = new Map();
    this.animatedElements = new Set();
  }

  init() {
    this.setupScrollReveal();
    this.setupPulseAnimations();
    this.setupHoverEffects();
    this.setupIntersectionObservers();
  }

  setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          entry.target.classList.add('active');
          this.animatedElements.add(entry.target);
          
          // Trigger counter animation if element has counter
          const counter = entry.target.querySelector('.counter');
          if (counter) {
            this.animateCounter(counter);
          }
        }
      });
    }, this.config.scrollReveal);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    this.observers.set('scrollReveal', observer);
  }

  setupPulseAnimations() {
    document.querySelectorAll('.pulse-cta').forEach(btn => {
      btn.style.animation = `pulseGlow ${this.config.pulse.duration}ms ${this.config.pulse.easing} infinite alternate`;
    });
  }

  setupHoverEffects() {
    // Glass cards hover
    document.querySelectorAll('.glass-card, .card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Button hover effects
    document.querySelectorAll('.glass-btn, .btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
      });
    });
  }

  setupIntersectionObservers() {
    // Progress bars
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProgressBar(entry.target);
          progressObserver.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('.neon-progress').forEach(bar => {
      progressObserver.observe(bar);
    });

    this.observers.set('progress', progressObserver);
  }

  animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';

    const target = parseInt(element.dataset.target || element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);

      element.textContent = this.formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  animateProgressBar(element) {
    const target = element.dataset.progress || '100';
    const duration = 1500;
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentWidth = target * easeOutQuart;

      element.style.setProperty('--progress-width', `${currentWidth}%`);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }

  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    Object.assign(ripple.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple 0.6s ease-out',
      pointerEvents: 'none'
    });

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

/**
 * ========================================
 * GERENCIADOR DE NAVEGAÇÃO
 * ========================================
 */
class NavigationManager {
  constructor(config) {
    this.config = config;
    this.activeSection = null;
    this.navLinks = [];
  }

  init() {
    this.setupSmoothScroll();
    this.setupActiveSectionTracking();
    this.setupMobileMenu();
    this.setupScrollProgress();
    this.setupBackToTop();
  }

  setupSmoothScroll() {
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
  }

  smoothScrollTo(targetElement) {
    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuart(timeElapsed, startPosition, distance, this.config.smoothScroll.duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < this.config.smoothScroll.duration) {
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

  setupActiveSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveSection = () => {
      const scrollPos = window.pageYOffset + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          if (this.activeSection !== sectionId) {
            this.activeSection = sectionId;
            this.updateActiveNavLink(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
  }

  updateActiveNavLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

    const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  setupMobileMenu() {
    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    
    // Add mobile menu styles and functionality
    this.addMobileMenuStyles();
    
    // Insert button into navbar
    const navbar = document.querySelector('.nav');
    if (navbar) {
      navbar.appendChild(menuButton);
    }
  }

  addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu-button {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        cursor: pointer;
        gap: 4px;
      }
      
      .hamburger-line {
        width: 24px;
        height: 2px;
        background: currentColor;
        transition: all 0.3s ease;
        border-radius: 1px;
      }
      
      @media (max-width: 768px) {
        .mobile-menu-button {
          display: flex;
        }
        
        .nav-links {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    Object.assign(progressBar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '0%',
      height: '3px',
      background: 'linear-gradient(90deg, #A855F7, #38BDF8)',
      zIndex: '9999',
      transition: 'width 0.1s ease-out',
      boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
    });

    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  setupBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18,15 12,9 6,15"/>
      </svg>
    `;
    
    Object.assign(backToTop.style, {
      position: 'fixed',
      bottom: '80px',
      right: '24px',
      zIndex: '1000',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: 'none',
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    });

    backToTop.addEventListener('click', () => {
      this.smoothScrollTo(document.body);
    });

    document.body.appendChild(backToTop);

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
}

/**
 * ========================================
 * SIMULADOR DE PERFORMANCE
 * ========================================
 */
class PerformanceSimulator {
  constructor() {
    this.isRunning = false;
    this.metrics = [
      { label: 'Velocidade de Boot', before: 45, after: 12, unit: 's', icon: '⚡' },
      { label: 'Espaço Livre', before: 8.5, after: 23.2, unit: 'GB', icon: '💾' },
      { label: 'CPU Usage', before: 78, after: 32, unit: '%', icon: '🖥️' },
      { label: 'RAM Usage', before: 85, after: 45, unit: '%', icon: '🧠' },
      { label: 'Tempo de Resposta', before: 2.3, after: 0.8, unit: 's', icon: '🚀' }
    ];
  }

  init() {
    this.setupSimulator();
  }

  setupSimulator() {
    const simulatorContainer = document.querySelector('.performance-simulator');
    if (!simulatorContainer) return;

    this.createSimulatorUI(simulatorContainer);
  }

  createSimulatorUI(container) {
    const startButton = container.querySelector('.simulator-start button');
    if (startButton) {
      startButton.addEventListener('click', () => this.runSimulation());
    }
  }

  runSimulation() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🎯 Iniciando simulação de performance...');
    
    // Simulate scanning process
    this.showScanningState();
    
    setTimeout(() => {
      this.showResults();
      this.isRunning = false;
    }, 5000);
  }

  showScanningState() {
    // Implementation for scanning animation
    console.log('🔍 Analisando sistema...');
  }

  showResults() {
    // Implementation for showing results
    console.log('✅ Simulação concluída!');
  }

  getImprovementPercentage(before, after) {
    const improvement = ((before - after) / before) * 100;
    return Math.round(improvement);
  }
}

/**
 * ========================================
 * ANIMADOR DE CONTADORES
 * ========================================
 */
class CounterAnimator {
  constructor() {
    this.animatedCounters = new Set();
  }

  init() {
    this.setupCounters();
  }

  setupCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      this.animateCounter(counter);
    });
  }

  animateCounter(element) {
    if (this.animatedCounters.has(element)) return;
    this.animatedCounters.add(element);

    const target = parseInt(element.dataset.target || element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);

      element.textContent = this.formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

/**
 * ========================================
 * GERENCIADOR DE UI
 * ========================================
 */
class UIManager {
  constructor() {
    this.toasts = [];
  }

  init() {
    this.setupToastSystem();
    this.setupFormValidations();
    this.setupClickEffects();
  }

  setupToastSystem() {
    // Create toast container
    const container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '10000',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    });
    document.body.appendChild(container);
  }

  showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    Object.assign(toast.style, {
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      border: '1px solid var(--glass-border)',
      borderRadius: '12px',
      padding: '12px 16px',
      color: 'var(--text-primary)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    document.getElementById('toast-container').appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, duration);

    this.toasts.push(toast);
  }

  setupFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('focused');
          }
        });

        input.addEventListener('input', () => {
          this.validateInput(input);
        });
      });

      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  }

  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        input.setCustomValidity(emailRegex.test(value) ? '' : 'Email inválido');
        break;
      
      case 'password':
        input.setCustomValidity(value.length >= 6 ? '' : 'Senha deve ter pelo menos 6 caracteres');
        break;
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      this.validateInput(input);
      if (!input.checkValidity()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    return isValid;
  }

  setupClickEffects() {
    // Ripple effect on buttons
    document.querySelectorAll('button, .btn').forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
  }

  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    Object.assign(ripple.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple 0.6s ease-out',
      pointerEvents: 'none'
    });

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

// Inicializar aplicação quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.pulsexApp = new PulseXApp();
  });
} else {
  window.pulsexApp = new PulseXApp();
}

// Exportar para uso global
window.PulseXApp = PulseXApp;
