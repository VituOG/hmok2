/**
 * ========================================
 * SISTEMA COMPLETO DE DARK/LIGHT MODE
 * ========================================
 */

class ThemeController {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeToggle();
    this.setupSystemThemeListener();
    this.setupKeyboardShortcut();
  }

  /**
   * Obter tema armazenado no localStorage
   */
  getStoredTheme() {
    try {
      return localStorage.getItem('pulsex-theme');
    } catch (e) {
      return null;
    }
  }

  /**
   * Obter tema do sistema
   */
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Armazenar tema no localStorage
   */
  setStoredTheme(theme) {
    try {
      localStorage.setItem('pulsex-theme', theme);
    } catch (e) {
      console.warn('Não foi possível salvar o tema no localStorage');
    }
  }

  /**
   * Aplicar tema ao documento
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.setStoredTheme(theme);
    
    // Atualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#0F0F1A' : '#A855F7';
    }

    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  /**
   * Alternar entre temas
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    
    // Animação suave de transição
    this.animateThemeTransition();
  }

  /**
   * Animação de transição entre temas
   */
  animateThemeTransition() {
    const body = document.body;
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTimeout(() => {
      body.style.transition = '';
    }, 300);
  }

  /**
   * Criar toggle de tema
   */
  createThemeToggle() {
    // Verificar se já existe
    if (document.getElementById('theme-toggle')) return;

    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle glass-btn';
    toggle.setAttribute('aria-label', 'Alternar tema');
    toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
    
    toggle.innerHTML = this.getThemeIcon();
    
    toggle.style.cssText = `
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid var(--glass-border);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    `;

    // Adicionar efeito hover
    toggle.addEventListener('mouseenter', () => {
      toggle.style.transform = 'translateY(-2px) scale(1.05)';
      toggle.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.3)';
    });

    toggle.addEventListener('mouseleave', () => {
      toggle.style.transform = 'translateY(0) scale(1)';
      toggle.style.boxShadow = 'var(--glass-shadow)';
    });

    // Evento de clique
    toggle.addEventListener('click', () => {
      this.toggleTheme();
      toggle.innerHTML = this.getThemeIcon();
      toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
      
      // Animação de rotação
      toggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        toggle.style.transform = '';
      }, 300);
    });

    // Adicionar ao navbar
    const navbar = document.querySelector('.nav');
    if (navbar) {
      const navCTA = navbar.querySelector('.nav-cta');
      if (navCTA) {
        navbar.insertBefore(toggle, navCTA);
      } else {
        navbar.appendChild(toggle);
      }
    }

    // Mobile: adicionar ao menu mobile se existir
    this.addToMobileMenu(toggle);
  }

  /**
   * Obter ícone do tema atual
   */
  getThemeIcon() {
    if (this.currentTheme === 'dark') {
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      `;
    } else {
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      `;
    }
  }

  /**
   * Adicionar toggle ao menu mobile
   */
  addToMobileMenu(toggle) {
    // Aguardar menu mobile ser criado
    setTimeout(() => {
      const mobileMenu = document.querySelector('.mobile-menu-content');
      if (mobileMenu) {
        const themeToggleMobile = toggle.cloneNode(true);
        themeToggleMobile.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        `;

        themeToggleMobile.addEventListener('click', () => {
          this.toggleTheme();
          themeToggleMobile.innerHTML = this.getThemeIcon();
          toggle.innerHTML = this.getThemeIcon();
          toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
        });

        mobileMenu.appendChild(themeToggleMobile);
      }
    }, 1000);
  }

  /**
   * Listener para mudanças no tema do sistema
   */
  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Só aplicar se não houver tema armazenado
      if (!this.getStoredTheme()) {
        const systemTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(systemTheme);
        
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
          toggle.innerHTML = this.getThemeIcon();
          toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
        }
      }
    });
  }

  /**
   * Atalho de teclado para alternar tema
   */
  setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + T
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
        
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
          toggle.innerHTML = this.getThemeIcon();
          toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
        }
      }
    });
  }

  /**
   * Obter tema atual
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Forçar tema específico
   */
  setTheme(theme) {
    if (['light', 'dark'].includes(theme)) {
      this.applyTheme(theme);
      
      const toggle = document.getElementById('theme-toggle');
      if (toggle) {
        toggle.innerHTML = this.getThemeIcon();
        toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
      }
    }
  }
}

/**
 * ========================================
 * AUTO-INICIALIZAÇÃO E EXPORT
 * ========================================
 */

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.themeController = new ThemeController();
});

// CSS para animações de tema
const themeStyles = document.createElement('style');
themeStyles.textContent = `
  /* Transições suaves para mudanças de tema */
  * {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }
  
  /* Remover transições em elementos que não devem ter */
  .theme-toggle,
  .spinner,
  .particle,
  .gradient-orb {
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }
  
  /* Indicador de tema ativo */
  .theme-toggle[aria-pressed="true"] {
    background: var(--neon-purple) !important;
    color: white !important;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5) !important;
  }
  
  /* Animação de entrada do toggle */
  .theme-toggle {
    animation: slideInRight 0.5s ease-out;
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Responsividade do toggle */
  @media (max-width: 768px) {
    .theme-toggle {
      width: 40px;
      height: 40px;
    }
    
    .theme-toggle svg {
      width: 18px;
      height: 18px;
    }
  }
  
  /* Reduzir animações se usuário preferir */
  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
    
    .theme-toggle {
      transition: none !important;
    }
  }
`;
document.head.appendChild(themeStyles);

// Exportar para uso em outros módulos
window.ThemeController = ThemeController;

// Função global para alternar tema
window.toggleTheme = () => {
  if (window.themeController) {
    window.themeController.toggleTheme();
  }
};

// Função global para obter tema atual
window.getCurrentTheme = () => {
  return window.themeController ? window.themeController.getCurrentTheme() : 'light';
};
