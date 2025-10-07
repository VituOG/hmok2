/**
 * ========================================
 * MICROANIMAÇÕES E SCROLL REVEAL SYSTEM
 * ========================================
 */

class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupCounters();
    this.setupParticleSystem();
    this.setupProgressBars();
    this.setupFormAnimations();
    this.setupParallax();
  }

  /**
   * Scroll Reveal - Elementos aparecem ao rolar
   */
  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Trigger counter animation if element has counter
          const counter = entry.target.querySelector('.counter');
          if (counter) {
            this.animateCounter(counter);
          }
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    // Observe cards for staggered animation
    document.querySelectorAll('.glass-card').forEach((card, index) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  }

  /**
   * Contadores animados
   */
  setupCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      this.animateCounter(counter);
    });
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
      
      // Easing function
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

  /**
   * Sistema de partículas neon
   */
  setupParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'neon-particles';
    particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'neon-particle';
      particle.style.cssText = `
        position: absolute;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 6}s;
        animation-duration: ${4 + Math.random() * 4}s;
      `;
      particleContainer.appendChild(particle);
    }

    hero.appendChild(particleContainer);
  }

  /**
   * Barras de progresso animadas
   */
  setupProgressBars() {
    const progressBars = document.querySelectorAll('.neon-progress');
    progressBars.forEach(bar => {
      const target = bar.dataset.progress || '100';
      
      // Animate on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateProgressBar(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(bar);
    });
  }

  animateProgressBar(element, target) {
    const duration = 1500;
    const startTime = performance.now();
    const startWidth = 0;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentWidth = startWidth + (target - startWidth) * easeOutQuart;

      element.style.setProperty('--progress-width', `${currentWidth}%`);
      element.querySelector('::before')?.style.setProperty('width', `${currentWidth}%`);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }

  /**
   * Animações de formulário
   */
  setupFormAnimations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Input focus animations
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
      });

      // Submit animation
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          this.animateSubmit(submitBtn);
        }
      });
    });
  }

  animateSubmit(button) {
    button.classList.add('loading');
    button.innerHTML = `
      <div class="spinner"></div>
      Enviando...
    `;

    // Simulate submission
    setTimeout(() => {
      button.classList.remove('loading');
      button.innerHTML = 'Enviado ✓';
      button.classList.add('success');
      
      setTimeout(() => {
        button.classList.remove('success');
        button.innerHTML = 'Enviar';
      }, 3000);
    }, 2000);
  }

  /**
   * Parallax suave
   */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * CTA pulsante
   */
  static addPulseToCTA(element) {
    element.classList.add('pulse-cta');
  }

  /**
   * Shimmer loading effect
   */
  static addShimmer(element) {
    element.classList.add('shimmer');
    
    setTimeout(() => {
      element.classList.remove('shimmer');
    }, 2000);
  }

  /**
   * Smooth scroll to element
   */
  static smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? 
      document.querySelector(target) : target;
    
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    // Easing function
    const easeInOutQuart = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t * t + b;
      t -= 2;
      return -c / 2 * (t * t * t * t - 2) + b;
    };

    requestAnimationFrame(animation);
  }
}

/**
 * ========================================
 * HOVER EFFECTS E INTERAÇÕES
 * ========================================
 */

class InteractionController {
  constructor() {
    this.setupHoverEffects();
    this.setupClickEffects();
    this.setupKeyboardNavigation();
  }

  setupHoverEffects() {
    // Glass cards hover
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Button hover effects
    document.querySelectorAll('.glass-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
      });
    });
  }

  setupClickEffects() {
    // Ripple effect on buttons
    document.querySelectorAll('button, .btn').forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRipple(e, button);
      });
    });
  }

  createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setupKeyboardNavigation() {
    // Enhanced focus styles
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
  new InteractionController();
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-right: 8px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .keyboard-navigation *:focus {
    outline: 2px solid var(--neon-purple) !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);

// Export for use in other modules
window.AnimationController = AnimationController;
window.InteractionController = InteractionController;
